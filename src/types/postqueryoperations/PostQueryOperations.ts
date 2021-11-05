import { Projection } from './Projection';
import { SortBys } from './SortBys';
import Pagination from './Pagination';
import CurrentPageToken from './CurrentPageToken';

export interface PostQueryOperations extends Projection, SortBys {
  paginations?: Pagination[];
  currentPageTokens?: CurrentPageToken[];
}
