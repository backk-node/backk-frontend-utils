import _IdAndCaptchaAndVersionAndCreatedAtTimestamp from './_IdAndCaptchaAndVersionAndCreatedAtTimestamp';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndVersionAndCreatedAtTimestampAndLastModifiedTimestamp extends _IdAndCaptchaAndVersionAndCreatedAtTimestamp {
  @IsUndefined({ groups: ['__backk_create__', '__backk_update__'] })
  lastModifiedTimestamp!: Date | undefined;
}
