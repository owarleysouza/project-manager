export interface Project {
  id: string;
  name: string;
  client: string;
  startDate: Date;
  endDate: Date;
  image: string;
  isFavorite: boolean;
}