import _IdAndCaptcha from './_IdAndCaptcha';
import { Max, Min } from 'class-validator';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptchaAndVersion extends _IdAndCaptcha {
  @IsUndefined({ groups: ['__backk_create__'] })
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  version!: number | undefined;
}
