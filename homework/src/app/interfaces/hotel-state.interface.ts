import { Hotel } from './hotel.interface';

export interface HotelState {
  hotels: Hotel[];
  isLoading: boolean;
  error: string;
}
