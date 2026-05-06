export type Project = {
  img?: string;
  name?: string;
  year?: string;
  desc?: string;
};

export type SkillItem = {
  label: string;
  value: number;
};

export type SkillCategory = {
  title?: string;
  name?: string;
  items: SkillItem[];
};

export type AboutData = {
  bio?: { headline?: string; subline?: string; body?: string; avatar?: string };
  skills?: { categories: SkillCategory[] };
  endorsements?: { quote?: string; name?: string; role?: string }[];
  timeline?: { company?: string; role?: string; start?: string; end?: string; bullets?: string[] }[];
};
