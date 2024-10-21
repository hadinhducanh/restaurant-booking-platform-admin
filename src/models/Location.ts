import { BrandResponse } from "./Brand";
import { CategoryResponse } from "./Category";
import { EntityStatus } from "./Status";
import { TagResponse } from "./Tag";
import { UserResponse } from "./User";
import { WorkingHourResponse } from "./WorkingHour";

export interface LocationResponseLazy {
  id: number;
  name: string;
  categoryName: string[];
  address: string;
  phone: string;
  onSuggest: number;
  onSale: number;
  onBanner: number;
  view: number;
  rating: number;
  latitude: number;
  longitude: number;
  distance: string;
  description: string;
  status: string;
  image: string;
  tagName: string[];
}

export interface LocationResponse {
  id: number;
  name: string;
  address: string;
  phone: string;
  onSuggest: number;
  onSale: number;
  onBanner: number;
  view: number;
  rating: number;
  latitude: number;
  longitude: number;
  distance: string;
  description: string;
  status: EntityStatus;
  image: string;
  user: UserResponse;
  brand: BrandResponse;
  category: CategoryResponse[];
  tag: TagResponse[];
  workingHour: WorkingHourResponse[];
}
