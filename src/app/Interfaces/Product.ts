export interface ProductDescription {
  id: number;
  lang: string;
  idprodotto: number;
  description: string;
}

export interface ColorDescription{
  id:number;
  color:string
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

  // Optional properties based on product type
  ghz?: number; // CPU GHz
  core?: number; // CPU Cores
  vram?: number; // GPU VRAM
  mhz?: number; // RAM MHz
  size?: number; // RAM/Storage Size
  cpuCompatibility?: string; // Motherboard CPU Compatibility
  watt?: number; // PSU Wattage
  color?: ColorDescription|null|string; // Case Color
  stype?: string; // Storage Type
}
