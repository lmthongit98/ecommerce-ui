export class InsertCategoryDTO {
  // @IsString()
  // @IsNotEmpty()
  name: string;

  constructor(data: any) {
    this.name = data.name;
  }
}
