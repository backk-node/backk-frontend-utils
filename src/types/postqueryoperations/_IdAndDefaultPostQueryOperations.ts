import DefaultPostQueryOperations from './DefaultPostQueryOperations';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';
import { Values } from '../../constants/constants';

export default class _IdAndDefaultPostQueryOperations extends DefaultPostQueryOperations {
  @IsStringOrObjectId()
  @MaxLengthAndMatches(Values._24, /^[a-f\d]{1,24}$/)
  _id!: string;
}
