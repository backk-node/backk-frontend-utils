import { PostQueryOperations } from './PostQueryOperations';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsInstance, IsOptional, ValidateNested } from 'cv-pksilen';
import Pagination from './Pagination';
import { Values } from '../../constants/constants';
import { Type } from 'class-transformer';

export default class DefaultPagination implements PostQueryOperations {
  @IsOptional()
  @IsInstance(Pagination, { each: true })
  @ValidateNested({ each: true })
  @Type(() => Pagination)
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(Values._25)
  paginations: Pagination[] = [new Pagination('*', 1, Values._50)];
}
