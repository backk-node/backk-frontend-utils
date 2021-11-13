import _IdAndCaptcha from './_IdAndCaptcha';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndCreatedAtTimestamp extends _IdAndCaptcha {
  constructor() {
    super();
    this.createdAtTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  createdAtTimestamp!: Date | undefined;
}
