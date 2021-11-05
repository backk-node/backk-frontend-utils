import CurrentPageToken from './postqueryoperations/CurrentPageToken';

export type Many<T> = {
  metadata: {
    currentPageTokens: CurrentPageToken[] | undefined;
    [key: string]: any;
  };
  data: T[];
};
