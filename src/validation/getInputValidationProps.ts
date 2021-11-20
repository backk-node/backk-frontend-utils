import { getMetadataStorage } from 'cv-pksilen';
import {
  findValidationMetadata,
  getValidationMetadataConstraints,
  hasValidationMetadata,
} from '../utils/getInputType';
import dayjs from 'dayjs';

export default function getInputValidationProps<T extends { [key: string]: any }>(
  ArgumentClass: new () => T,
  propertyName: keyof T
) {
  const inputValidationProps: any = {};
  const validationMetadatas = getMetadataStorage()
    .getTargetValidationMetadatas(ArgumentClass, '', false, false)
    .filter((validationMetadata) => validationMetadata.propertyName === propertyName);

  if (hasValidationMetadata(validationMetadatas, 'isString')) {
    if (hasValidationMetadata(validationMetadatas, 'minLength')) {
      const minLengthValidation = findValidationMetadata(validationMetadatas, 'minLength');
      inputValidationProps.minLength = getValidationMetadataConstraints(minLengthValidation)[0];
    }

    if (hasValidationMetadata(validationMetadatas, 'maxLength')) {
      const maxLengthValidation = findValidationMetadata(validationMetadatas, 'maxLength');
      inputValidationProps.maxLength = getValidationMetadataConstraints(maxLengthValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'length')) {
      const lengthValidation = findValidationMetadata(validationMetadatas, 'length');
      inputValidationProps.minLength = getValidationMetadataConstraints(lengthValidation)[0];
      inputValidationProps.maxLength = getValidationMetadataConstraints(lengthValidation)[1];
    }
    if (hasValidationMetadata(validationMetadatas, 'maxLengthAndMatches')) {
      const maxLengthValidation = findValidationMetadata(validationMetadatas, 'maxLengthAndMatches');
      inputValidationProps.minLength = getValidationMetadataConstraints(maxLengthValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'lengthAndMatches')) {
      const lengthValidation = findValidationMetadata(validationMetadatas, 'lengthAndMatches');
      inputValidationProps.minLength = getValidationMetadataConstraints(lengthValidation)[0];
      inputValidationProps.maxLength = getValidationMetadataConstraints(lengthValidation)[1];
    }
    if (hasValidationMetadata(validationMetadatas, 'maxLengthAndMatchesAll')) {
      const maxLengthValidation = findValidationMetadata(validationMetadatas, 'maxLengthAndMatchesAll');
      inputValidationProps.minLength = getValidationMetadataConstraints(maxLengthValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'lengthAndMatchesAll')) {
      const lengthValidation = findValidationMetadata(validationMetadatas, 'lengthAndMatchesAll');
      inputValidationProps.minLength = getValidationMetadataConstraints(lengthValidation)[0];
      inputValidationProps.maxLength = getValidationMetadataConstraints(lengthValidation)[1];
    }

    if (hasValidationMetadata(validationMetadatas, 'maxLengthAndMatches')) {
      const matchesValidation = findValidationMetadata(validationMetadatas, 'maxLengthAndMatches');
      inputValidationProps.pattern = getValidationMetadataConstraints(matchesValidation)[1];
    } else if (hasValidationMetadata(validationMetadatas, 'lengthAndMatches')) {
      const matchesValidation = findValidationMetadata(validationMetadatas, 'lengthAndMatches');
      inputValidationProps.pattern = getValidationMetadataConstraints(matchesValidation)[2];
    }
  } else if (
    hasValidationMetadata(validationMetadatas, 'isInt') ||
    hasValidationMetadata(validationMetadatas, 'isFloat') ||
    hasValidationMetadata(validationMetadatas, 'isBigInt')
  ) {
    if (hasValidationMetadata(validationMetadatas, 'isDivisibleBy')) {
      const isDivisbleByValidation = findValidationMetadata(validationMetadatas, 'isDivisibleBy');
      inputValidationProps.step = getValidationMetadataConstraints(isDivisbleByValidation)[0];
    } else {
      inputValidationProps.step = 1;
    }

    if (hasValidationMetadata(validationMetadatas, 'min')) {
      const minValidation = findValidationMetadata(validationMetadatas, 'min');
      inputValidationProps.min = getValidationMetadataConstraints(minValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'max')) {
      const maxValidation = findValidationMetadata(validationMetadatas, 'max');
      inputValidationProps.max = getValidationMetadataConstraints(maxValidation)[0];
    }
    if (hasValidationMetadata(validationMetadatas, 'minMax')) {
      const minMaxValidation = findValidationMetadata(validationMetadatas, 'minMax');
      inputValidationProps.min = getValidationMetadataConstraints(minMaxValidation)[0];
      inputValidationProps.max = getValidationMetadataConstraints(minMaxValidation)[1];
    }
  } else if (hasValidationMetadata(validationMetadatas, 'isDate')) {
    const isDateBetweenValidationMetadata = findValidationMetadata(validationMetadatas, 'isDateBetween');
    const isDateBetweenRelativeValidationMetadata = findValidationMetadata(
      validationMetadatas,
      'isDateBetweenRelative'
    );
    const isInFutureValidationMetadata = findValidationMetadata(validationMetadatas, 'isInFuture');
    const isInPastValidationMetadata = findValidationMetadata(validationMetadatas, 'isInPast');
    const isTimeBetweenValidationMetadata = findValidationMetadata(validationMetadatas, 'isTimeBetween');
    const isTimestampBetweenValidationMetadata = findValidationMetadata(
      validationMetadatas,
      'isTimestampBetween'
    );
    const isTimestampBetweenRelativeValidationMetadata = findValidationMetadata(
      validationMetadatas,
      'isTimestampBetweenRelative'
    );
    const isYearAndMonthBetweenValidationMetadata = findValidationMetadata(
      validationMetadatas,
      'isYearAndMonthBetween'
    );
    const isYearAndMonthBetweenRelativeValidationMetadata = findValidationMetadata(
      validationMetadatas,
      'isYearAndMonthBetweenRelative'
    );

    if (isYearAndMonthBetweenValidationMetadata) {
      inputValidationProps.min = isYearAndMonthBetweenValidationMetadata.constraints[1];
      inputValidationProps.max = isYearAndMonthBetweenValidationMetadata.constraints[2];
    } else if (isYearAndMonthBetweenRelativeValidationMetadata) {
      const [, startValueSubtractAmount, startValueSubtractUnit, endValueAddAmount, endValueAddUnit] =
        isYearAndMonthBetweenRelativeValidationMetadata.constraints;
      const startDate = dayjs().subtract(startValueSubtractAmount, startValueSubtractUnit).format('YYYY-MM');
      const endDate = dayjs().add(endValueAddAmount, endValueAddUnit).format('YYYY-MM');
      inputValidationProps.min = startDate;
      inputValidationProps.max = endDate;
    } else if (isDateBetweenValidationMetadata) {
      inputValidationProps.min = isDateBetweenValidationMetadata.constraints[1];
      inputValidationProps.max = isDateBetweenValidationMetadata.constraints[2];
    } else if (isDateBetweenRelativeValidationMetadata) {
      const [, startValueSubtractAmount, startValueSubtractUnit, endValueAddAmount, endValueAddUnit] =
        isDateBetweenRelativeValidationMetadata.constraints;
      const startDate = dayjs()
        .subtract(startValueSubtractAmount, startValueSubtractUnit)
        .format('YYYY-MM-DD');
      const endDate = dayjs().add(endValueAddAmount, endValueAddUnit).format('YYYY-MM-DD');
      inputValidationProps.min = startDate;
      inputValidationProps.max = endDate;
    } else if (isTimeBetweenValidationMetadata) {
      inputValidationProps.min = isTimeBetweenValidationMetadata.constraints[1];
      inputValidationProps.max = isTimeBetweenValidationMetadata.constraints[2];
    } else if (isTimestampBetweenValidationMetadata) {
      inputValidationProps.min = isTimestampBetweenValidationMetadata.constraints[1];
      inputValidationProps.max = isTimestampBetweenValidationMetadata.constraints[2];
    } else if (isTimestampBetweenRelativeValidationMetadata) {
      const [, startValueSubtractAmount, startValueSubtractUnit, endValueAddAmount, endValueAddUnit] =
        isTimestampBetweenRelativeValidationMetadata.constraints;
      const startDate = dayjs().subtract(startValueSubtractAmount, startValueSubtractUnit);
      const endDate = dayjs().add(endValueAddAmount, endValueAddUnit);
      inputValidationProps.min = startDate;
      inputValidationProps.max = endDate;
    }
  }

  return inputValidationProps;
}
