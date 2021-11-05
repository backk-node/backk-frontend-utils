import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';
import _IdAndCreatedAtTimestamp from './_IdAndCreatedAtTimestamp';

export default class _IdAndCreatedAtTimestampAndUserAccountId extends _IdAndCreatedAtTimestamp {
  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  userAccountId!: string;
}
