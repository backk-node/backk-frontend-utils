import groupBy from 'lodash/groupBy';
import { getMetadataStorage } from 'cv-pksilen';
import { ValidationMetadata } from 'cv-pksilen/build/types/metadata/ValidationMetadata';

export let isValidationMetadataUpdated = false;

export default function updateValidationMetadata() {
  const validationMetadatas: ValidationMetadata[] = (getMetadataStorage() as any).validationMetadatas;

  const groupedValidationMetadatas = groupBy(validationMetadatas, (validationMetadata) =>
    typeof validationMetadata.target === 'string'
      ? `${validationMetadata.target}_${validationMetadata.propertyName}`
      : `${validationMetadata.target.name}_${validationMetadata.propertyName}`
  );

  Object.entries(groupedValidationMetadatas).forEach(([, validationMetadatas]) => {
    const undefinedValidation = validationMetadatas.find(
      (validationMetadata) => validationMetadata.constraints?.[0] === 'isUndefined'
    );

    if (undefinedValidation) {
      if (
        undefinedValidation.groups?.[0] === '__backk_create__' &&
        undefinedValidation.groups?.[1] === undefined
      ) {
        validationMetadatas.forEach((validationMetadata) => {
          if (validationMetadata.groups?.[0] === undefined) {
            validationMetadata.groups = ['__backk_other__', '__backk_update__'];
          }
        });
      } else if (undefinedValidation.groups?.[0] === '__backk_update__') {
        validationMetadatas.forEach((validationMetadata) => {
          if (validationMetadata.groups?.[0] === undefined) {
            validationMetadata.groups = ['__backk_other__', '__backk_create__'];
          }
        });
      } else if (
        undefinedValidation.groups?.[0] === '__backk_create__' &&
        undefinedValidation.groups?.[1] === '__backk_update__'
      ) {
        validationMetadatas.forEach((validationMetadata) => {
          if (validationMetadata.groups?.[0] === undefined) {
            validationMetadata.groups = ['__backk_other__'];
          }
        });
      }
    } else {
      validationMetadatas.forEach((validationMetadata) => {
        if (validationMetadata.groups?.[0] === undefined) {
          validationMetadata.groups = ['__backk_other__', '__backk_create__', '__backk_update__'];
        }
      });
    }
  });

  isValidationMetadataUpdated = true;
}
