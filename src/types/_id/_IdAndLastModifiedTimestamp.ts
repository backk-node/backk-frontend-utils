import _Id from './_Id';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndLastModifiedTimestamp extends _Id {
  constructor() {
    super();
    this.lastModifiedTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date | undefined;
}
