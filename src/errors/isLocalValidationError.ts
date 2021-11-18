import { PossibleBackkError } from '../types/BackkError';

export default function isLocalValidationError(error: PossibleBackkError) {
  return error?.statusCode === undefined && error?.errorCode === undefined;
}
