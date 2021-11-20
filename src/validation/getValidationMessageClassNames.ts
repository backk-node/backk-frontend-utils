import { PossibleString } from '../types/PossibleString';

export default function getValidationMessageClassNames(errorMessage: PossibleString) {
  if (errorMessage) {
    return 'validationMessage error';
  }

  return 'validationMessage';
}
