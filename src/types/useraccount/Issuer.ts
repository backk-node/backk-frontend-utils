import { IsString, IsUrl, MaxLength } from 'class-validator';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class Issuer {
  constructor() {
    this.issuer = '';
  }

  @IsUndefined({ groups: ['__backk_update__'] })
  @IsString()
  @IsUrl()
  @MaxLength(255)
  issuer!: string | undefined;
}
