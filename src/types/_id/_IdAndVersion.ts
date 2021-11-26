import _Id from './_Id';
import { IsInt, Max, Min } from 'cv-pksilen';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndVersion extends _Id {
  @IsUndefined({ groups: ['__backk_create__'] })
  @IsInt()
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  version: number | undefined = undefined;
}
