import _Id from './_Id';
import { Max, Min } from 'class-validator';
import IsUndefined from '../../decorators/typeproperty/IsUndefined';

export default class _IdAndVersion extends _Id {
  constructor() {
    super();
    this.version = 0;
  }

  @IsUndefined({ groups: ['__backk_create__'] })
  @Min(-1)
  @Max(Number.MAX_SAFE_INTEGER)
  version!: number | undefined;
}
