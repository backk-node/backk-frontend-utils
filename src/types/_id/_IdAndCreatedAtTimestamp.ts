import _Id from './_Id';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCreatedAtTimestamp extends _Id {
  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  createdAtTimestamp: Date | undefined = undefined;
}
