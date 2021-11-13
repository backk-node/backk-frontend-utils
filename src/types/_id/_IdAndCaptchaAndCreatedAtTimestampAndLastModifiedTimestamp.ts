import _IdAndCaptchaAndCreatedAtTimestamp from './_IdAndCaptchaAndCreatedAtTimestamp';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndCreatedAtTimestampAndLastModifiedTimestamp extends _IdAndCaptchaAndCreatedAtTimestamp {
  constructor() {
    super();
    this.lastModifiedTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date | undefined;
}
