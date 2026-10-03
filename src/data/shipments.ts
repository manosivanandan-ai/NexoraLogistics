import type { Shipment } from '../types';

export const shipments: Shipment[] = [
  {
    id: 'NX-48291',
    origin: 'Melbourne',
    destination: 'Brisbane',
    status: 'In Transit',
    eta: 'Tomorrow, 10:30 AM',
    weight: '420 kg',
    service: 'Interstate Freight',
    customer: 'ACME Retail',
    milestones: [
      { location: 'Melbourne', status: 'completed', time: 'Mon 06:45 AM', note: 'Picked up from Laverton DC' },
      { location: 'Albury', status: 'completed', time: 'Mon 02:15 PM', note: 'Linehaul depart' },
      { location: 'Sydney', status: 'active', time: 'Tue 08:00 AM', note: 'At distribution hub' },
      { location: 'Brisbane', status: 'pending', note: 'Final delivery – Yatala DC' },
    ],
  },
  {
    id: 'NX-48290',
    origin: 'Sydney',
    destination: 'Melbourne',
    status: 'Delivered',
    eta: 'Today, 09:15 AM',
    weight: '180 kg',
    service: 'Express Freight',
    customer: 'ACME Retail',
    milestones: [
      { location: 'Sydney', status: 'completed', time: 'Sun 11:00 PM', note: 'Collected' },
      { location: 'Canberra', status: 'completed', time: 'Mon 03:30 AM', note: 'Overnight transit' },
      { location: 'Melbourne', status: 'completed', time: 'Mon 09:15 AM', note: 'Delivered – signed by J. Miller' },
    ],
  },
  {
    id: 'NX-48287',
    origin: 'Melbourne',
    destination: 'Adelaide',
    status: 'Processing',
    eta: 'Oct 4, 02:00 PM',
    weight: '650 kg',
    service: 'Road Freight',
    customer: 'ACME Retail',
    milestones: [
      { location: 'Melbourne', status: 'active', time: 'Wed – scheduled', note: 'Pickup scheduled – Somerton depot' },
      { location: 'Adelaide', status: 'pending', note: 'Delivery – Regency Park' },
    ],
  },
];

export const customerShipments = [
  { id: 'NX-48291', route: 'MEL → BNE', status: 'In Transit', eta: 'Tomorrow', statusColor: '#BEFF47' },
  { id: 'NX-48290', route: 'SYD → MEL', status: 'Delivered', eta: 'Today', statusColor: '#22C55E' },
  { id: 'NX-48287', route: 'MEL → ADL', status: 'Processing', eta: 'Oct 4', statusColor: '#FF8C3A' },
  { id: 'NX-48284', route: 'BNE → SYD', status: 'In Transit', eta: 'Today 4PM', statusColor: '#BEFF47' },
  { id: 'NX-48281', route: 'SYD → PER', status: 'On Schedule', eta: 'Oct 6', statusColor: '#6B7D6F' },
];

export const liveNetworkStatus = [
  { route: 'Melbourne → Sydney', status: 'IN TRANSIT', statusColor: '#BEFF47' },
  { route: 'Sydney → Brisbane', status: 'ON SCHEDULE', statusColor: '#BEFF47' },
  { route: 'Adelaide → Melbourne', status: 'DELIVERED', statusColor: '#22C55E' },
  { route: 'Brisbane → Perth', status: 'IN TRANSIT', statusColor: '#BEFF47' },
  { route: 'Melbourne → Perth', status: 'PROCESSING', statusColor: '#FF8C3A' },
];
