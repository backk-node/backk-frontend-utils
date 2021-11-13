import _IdAndCaptchaAndVersion from './_IdAndCaptchaAndVersion';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndVersionAndLastModifiedTimestamp extends _IdAndCaptchaAndVersion {
  constructor() {
    super();
    this.lastModifiedTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date | undefined;
}
