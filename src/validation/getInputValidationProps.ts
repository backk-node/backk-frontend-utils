import { getMetadataStorage } from 'cv-pksilen';
import {
  findValidationMetadata,
  getValidationMetadataConstraints,
  hasValidationMetadata,
} from '../utils/getInputType';
import dayjs from 'dayjs';
import { Unit } from '../decorators/typeproperty/IsTimestampBetween';

const minValues = {
  year: 1970,
  month: 0,
  date: 1,
  hour: 0,
  minute: 0,
};

const maxValues = {
  year: 9999,
  month: 11,
  date: 31,
  hour: 23,
  minute: 59,
};

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
    if (hasValidationMetadata(validationMetadatas, 'isTimestampBetween')) {
      const uiPropertiesMetadata = findValidationMetadata(validationMetadatas, 'uiProperties');

      let uiConstraints;
      if (uiPropertiesMetadata) {
        uiConstraints = getValidationMetadataConstraints(uiPropertiesMetadata);
      }

      const startTimestamp = dayjs();
      const endTimestamp = dayjs();
      const modifiedUnits: Unit[] = [];

      validationMetadatas
        .filter((validationMetadata) => validationMetadata.name === 'isTimestampBetween')
        .forEach((validationMetadata) => {
          const [unit, startValue, endValue]: [Unit, number, number] =
            getValidationMetadataConstraints(validationMetadata);
          if (unit === 'isoDayOfWeek') {
            return;
          }

          startTimestamp.set(unit, startValue);
          endTimestamp.set(unit, endValue);
          // noinspection ReuseOfLocalVariableJS
          modifiedUnits.push(unit);
        });

      (['year', 'month', 'date', 'hour', 'minute'] as Unit[]).forEach((unit) => {
        if (!modifiedUnits.includes(unit)) {
          startTimestamp.set(unit as any, (minValues as any)[unit]);
          endTimestamp.set(unit as any, (maxValues as any)[unit]);
        }
      });

      if (modifiedUnits.length > 0) {
        if (uiConstraints?.[0].isMonthAndYearOnly) {
          inputValidationProps.min = startTimestamp.format('YYYY-MM');
          inputValidationProps.max = endTimestamp.format('YYYY-MM');
        } else if (uiConstraints?.[0].isDateOnly) {
          inputValidationProps.min = startTimestamp.format('YYYY-MM-DD');
          inputValidationProps.max = endTimestamp.format('YYYY-MM-DD');
        } else if (uiConstraints?.[0].isTimeOnly) {
          inputValidationProps.min = startTimestamp.format('HH:mm');
          inputValidationProps.max = endTimestamp.format('HH:mm');
        } else {
          inputValidationProps.min =
            startTimestamp.format('YYYY-MM-DD') + 'T' + startTimestamp.format('HH:mm');
          inputValidationProps.max = endTimestamp.format('YYYY-MM-DD') + 'T' + endTimestamp.format('HH:mm');
        }
      }
    }
  }

  return inputValidationProps;
}
