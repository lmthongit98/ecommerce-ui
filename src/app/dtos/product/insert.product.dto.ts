export class InsertProductDTO {
  name: string;
  price: number;
  description: string;
  categoryId: number;
  images: File[] = [];

  constructor(data: any) {
    this.name = data.name;
    this.price = data.price;
    this.description = data.description;
    this.categoryId = data.categoryId;
  }
}
