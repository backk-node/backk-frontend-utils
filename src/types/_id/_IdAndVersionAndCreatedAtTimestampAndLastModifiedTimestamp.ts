import _IdAndVersionAndCreatedAtTimestamp from './_IdAndVersionAndCreatedAtTimestamp';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndVersionAndCreatedAtTimestampAndLastModifiedTimestamp extends _IdAndVersionAndCreatedAtTimestamp {
  constructor() {
    super();
    this.lastModifiedTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date | undefined;
}
