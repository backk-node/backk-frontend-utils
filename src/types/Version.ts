import IsUndefined from '../decorators/typeproperty/IsUndefined';
import { IsInt, Max, Min } from 'cv-pksilen';

export default class Version {
  @IsUndefined({ groups: ['__backk_create__'] })
  @IsInt()
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  version: number | undefined = undefined;
}
