import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';

export default class _Id {
  @IsUndefined({ groups: ['__backk_create__'] })
  @IsStringOrObjectId({ groups: ['__backk_update__'] })
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/, { groups: ['__backk_update__'] })
  _id!: string;
}
