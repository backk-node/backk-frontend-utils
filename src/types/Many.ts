import CurrentPageToken from './CurrentPageToken';

export type Many<T> = {
  metadata: {
    currentPageTokens: CurrentPageToken[] | undefined;
    [key: string]: any;
  };
  data: T[];
};
