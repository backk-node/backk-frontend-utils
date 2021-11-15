import { ServiceFunctionType } from '../callRemoteService';
import { findValidationMetadata } from './getInputProps';
import { getMetadataStorage } from 'cv-pksilen';

export default function shouldPropertyBePresent<T extends { [key: string]: any }>(
  Class: new () => T,
  propertyName: keyof T,
  serviceFunctionType: ServiceFunctionType
) {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(Class, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  const undefinedValidation = findValidationMetadata(validationMetadatas, 'isUndefined');
  return !undefinedValidation?.groups.includes(`__backk_${serviceFunctionType}__`);
}
