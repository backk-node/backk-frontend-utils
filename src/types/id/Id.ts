import MaxLengthAndMatches from '../../decorators/typeproperty/MaxLengthAndMatches';
import IsStringOrObjectId from '../../decorators/typeproperty/IsStringOrObjectId';

export default class Id {
  constructor() {
    this.id = '';
  }

  @IsStringOrObjectId()
  @MaxLengthAndMatches(24, /^[a-f\d]{1,24}$/)
  id!: string;
}
