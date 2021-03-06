import { findValidationMetadata } from './getInputType';
import { getMetadataStorage } from 'cv-pksilen';

export default function isObjectProperty<T extends { [key: string]: any }>(
  Class: new () => T,
  propertyName: keyof T
) {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(Class, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  const isInstanceValidation = findValidationMetadata(validationMetadatas, 'isInstance');
  return !!isInstanceValidation;
}
