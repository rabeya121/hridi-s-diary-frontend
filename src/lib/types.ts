export interface Product {
  _id: string;
  title: string;
  category: "skincare" | "haircare" | "undergarments";
  shortDescription: string;
  fullDescription: string;
  price: number;
  discountPrice?: number;
  images: string[];
  specs: {
    skinType?: string;
    size?: string;
    brand?: string;
    material?: string;
  };
  rating: number;
  reviewCount: number;
  stock: number;
  createdAt: string;
}

export interface ProductsResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    totalPages: number;
  };
}