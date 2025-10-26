export type ItemCategory = ItemRootCategory | ItemChildCategory;

export type ItemRootCategory = {
  name: string;
  class: number;
  detailColumn?: {
    prop: string;
    name: string;
  };
  subClass?: number;
  subClasses?: number[];
  subcategories?: ItemChildCategory[];
};

export type ItemChildCategory = {
  name: string;
  class: number;
  bonusStat?: number;
  extraFilters?: number[];
  invTypes?: number[];
  subClass?: number;
  subClasses?: number[];
  subcategories?: ItemChildCategory[];
};
