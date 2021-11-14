import { ServiceFunctionType } from '../callRemoteService';
import { findValidationMetadata } from './getInputProps';
import { getMetadataStorage } from 'cv-pksilen';

export default function isServiceFunctionArgumentPropertyDefined<T extends { [key: string]: any }>(
  ArgumentClass: new () => T,
  propertyName: keyof T,
  serviceFunctionType: ServiceFunctionType
) {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(ArgumentClass, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  const undefinedValidation = findValidationMetadata(validationMetadatas, 'isUndefined');
  return !undefinedValidation?.groups.includes(`__backk_${serviceFunctionType}__`);
}
