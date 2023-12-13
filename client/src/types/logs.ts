export type NewLogType = {
  task?: string;
  project?: string;
  description?: string;
};

export type LogType = NewLogType & {
  id: string;
  collectionId: string;
  collectionName: string;
  created: string;
  updated: string;
};
