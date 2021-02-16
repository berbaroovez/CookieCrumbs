export interface Order {
  id: string;
  bakerId: string;
  name: string;
  email: string;
  phoneNumber: string;
  contactMethod: string;
  eventDate: string;
  theme: string;
  quantity: number;
  notes: string;
  createdAt: string;
  status: string;
  cost: number;
  pickupDate?: string;
}
