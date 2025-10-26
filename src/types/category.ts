export type ItemCategory = RootItemCategory | ChildItemCategory;

export type RootItemCategory = {
  name: string;
  class: number;
  detailColumn?: {
    prop: string;
    name: string;
  };
  subClass?: number;
  subClasses?: number[];
  subcategories?: ChildItemCategory[];
};

export type ChildItemCategory = {
  name: string;
  class: number;
  bonusStat?: number;
  extraFilters?: number[];
  invTypes?: number[];
  subClass?: number;
  subClasses?: number[];
  subcategories?: ChildItemCategory[];
};
