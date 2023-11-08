export default class Bike {
  handle: string;
  productType: string;
  createdAt: Date;
  vendor: string;
  totalInventory: number;
  availableForSale: boolean;
  priceRange: number;
  description: string;
  id: string;
  title: string;
  imgUrl: string;
  category: string;

  constructor(
    handle: string,
    productType: string,
    createdAt: Date,
    vendor: string,
    totalInventory: number,
    availableForSale: boolean,
    priceRange: number,
    description: string,
    id: string,
    title: string,
    imgUrl: string,
    category: string,
  ) {
    this.handle = handle
    this.productType = productType
    this.createdAt = createdAt
    this.vendor = vendor
    this.totalInventory = totalInventory
    this.availableForSale = availableForSale
    this.priceRange = priceRange
    this.description = description
    this.id = id
    this.title = title
    this.imgUrl = imgUrl
    this.category = category
  }

  getId(): string {
    return this.id
  }
}