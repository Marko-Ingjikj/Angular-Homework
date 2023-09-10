import { Hotel } from './hotel.interface';
import { SearchFilters } from './search-filters.interface';

export interface HotelState {
  hotels: Hotel[];
  isLoading: boolean;
  error: string;
  filters: SearchFilters;
}
