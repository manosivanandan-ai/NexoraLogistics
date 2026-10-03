import type { Industry } from '../types';

export const industries: Industry[] = [
  {
    id: 'retail',
    label: 'Retail',
    headline: 'Keep shelves stocked. Keep customers happy.',
    description: 'From DC to store, NEXORA keeps your retail supply chain moving with scheduled delivery windows, vendor-managed replenishment and full chain-of-custody visibility.',
    metrics: [
      { label: 'On-time delivery', value: '98.1%' },
      { label: 'DC locations', value: '8 hubs' },
      { label: 'Store networks', value: '1,200+' },
    ],
    accent: '#BEFF47',
  },
  {
    id: 'manufacturing',
    label: 'Manufacturing',
    headline: 'Raw material in. Finished product out. Seamlessly.',
    description: 'Inbound component delivery, inter-plant transfers and outbound distribution coordinated in one connected operation. JIT capability for production-critical freight.',
    metrics: [
      { label: 'Inbound accuracy', value: '99.3%' },
      { label: 'Avg. lead time', value: '18 hrs' },
      { label: 'Partner plants', value: '340+' },
    ],
    accent: '#FF8C3A',
  },
  {
    id: 'ecommerce',
    label: 'E-commerce',
    headline: 'From warehouse to doorstep. Every order, every time.',
    description: 'High-velocity fulfilment built for online retail. Multi-carrier dispatch, returns management, and real-time tracking consumers can actually use.',
    metrics: [
      { label: 'Orders per month', value: '84,000+' },
      { label: 'On-time SLA', value: '98.4%' },
      { label: 'Distribution hubs', value: '12' },
    ],
    accent: '#BEFF47',
  },
  {
    id: 'hospitality',
    label: 'Hospitality',
    headline: 'Precision delivery for high-expectation venues.',
    description: 'Temperature-controlled, time-sensitive freight for hotels, restaurants and events. Reliable delivery windows that fit your kitchen schedule, not ours.',
    metrics: [
      { label: 'Temp. compliance', value: '100%' },
      { label: 'Venues served', value: '600+' },
      { label: 'Avg. delivery window', value: '±30 min' },
    ],
    accent: '#FF8C3A',
  },
  {
    id: 'healthcare',
    label: 'Healthcare',
    headline: 'When delivery cannot be late.',
    description: 'Pharmaceutical, medical device and clinical supply logistics with full cold chain capability. GDP-compliant handling, chain-of-custody documentation and priority routing.',
    metrics: [
      { label: 'GDP compliance', value: '100%' },
      { label: 'Critical deliveries', value: '99.8% SLA' },
      { label: 'Facilities served', value: '280+' },
    ],
    accent: '#BEFF47',
  },
  {
    id: 'technology',
    label: 'Technology',
    headline: 'High-value freight that can\'t be damaged or delayed.',
    description: 'Specialist handling for sensitive electronics, server equipment and technology hardware. ESD-safe packaging, secure chain-of-custody and expedited options.',
    metrics: [
      { label: 'Damage rate', value: '<0.01%' },
      { label: 'Express coverage', value: 'National' },
      { label: 'Insurance options', value: 'Full cover' },
    ],
    accent: '#FF8C3A',
  },
];
