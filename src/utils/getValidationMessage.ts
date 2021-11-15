import { PossibleString } from '../types/PossibleString';

export default function getValidationMessage(possibleErrorMessage: PossibleString): string {
  if (possibleErrorMessage === undefined || possibleErrorMessage === '') {
    return '';
  } else if (possibleErrorMessage === null) {
    return 'OK';
  }
  return possibleErrorMessage[0].toUpperCase() + possibleErrorMessage.slice(1);
}
