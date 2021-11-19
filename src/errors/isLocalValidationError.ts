import { PossibleBackkError } from '../types/BackkError';

export default function isLocalValidationError(error: PossibleBackkError) {
  return error && error.statusCode === undefined && error.errorCode === undefined;
}
