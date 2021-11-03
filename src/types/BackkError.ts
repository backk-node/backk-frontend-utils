export type BackkError = {
  statusCode?: number;
  message: string;
  errorCode?: string;
  stackTrace?: string;
};

export type PossibleBackkError = BackkError | null | undefined;
