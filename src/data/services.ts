import type { Service } from '../types';

export const services: Service[] = [
  {
    id: 'road-freight',
    title: 'Road Freight',
    description: 'Reliable transport across Australia\'s major freight corridors.',
    detail: 'Full truckload, LTL and groupage solutions connecting Melbourne, Sydney, Brisbane, Adelaide and Perth. Real-time GPS tracking on every run.',
    icon: 'truck',
    tag: 'NATIONWIDE',
  },
  {
    id: 'express-freight',
    title: 'Express Freight',
    description: 'Time-critical delivery when every hour counts.',
    detail: 'Next-day metro and 48-hour interstate express for urgent consignments. Priority handling, dedicated vehicles and proactive notification.',
    icon: 'lightning',
    tag: 'PRIORITY',
  },
  {
    id: '3pl-warehousing',
    title: '3PL & Warehousing',
    description: 'Flexible warehousing and fulfilment across five major metro hubs.',
    detail: 'Pick, pack, store and dispatch. Seamlessly integrated with your inventory system. Scalable capacity for seasonal peaks and long-term growth.',
    icon: 'warehouse',
    tag: 'INTEGRATED',
  },
  {
    id: 'interstate-distribution',
    title: 'Interstate Distribution',
    description: 'End-to-end distribution networks built for scale.',
    detail: 'Scheduled linehaul services with cross-dock capability. Designed for retail chains, FMCG brands and manufacturers needing consistent velocity.',
    icon: 'network',
    tag: 'SCALABLE',
  },
  {
    id: 'bulk-heavy',
    title: 'Bulk & Heavy Freight',
    description: 'Specialist capability for oversized and project cargo.',
    detail: 'Low-loaders, flat-decks and heavy haulage with permit management. Mining, construction and manufacturing projects across Australia.',
    icon: 'heavy',
    tag: 'SPECIALIST',
  },
  {
    id: 'custom-logistics',
    title: 'Custom Logistics',
    description: 'Bespoke supply chain solutions engineered for your operation.',
    detail: 'Dedicated account management, custom reporting, SLA agreements and integrated technology. For businesses that need a true logistics partner.',
    icon: 'custom',
    tag: 'TAILORED',
  },
];
