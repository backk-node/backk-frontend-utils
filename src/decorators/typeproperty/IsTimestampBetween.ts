import { registerDecorator, ValidationOptions } from 'cv-pksilen';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isoWeek from 'dayjs/plugin/isoWeek';
import isLeapYear from 'dayjs/plugin/isLeapYear';

dayjs.extend(isBetween);
dayjs.extend(isoWeek);
dayjs.extend(isLeapYear);

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
  hour: 23,
  minute: 59,
};

function getMaxDate(timestamp: dayjs.Dayjs) {
  switch (timestamp.month()) {
    case 0:
    case 2:
    case 4:
    case 6:
    case 7:
    case 9:
    case 11:
      return 31;
    case 3:
    case 5:
    case 8:
    case 10:
      return 30;
    case 1:
      if (timestamp.isLeapYear()) {
        return 29;
      }
      return 28;
    default:
      throw new Error('Invalid month');
  }
}

export type Unit = 'year' | 'month' | 'date' | 'hour' | 'minute' | 'isoDayOfWeek';

export default function IsTimestampBetween(
  unit: Unit,
  startValue: number,
  endValue: number,
  validationOptions?: ValidationOptions
) {
  return function (object: Record<string, any>, propertyName: string) {
    registerDecorator({
      name: 'isTimestampBetween',
      target: object.constructor,
      propertyName: propertyName,
      constraints: ['isTimestampBetween', unit, startValue, endValue],
      options: validationOptions,
      validator: {
        validate(value: any) {
          const date = dayjs(value);
          if (unit === 'isoDayOfWeek') {
            const dayOfWeek = date.isoWeekday();
            return dayOfWeek >= startValue && dayOfWeek <= endValue;
          }

          let startTimestamp = dayjs();
          let endTimestamp = dayjs();

          startTimestamp = startTimestamp.set(unit, startValue);
          endTimestamp = endTimestamp.set(unit, endValue);

          (['year', 'month', 'date', 'hour', 'minute'] as Unit[]).forEach((otherUnit) => {
            if (otherUnit !== unit) {
              startTimestamp = startTimestamp.set(otherUnit as any, (minValues as any)[otherUnit]);
              endTimestamp = endTimestamp.set(
                otherUnit as any,
                otherUnit === 'date' ? getMaxDate(endTimestamp) : (maxValues as any)[otherUnit]
              );
            }
          });

          return date.isBetween(startTimestamp, endTimestamp, unit);
        },
        defaultMessage: () =>
          propertyName +
          ' must be a timestamp where ' +
          unit +
          ' is between ' +
          startValue +
          ' and ' +
          endValue,
      },
    });
  };
}
