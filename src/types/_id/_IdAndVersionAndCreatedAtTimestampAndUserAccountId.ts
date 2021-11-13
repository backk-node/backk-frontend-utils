import _IdAndVersionAndCreatedAtTimestamp from './_IdAndVersionAndCreatedAtTimestamp';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';

export default class _IdAndVersionAndCreatedAtTimestampAndUserAccountId extends _IdAndVersionAndCreatedAtTimestamp {
  constructor() {
    super();
    this.userAccountId = '';
  }

  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  userAccountId!: string;
}
