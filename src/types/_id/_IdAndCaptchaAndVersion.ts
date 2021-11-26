import _IdAndCaptcha from './_IdAndCaptcha';
import { IsInt, Max, Min } from 'cv-pksilen';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndVersion extends _IdAndCaptcha {
  @IsUndefined({ groups: ['__backk_create__'] })
  @IsInt()
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  version: number | undefined = undefined;
}
