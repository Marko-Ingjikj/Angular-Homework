export interface Room {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  persons: number;
  children: number;
  amenities: string[];
  isAvailable: boolean;
}
