import { Room } from './room-interface';

export interface Hotel {
  id: number;
  name: string;
  address: string;
  city: string;
  country: string;
  stars: number;
  image: string;
  rooms: Room[];
}
