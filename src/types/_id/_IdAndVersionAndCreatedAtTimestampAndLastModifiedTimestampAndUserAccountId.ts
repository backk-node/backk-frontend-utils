import _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestamp from './_IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestamp';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';

export default class _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestampAndUserAccountId extends _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestamp {
  constructor() {
    super();
    this.userAccountId = '';
  }

  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  userAccountId!: string;
}
