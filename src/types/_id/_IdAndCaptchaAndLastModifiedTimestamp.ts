import _IdAndCaptcha from './_IdAndCaptcha';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndLastModifiedTimestamp extends _IdAndCaptcha {
  constructor() {
    super();
    this.lastModifiedTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date | undefined;
}
