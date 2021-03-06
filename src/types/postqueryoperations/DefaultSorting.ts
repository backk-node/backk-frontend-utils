import { PostQueryOperations } from './PostQueryOperations';
import SortBy from './SortBy';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInstance, IsOptional, ValidateNested } from 'cv-pksilen';
import { Values } from '../../constants/constants';
import { Type } from 'class-transformer';

export default class DefaultSorting implements PostQueryOperations {
  @IsOptional()
  @IsInstance(SortBy, { each: true })
  @ValidateNested({ each: true })
  @Type(() => SortBy)
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(Values._25)
  sortBys: SortBy[] = [new SortBy('*', '_id', 'ASC'), new SortBy('*', 'id', 'ASC')];
}
