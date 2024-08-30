export type Tcars = {
  name: string;
  description: string;
  color: string;
  isElectric: boolean;
  status: 'available' | 'unavailabel';
  features: string[];
  pricePerHour: number;
  isDeleted: boolean;
};
