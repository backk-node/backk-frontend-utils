import { getMetadataStorage } from 'cv-pksilen';

export function findValidationMetadata(validationMetadatas: any[], validationName: string) {
  return validationMetadatas.find(
    (validationMetadata) => validationMetadata.name?.toLowerCase() === validationName.toLowerCase()
  );
}

export function hasValidationMetadata(validationMetadatas: any[], validationName: string) {
  return !!validationMetadatas.find(
    (validationMetadata) => validationMetadata.name?.toLowerCase() === validationName.toLowerCase()
  );
}

export function getValidationMetadataConstraints(validationMetadata: any) {
  if (validationMetadata.name === validationMetadata.constraints?.[0]) {
    return validationMetadata.constraints.slice(1);
  }
  return validationMetadata.constraints;
}

export default function getInputType<T extends { [key: string]: any }>(
  ArgumentClass: new () => T,
  propertyName: keyof T
): string {
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(ArgumentClass, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  if (hasValidationMetadata(validationMetadatas, 'isString')) {
    if (hasValidationMetadata(validationMetadatas, 'isEmail')) {
      return 'email';
    } else if (
      propertyName === 'password' ||
      hasValidationMetadata(validationMetadatas, 'isStrongPassword')
    ) {
      return 'password';
    } else if (hasValidationMetadata(validationMetadatas, 'uiProperties')) {
      const uiPropertiesMetadata = findValidationMetadata(validationMetadatas, 'uiProperties');
      const constraints = getValidationMetadataConstraints(uiPropertiesMetadata);
      if (constraints[0].isSearch) {
        return 'search';
      }
    } else if (
      hasValidationMetadata(validationMetadatas, 'isPhoneNumber') ||
      hasValidationMetadata(validationMetadatas, 'isMobilePhone')
    ) {
      return 'tel';
    } else if (hasValidationMetadata(validationMetadatas, 'isUrl')) {
      return 'url';
    } else if (hasValidationMetadata(validationMetadatas, 'isHexColor')) {
      return 'color';
    } else if (hasValidationMetadata(validationMetadatas, 'isDataUri')) {
      return 'file';
    }

    return 'text';
  } else if (hasValidationMetadata(validationMetadatas, 'isBoolean')) {
    return 'checkbox';
  } else if (
    hasValidationMetadata(validationMetadatas, 'isInt') ||
    hasValidationMetadata(validationMetadatas, 'isFloat') ||
    hasValidationMetadata(validationMetadatas, 'isBigInt')
  ) {
    return 'number';
  } else if (hasValidationMetadata(validationMetadatas, 'isDate')) {
    if (hasValidationMetadata(validationMetadatas, 'uiProperties')) {
      const uiPropertiesMetadata = findValidationMetadata(validationMetadatas, 'uiProperties');
      const constraints = getValidationMetadataConstraints(uiPropertiesMetadata);
      if (constraints[0].isMonthAndYearOnly) {
        return 'month';
      } else if (constraints[0].isDateOnly) {
        return 'date';
      } else if (constraints[0].isTimeOnly) {
        return 'time';
      } else {
        return 'datetime-local';
      }
    } else {
      return 'datetime-local';
    }
  } else if (hasValidationMetadata(validationMetadatas, 'isIn')) {
    return 'select';
  }

  throw new Error(
    ArgumentClass + '.' + propertyName + ': There is not any input type for this property type.'
  );
}
