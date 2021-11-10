import _IdAndCaptcha from '../_id/_IdAndCaptcha';
import { IsString, MaxLength } from 'class-validator';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';
import IsSubject from '../../decorators/typeproperty/IsSubject';

export default class BaseUserAccount extends _IdAndCaptcha {
  @IsUndefined({ groups: ['__backk_update__'] })
  @IsString()
  @MaxLength(255)
  @IsSubject()
  subject!: string | undefined;
}
