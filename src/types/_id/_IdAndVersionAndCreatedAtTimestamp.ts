import _IdAndVersion from './_IdAndVersion';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndVersionAndCreatedAtTimestamp extends _IdAndVersion {
  constructor() {
    super();
    this.createdAtTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  createdAtTimestamp!: Date | undefined;
}
