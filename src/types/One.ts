import CurrentPageToken from './CurrentPageToken';

export type One<T> = {
  metadata: {
    currentPageTokens: CurrentPageToken[] | undefined;
    [key: string]: any;
  };
  data: T;
};
