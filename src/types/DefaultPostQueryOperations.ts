import SortBy from './SortBy';
import Pagination from './Pagination';
import { Values } from '../constants/constants';
import CurrentPageToken from './CurrentPageToken';

export default class DefaultPostQueryOperations {
  constructor(pageNumber: number = 1, pageSize: number = Values._50) {
    this.paginations = [new Pagination('*', 1, pageSize)];
  }

  includeResponseFields?: string[] = [];
  excludeResponseFields?: string[] = [];
  sortBys: SortBy[] = [new SortBy('*', '_id', 'ASC'), new SortBy('*', 'id', 'ASC')];
  paginations: Pagination[];
  currentPageTokens: CurrentPageToken[] = [];
}
