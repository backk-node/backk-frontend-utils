import { findValidationMetadata } from './getInputProps';
import { getMetadataStorage } from 'cv-pksilen';

export default function isDataUriProperty<T extends { [key: string]: any }>(
  Class: new () => T,
  propertyName: keyof T
) {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(Class, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  const isDataUriValidation = findValidationMetadata(validationMetadatas, 'isDataUri');
  return !!isDataUriValidation;
}
