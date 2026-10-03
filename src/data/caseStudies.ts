import type { CaseStudy } from '../types';

export const caseStudies: CaseStudy[] = [
  {
    id: 'ecommerce-scale',
    sector: 'E-COMMERCE',
    headline: 'Scaling fulfilment without scaling complexity.',
    description: 'A fast-growing online homewares brand needed to triple fulfilment capacity in 90 days without hiring a logistics team. NEXORA built a custom 3PL solution with same-day dispatch and live customer tracking.',
    result: 'Tripled throughput. Zero additional headcount. Customer NPS increased by 22 points.',
    metrics: [
      { label: 'Orders handled', value: '120,000+' },
      { label: 'Dispatch accuracy', value: '99.6%' },
      { label: 'Scale-up time', value: '90 days' },
    ],
    color: '#BEFF47',
  },
  {
    id: 'manufacturing-connect',
    sector: 'MANUFACTURING',
    headline: 'Connecting suppliers, warehouses and delivery.',
    description: 'A mid-size manufacturer had three unconnected freight providers, no visibility and recurring line stoppages. NEXORA consolidated operations into a single managed solution with live ETA feeds into their ERP.',
    result: 'Line stoppages eliminated. Freight cost reduced 18%. Full visibility from supplier to customer.',
    metrics: [
      { label: 'Cost reduction', value: '18%' },
      { label: 'Suppliers onboarded', value: '47' },
      { label: 'Line stoppages', value: '0' },
    ],
    color: '#FF8C3A',
  },
  {
    id: 'retail-connected',
    sector: 'RETAIL',
    headline: 'Turning fragmented freight into one connected operation.',
    description: 'A national retail chain with 80 stores was managing freight through four brokers with no consolidated view. NEXORA became the single freight partner across inbound, inter-store and returns.',
    result: 'One partner. One view. 97.2% on-time delivery across 80 locations.',
    metrics: [
      { label: 'Store network', value: '80 stores' },
      { label: 'On-time', value: '97.2%' },
      { label: 'Cost saving', value: '$820K/yr' },
    ],
    color: '#BEFF47',
  },
];
