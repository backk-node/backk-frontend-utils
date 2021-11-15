import _IdAndVersion from './_IdAndVersion';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndVersionAndLastModifiedTimestamp extends _IdAndVersion {
  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp: Date | undefined = undefined;
}
