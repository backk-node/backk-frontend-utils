import { getMetadataStorage } from 'cv-pksilen';
import { findValidationMetadata, hasValidationMetadata } from './getInputType';

export default function isMultipleSelectInput<T extends { [key: string]: any }>(
  Class: new () => T,
  propertyName: keyof T
) {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(Class, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  if (hasValidationMetadata(validationMetadatas, 'isIn')) {
    const isInValidation = findValidationMetadata(validationMetadatas, 'isIn');
    return isInValidation.each;
  }

  return false;
}
