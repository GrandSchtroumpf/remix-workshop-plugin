import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map } from 'rxjs/operators';
import { Step } from './step/+state';
import { Workshop } from './workshop/+state';

interface Response {
  repository: {
    master: {
      workshops: WorkshopFolder[];
    };
  };
}

interface WorkshopFolder {
  name: string;
  content: {
    steps: StepFolder[];
  };
}

interface StepFolder {
  name: string;
  content: {
    files: { name: string }[];
  };
}

/** Create an array of Workshop */
function getWorkshops(prefix: string, workshops: WorkshopFolder[]): Partial<Workshop>[] {
  return workshops
    .filter(({ content }) => !!content.steps)
    .map(({ name, content }) => ({
      name,
      steps: getSteps(`${prefix}/${name}`, content.steps)
    }));
}

/** Create an array of Step */
function getSteps(prefix: string, steps: StepFolder[]): Step[] {
  return steps
    .filter(({ content }) => !!content.files)
    .map(({ name, content }) => ({
      name,
      ...getFiles(`${prefix}/${name}`, content.files)
    } as Step));
}

/** Create files url from the files name */
function getFiles(prefix: string, files: { name: string }[]): Partial<Step> {
  const test = files.find(({ name }) => name.endsWith('_test.sol'));
  const solidity = files.find(({ name }) => name.endsWith('.sol') && !name.endsWith('_test.sol'));
  const markdown = files.find(({ name }) => name.endsWith('.md'));
  return {
    test: test ? `${prefix}/${test.name}` : undefined,
    solidity: solidity ? `${prefix}/${solidity.name}` : undefined,
    markdown: markdown ? `${prefix}/${markdown.name}` : undefined
  };
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private apollo: Apollo) {}

  get(url: string) {
    return this.apollo
      .query<Response>({
        query: gql`{
        repository: resource(url: "${url}") {
          ... on Repository {
            master: object(expression: "master:") {
              ... on Tree {
                workshops: entries {
                  name
                  content: object {
                    ... on Tree {
                      steps: entries {
                        name
                        content: object {
                          ... on Tree {
                            files: entries {
                              name
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }`
      })
      .pipe(
        map(res => res.data.repository.master.workshops),
        map(workshops => getWorkshops(`${url}/tree/master`, workshops))
      );
  }
}
