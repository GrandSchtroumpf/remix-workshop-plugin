import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { map, tap } from 'rxjs/operators';
import { Step } from './step/+state';
import { Workshop } from './workshop/+state';

interface Response {
  repository: {
    url: string,
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
    fileName: solidity ? solidity.name.split('.')[0] : undefined,
    test: test ? `${prefix}/${test.name}` : undefined,
    solidity: solidity ? `${prefix}/${solidity.name}` : undefined,
    markdown: markdown ? `${prefix}/${markdown.name}` : undefined
  };
}

@Injectable({ providedIn: 'root' })
export class GithubService {
  constructor(private apollo: Apollo) {}

  get(path: string) {
    const splittedUrl = path.split('/');
    const name = splittedUrl.pop();
    const owner = splittedUrl.pop();
    return this.apollo
      .query<Response>({
        query: gql`{
        repository(owner: "${owner}", name: "${name}") {
          url,
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
        map(res => {
          const { url } = res.data.repository;
          const { workshops } = res.data.repository.master;
          return getWorkshops(`${url}/blob/master`, workshops);
        })
      );
  }
}
