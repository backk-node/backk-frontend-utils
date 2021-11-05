import _IdAndCreatedAtTimestampAndLastModifiedTimestamp from './_IdAndCreatedAtTimestampAndLastModifiedTimestamp';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';

export default class _IdAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId extends _IdAndCreatedAtTimestampAndLastModifiedTimestamp {
  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  userAccountId!: string;
}
