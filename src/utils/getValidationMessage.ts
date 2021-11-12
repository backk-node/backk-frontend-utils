export default function getValidationMessage(possibleErrorMessage: string | null | undefined): string {
  if (possibleErrorMessage === undefined) {
    return '';
  } else if (possibleErrorMessage === null) {
    return 'OK';
  }
  return possibleErrorMessage[0].toUpperCase() + possibleErrorMessage.slice(1);
}
