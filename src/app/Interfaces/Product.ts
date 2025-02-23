export interface ProductDescription {
  id: number;
  lang: string;
  id_prodotto: number;
  description: string;
}

export interface Product {
  id: number;
  brand: string;
  model: string;
  description: ProductDescription | null;
  type: string;
  stock: number;
  price: number;
  imageUrl: string;
}
