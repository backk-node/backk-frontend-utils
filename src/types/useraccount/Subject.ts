import { IsString, MaxLength } from 'class-validator';
import IsSubject from '../../decorators/typeproperty/IsSubject';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class Subject {
  @IsUndefined({ groups: ['__backk_update__'] })
  @IsString()
  @IsSubject()
  @MaxLength(255)
  subject!: string | undefined;
}
