import { IsAscii, IsString, MaxLength } from 'cv-pksilen';
import { Lengths } from '../constants/constants';
import IsUndefined from '../decorators/typeproperty/IsUndefined';

export default class Captcha {
  @IsUndefined({ groups: ['__backk_update__'] })
  @IsString()
  @MaxLength(Lengths._512)
  @IsAscii()
  captchaToken!: string | undefined;
}
