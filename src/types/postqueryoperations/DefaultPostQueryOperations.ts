import { PostQueryOperations } from './PostQueryOperations';
import SortBy from './SortBy';
import {
  ArrayMaxSize,
  ArrayMinSize,
  ArrayUnique,
  IsArray,
  IsInstance,
  IsOptional,
  IsString,
  ValidateNested,
} from 'cv-pksilen';
import Pagination from './Pagination';
import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';
import { Lengths, Values } from '../../constants/constants';
import CurrentPageToken from './CurrentPageToken';

export default class DefaultPostQueryOperations implements PostQueryOperations {
  constructor(pageNumber: number = 1, pageSize: number = Values._50) {
    this.paginations = [new Pagination('*', pageNumber, pageSize)];
  }

  @IsOptional()
  @IsString({ each: true })
  @MaxLengthAndMatches(Lengths._512, /^[a-zA-Z_]([a-zA-Z0-9_.])+$/, { each: true }, true)
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(Values._500)
  @ArrayUnique()
  includeResponseFields?: string[] = [];

  @IsOptional()
  @IsString({ each: true })
  @MaxLengthAndMatches(Lengths._512, /^[a-zA-Z_]([a-zA-Z0-9_.])+$/, { each: true }, true)
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(Values._100)
  @ArrayUnique()
  excludeResponseFields?: string[] = [];

  @IsOptional()
  @IsInstance(SortBy, { each: true })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(Values._25)
  sortBys: SortBy[] = [new SortBy('*', '_id', 'ASC'), new SortBy('*', 'id', 'ASC')];

  @IsOptional()
  @IsInstance(Pagination, { each: true })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(Values._100)
  paginations: Pagination[];

  @IsOptional()
  @IsInstance(CurrentPageToken, { each: true })
  @ValidateNested({ each: true })
  @IsArray()
  @ArrayMinSize(0)
  @ArrayMaxSize(Values._100)
  currentPageTokens: CurrentPageToken[] = [];
}
