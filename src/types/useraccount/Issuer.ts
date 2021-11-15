import { IsString, IsUrl, MaxLength } from 'cv-pksilen';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class Issuer {
  @IsUndefined({ groups: ['__backk_update__'] })
  @IsString()
  @IsUrl()
  @MaxLength(255)
  issuer: string | undefined = undefined;
}
