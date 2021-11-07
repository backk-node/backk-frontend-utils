import { MaxLength } from 'class-validator';
import IsAnyString from '../decorators/typeproperty/IsAnyString';
import { Lengths } from '../constants/constants';

export default class Value {
  @MaxLength(Lengths._1K)
  @IsAnyString()
  value!: string;
}
