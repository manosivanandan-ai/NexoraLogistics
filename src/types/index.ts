export interface Service {
  id: string;
  title: string;
  description: string;
  detail: string;
  icon: string;
  tag: string;
}

export interface Industry {
  id: string;
  label: string;
  headline: string;
  description: string;
  metrics: { label: string; value: string }[];
  accent: string;
}

export interface Shipment {
  id: string;
  origin: string;
  destination: string;
  status: 'In Transit' | 'Delivered' | 'Processing' | 'Delayed' | 'On Schedule';
  eta: string;
  weight: string;
  service: string;
  milestones: Milestone[];
  customer: string;
}

export interface Milestone {
  location: string;
  status: 'completed' | 'active' | 'pending';
  time?: string;
  note?: string;
}

export interface Metric {
  label: string;
  value: string;
  unit?: string;
  change?: string;
  positive?: boolean;
}

export interface CaseStudy {
  id: string;
  sector: string;
  headline: string;
  description: string;
  result: string;
  metrics: { label: string; value: string }[];
  color: string;
}

export interface Enquiry {
  enquiryId: string;
  customerName: string;
  company: string;
  email: string;
  phone: string;
  origin: string;
  destination: string;
  freightType: string;
  quantity: number;
  weight: string;
  length?: string;
  width?: string;
  height?: string;
  pickupDate: string;
  priority: 'Standard' | 'Express' | 'Urgent';
  status: 'Received' | 'Processing' | 'Assigned' | 'Quote In Progress' | 'Quoted';
  createdAt: string;
}

export interface ConnectedStage {
  id: string;
  label: string;
  description: string;
  detail: string;
  icon: string;
}

export interface ChartDataPoint {
  label: string;
  value: number;
}
