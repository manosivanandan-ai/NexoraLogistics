import type { Metric, ChartDataPoint } from '../types';

export const operationalMetrics: Metric[] = [
  { label: 'Shipments this month', value: '2,481', change: '+12%', positive: true },
  { label: 'On-time delivery', value: '96.8', unit: '%', change: '+1.2%', positive: true },
  { label: 'Customer enquiries', value: '1,284', change: '+8%', positive: false },
  { label: 'Resolved within SLA', value: '94', unit: '%', change: '+3%', positive: true },
  { label: 'Customer satisfaction', value: '4.8', unit: '/5', change: '+0.2', positive: true },
];

export const enquiryVolumeData: ChartDataPoint[] = [
  { label: 'Jan', value: 180 },
  { label: 'Feb', value: 210 },
  { label: 'Mar', value: 195 },
  { label: 'Apr', value: 240 },
  { label: 'May', value: 285 },
  { label: 'Jun', value: 260 },
];

export const resolutionTimeData: ChartDataPoint[] = [
  { label: 'Jan', value: 4.2 },
  { label: 'Feb', value: 3.8 },
  { label: 'Mar', value: 3.5 },
  { label: 'Apr', value: 3.1 },
  { label: 'May', value: 2.7 },
  { label: 'Jun', value: 2.4 },
];

export const aiAlerts = {
  delayedShipments: 7,
  unresolvedEnquiries: 4,
  highPriorityAccounts: 2,
  totalIssues: 3,
};
