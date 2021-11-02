export default class SortBy {
  constructor(subEntityPath: string, fieldName: string, sortDirection: 'ASC' | 'DESC') {
    this.subEntityPath = subEntityPath;
    this.fieldName = fieldName;
    this.sortDirection = sortDirection;
  }

  subEntityPath?: string = '';
  fieldName!: string;
  sortDirection!: 'ASC' | 'DESC';
}
