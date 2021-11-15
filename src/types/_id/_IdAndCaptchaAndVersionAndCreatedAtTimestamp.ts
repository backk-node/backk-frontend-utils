import _IdAndCaptchaAndVersion from './_IdAndCaptchaAndVersion';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndVersionAndCreatedAtTimestamp extends _IdAndCaptchaAndVersion {
  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  createdAtTimestamp: Date | undefined = undefined;
}
