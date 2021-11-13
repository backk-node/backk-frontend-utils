import _IdAndVersionAndLastModifiedTimestamp from './_IdAndVersionAndLastModifiedTimestamp';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';

export default class _IdAndVersionAndLastModifiedTimestampAndUserAccountId extends _IdAndVersionAndLastModifiedTimestamp {
  constructor() {
    super();
    this.userAccountId = '';
  }

  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  userAccountId!: string;
}
