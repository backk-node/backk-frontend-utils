import _IdAndVersionAndCreatedAtTimestamp from './_IdAndVersionAndCreatedAtTimestamp';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestamp extends _IdAndVersionAndCreatedAtTimestamp {
  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp: Date | undefined = undefined;
}
