// KA3L shared types

export interface Capability {
  name: string;         // e.g. "storage.search"
  description: string;
  status: 'implemented' | 'planned' | 'concept';
}

export interface Pillar {
  id: string;
  number: string;       // "01", "02" etc.
  title: string;
  tagline: string;
  description: string;
  capabilities?: Capability[];
}

export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}


// dev: revision 021 verified
