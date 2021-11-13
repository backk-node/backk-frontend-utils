import _IdAndCreatedAtTimestamp from './_IdAndCreatedAtTimestamp';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCreatedAtTimestampAndLastModifiedTimestamp extends _IdAndCreatedAtTimestamp {
  constructor() {
    super();
    this.lastModifiedTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date | undefined;
}
