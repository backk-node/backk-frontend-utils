import { IsAscii, IsString, MaxLength } from 'class-validator';
import _Id from './_Id';
import { Lengths } from '../../constants/constants';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndCaptcha extends _Id {
  @IsUndefined({ groups: ['__backk_update__'] })
  @IsString()
  @MaxLength(Lengths._512)
  @IsAscii()
  captchaToken!: string | undefined;
}
