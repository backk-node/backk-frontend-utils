import IsUndefined from '../decorators/typeproperty/IsUndefined';
import { Max, Min } from 'class-validator';

export default class Version {
  @IsUndefined({ groups: ['__backk_create__'] })
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  version!: number | undefined;
}
