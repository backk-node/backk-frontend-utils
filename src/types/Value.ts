import { MaxLength } from 'cv-pksilen';
import IsAnyString from '../decorators/typeproperty/IsAnyString';
import { Lengths } from '../constants/constants';

export default class Value {
  @MaxLength(Lengths._1K)
  @IsAnyString()
  value!: string;
}
