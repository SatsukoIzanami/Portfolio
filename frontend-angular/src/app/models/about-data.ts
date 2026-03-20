export interface AboutBio {
  headline?: string;
  subline?: string;
  body?: string;
  avatar?: string;
}

export interface SkillItem {
  label: string;
  value: number;
}

export interface SkillCategory {
  title?: string;
  name?: string;
  items: SkillItem[];
}

export interface Endorsement {
  quote?: string;
  name?: string;
  role?: string;
}

export interface TimelineEntry {
  company?: string;
  role?: string;
  start?: string;
  end?: string;
  bullets?: string[];
}

export interface AboutData {
  bio?: AboutBio;
  skills?: { categories: SkillCategory[] };
  endorsements?: Endorsement[];
  timeline?: TimelineEntry[];
}
