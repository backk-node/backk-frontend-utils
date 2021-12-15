import { PossibleString } from '../types/PossibleString';

export default function getValidationMessageHtmlClassNames(errorMessage: PossibleString) {
  if (errorMessage) {
    return `validationMessage error`;
  }

  return 'validationMessage';
}
