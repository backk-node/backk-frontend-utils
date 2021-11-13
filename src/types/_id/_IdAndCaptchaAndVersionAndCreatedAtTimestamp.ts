import _IdAndCaptchaAndVersion from './_IdAndCaptchaAndVersion';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndVersionAndCreatedAtTimestamp extends _IdAndCaptchaAndVersion {
  constructor() {
    super();
    this.createdAtTimestamp = new Date();
  }

  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  createdAtTimestamp!: Date | undefined;
}
