export default class Pagination {
  constructor(subEntityPath: string, pageNumber: number, pageSize: number) {
    this.subEntityPath = subEntityPath;
    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
  }

  subEntityPath?: string = '';
  pageNumber!: number;
  pageSize!: number;
}
