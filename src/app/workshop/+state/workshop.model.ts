export interface WorkshopStep {
  markdown: string;
  solidity: string;
  test: string;
}

export interface Workshop {
  id: string;
  name: string;
  description: string;
  author: string;
  steps: WorkshopStep[];
}

export interface Metadata {
  id: string;
  name: string;
  description: string;
  author: string;
  stepIds: string[];
}

// // GistFiles => Step
// export interface GistFiles {
//   [name: string]: {
//     filename: string;
//     type: string;
//     language: string;
//     raw_url: string;
//     size: number;
//     truncated: boolean;
//     content: string;
//   };
// }

// // Gist => Step[]
// export interface Gist {
//   url: string;
//   id: string;
//   files: GistFiles;
//   avatar_url: string;
//   name: string;
//   description: string;
// }

// export function gistToStep({description, files, id}: Gist): Step {
//   const extension = (filename: string) => {
//     return filename.split('.')[filename.split('.').length - 1];
//   };
//   const mdFileName = Object.keys(files).find(name => extension(name) === 'md');
//   const solFileName = Object.keys(files).find(name => extension(name) === 'sol');
//   return {
//     id,
//     description,
//     markdown: files[mdFileName].content,
//     solidity: files[solFileName].content
//   };
// }

/**
 * A factory function that creates Workshop
 */
export function createWorkshop(params: Partial<Workshop> = {}) {
  return {
    name: '',
    description: '',
    author: '',
    steps: [],
    ...params
  } as Workshop;
}

export function createWorkshopStep(params: Partial<WorkshopStep> = {}) {
  return {
    markdown: '',
    solidity: '',
    test: '',
    ...params
  } as WorkshopStep;
}
