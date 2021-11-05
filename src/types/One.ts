import CurrentPageToken from './postqueryoperations/CurrentPageToken';

export type One<T> = {
  metadata: {
    currentPageTokens: CurrentPageToken[] | undefined;
    [key: string]: any;
  };
  data: T;
};
