export type ItemCategory = {
  name: string;
  class: number;
  detailColumn?: {
    prop: string;
    name: string;
  };
  subClass?: number;
  subClasses?: number[];
  subcategories?: ItemSubCategory[];
};

export type ItemSubCategory = {
  name: string;
  class: number;
  bonusStat?: number;
  extraFilters?: number[];
  invTypes?: number[];
  subClass?: number;
  subClasses?: number[];
  subcategories?: ItemSubCategory[];
};
