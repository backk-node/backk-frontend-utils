export default function getValidationMessageClassNames(errorMessage: string | null | undefined) {
  if (errorMessage) {
    return 'validationMessage error';
  }

  return 'validationMessage';
}
