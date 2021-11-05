import _IdAndCaptcha from './_IdAndCaptcha';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndLastModifiedTimestamp extends _IdAndCaptcha {
  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date;
}
