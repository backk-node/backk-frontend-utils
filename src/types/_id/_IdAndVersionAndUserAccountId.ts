import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';
import _IdAndVersion from './_IdAndVersion';

export default class _IdAndVersionAndUserAccountId extends _IdAndVersion {
  constructor() {
    super();
    this.userAccountId = '';
  }

  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  userAccountId!: string;
}
