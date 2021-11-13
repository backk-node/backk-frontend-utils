import _IdAndCaptcha from './_IdAndCaptcha';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndCreatedAtTimestamp extends _IdAndCaptcha {
  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  createdAtTimestamp!: Date | undefined;
}
