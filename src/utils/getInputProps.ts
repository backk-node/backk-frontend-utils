import { getMetadataStorage } from 'cv-pksilen';

export function findValidationMetadata(validationMetadatas: any[], validationName: string) {
  return validationMetadatas.find(
    (validationMetadata) => validationMetadata.name?.toLowerCase() === validationName.toLowerCase()
  );
}

function hasValidationMetadata(validationMetadatas: any[], validationName: string) {
  return !!validationMetadatas.find(
    (validationMetadata) => validationMetadata.name?.toLowerCase() === validationName.toLowerCase()
  );
}

function getValidationMetadataConstraints(validationMetadata: any) {
  if (validationMetadata.name === validationMetadata.constraints?.[0]) {
    return validationMetadata.constraints.slice(1);
  }
  return validationMetadata.constraints;
}

export default function getInputProps<T extends { [key: string]: any }>(
  ArgumentClass: new () => T,
  propertyName: keyof T
) {
  const inputProps: any = {};
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(ArgumentClass, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  if (hasValidationMetadata(validationMetadatas, 'isString')) {
    inputProps.type = 'text';
    if (hasValidationMetadata(validationMetadatas, 'isEmail')) {
      inputProps.type = 'email';
    } else if (
      propertyName === 'password' ||
      hasValidationMetadata(validationMetadatas, 'isStrongPassword')
    ) {
      inputProps.type = 'password';
    } else if (hasValidationMetadata(validationMetadatas, 'uiProperties')) {
      const uiPropertiesMetadata = findValidationMetadata(validationMetadatas, 'uiProperties');
      const constraints = getValidationMetadataConstraints(uiPropertiesMetadata);
      if (constraints[0].isSearch) {
        inputProps.type = 'search';
      }
    } else if (
      hasValidationMetadata(validationMetadatas, 'isPhoneNumber') ||
      hasValidationMetadata(validationMetadatas, 'isMobilePhone')
    ) {
      inputProps.type = 'tel';
    } else if (hasValidationMetadata(validationMetadatas, 'isUrl')) {
      inputProps.type = 'url';
    } else if (hasValidationMetadata(validationMetadatas, 'isHexColor')) {
      inputProps.type = 'color';
    }

    if (hasValidationMetadata(validationMetadatas, 'minLength')) {
      const minLengthValidation = findValidationMetadata(validationMetadatas, 'minLength');
      inputProps.minLength = getValidationMetadataConstraints(minLengthValidation)[0];
    }

    if (hasValidationMetadata(validationMetadatas, 'maxLength')) {
      const maxLengthValidation = findValidationMetadata(validationMetadatas, 'maxLength');
      inputProps.maxLength = getValidationMetadataConstraints(maxLengthValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'length')) {
      const lengthValidation = findValidationMetadata(validationMetadatas, 'length');
      inputProps.minLength = getValidationMetadataConstraints(lengthValidation)[0];
      inputProps.maxLength = getValidationMetadataConstraints(lengthValidation)[1];
    }
    if (hasValidationMetadata(validationMetadatas, 'maxLengthAndMatches')) {
      const maxLengthValidation = findValidationMetadata(validationMetadatas, 'maxLengthAndMatches');
      inputProps.minLength = getValidationMetadataConstraints(maxLengthValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'lengthAndMatches')) {
      const lengthValidation = findValidationMetadata(validationMetadatas, 'lengthAndMatches');
      inputProps.minLength = getValidationMetadataConstraints(lengthValidation)[0];
      inputProps.maxLength = getValidationMetadataConstraints(lengthValidation)[1];
    }
    if (hasValidationMetadata(validationMetadatas, 'maxLengthAndMatchesAll')) {
      const maxLengthValidation = findValidationMetadata(validationMetadatas, 'maxLengthAndMatchesAll');
      inputProps.minLength = getValidationMetadataConstraints(maxLengthValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'lengthAndMatchesAll')) {
      const lengthValidation = findValidationMetadata(validationMetadatas, 'lengthAndMatchesAll');
      inputProps.minLength = getValidationMetadataConstraints(lengthValidation)[0];
      inputProps.maxLength = getValidationMetadataConstraints(lengthValidation)[1];
    }

    if (hasValidationMetadata(validationMetadatas, 'maxLengthAndMatches')) {
      const matchesValidation = findValidationMetadata(validationMetadatas, 'maxLengthAndMatches');
      inputProps.pattern = getValidationMetadataConstraints(matchesValidation)[1];
    } else if (hasValidationMetadata(validationMetadatas, 'lengthAndMatches')) {
      const matchesValidation = findValidationMetadata(validationMetadatas, 'lengthAndMatches');
      inputProps.pattern = getValidationMetadataConstraints(matchesValidation)[2];
    }
  } else if (hasValidationMetadata(validationMetadatas, 'isBoolean')) {
    inputProps.type = 'checkbox';
  } else if (
    hasValidationMetadata(validationMetadatas, 'isInt') ||
    hasValidationMetadata(validationMetadatas, 'isFloat') ||
    hasValidationMetadata(validationMetadatas, 'isBigInt')
  ) {
    inputProps.type = 'number';

    if (hasValidationMetadata(validationMetadatas, 'isDivisibleBy')) {
      const isDivisbleByValidation = findValidationMetadata(validationMetadatas, 'isDivisibleBy');
      inputProps.step = getValidationMetadataConstraints(isDivisbleByValidation)[0];
    }

    if (hasValidationMetadata(validationMetadatas, 'min')) {
      const minValidation = findValidationMetadata(validationMetadatas, 'min');
      inputProps.min = getValidationMetadataConstraints(minValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'max')) {
      const maxValidation = findValidationMetadata(validationMetadatas, 'max');
      inputProps.max = getValidationMetadataConstraints(maxValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'minMax')) {
      const minMaxValidation = findValidationMetadata(validationMetadatas, 'minMax');
      inputProps.min = getValidationMetadataConstraints(minMaxValidation)[0];
      inputProps.max = getValidationMetadataConstraints(minMaxValidation)[1];
    }
  } else if (hasValidationMetadata(validationMetadatas, 'isDate')) {
    if (hasValidationMetadata(validationMetadatas, 'uiProperties')) {
      const uiPropertiesMetadata = findValidationMetadata(validationMetadatas, 'uiProperties');
      const constraints = getValidationMetadataConstraints(uiPropertiesMetadata);
      if (constraints[0].isMonthAndYearOnly) {
        inputProps.type = 'month';
      } else if (constraints[0].isDateOnly) {
        inputProps.type = 'date';
      } else if (constraints[0].isTimeOnly) {
        inputProps.type = 'time';
      } else {
        inputProps.type = 'datetime-local';
      }
    } else {
      inputProps.type = 'datetime-local';
    }
  } else if (hasValidationMetadata(validationMetadatas, 'isIn')) {
    inputProps.type = 'select';
    const isInValidation = findValidationMetadata(validationMetadatas, 'isIn');
    inputProps.options = getValidationMetadataConstraints(isInValidation)[0];
    if (isInValidation.each) {
      inputProps.isMultiple = true;
    }
  }

  return inputProps;
}
