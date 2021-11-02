export default class CurrentPageToken {
  constructor(subEntityPath: string, currentPageToken: string) {
    this.subEntityPath = subEntityPath;
    this.currentPageToken = currentPageToken;
  }

  subEntityPath?: string = '';
  currentPageToken!: string;
}
