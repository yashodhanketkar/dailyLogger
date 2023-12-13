export type NewProjectType = {
  name: string;
  github?: string;
};

export type ProjectType = NewProjectType & {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};
