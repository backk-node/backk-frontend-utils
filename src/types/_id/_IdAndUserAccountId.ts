import _Id from './_Id';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';

export default class _IdAndUserAccountId extends _Id {
  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  userAccountId!: string;
}
