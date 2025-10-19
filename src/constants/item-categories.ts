export type ItemCategory = {
  id: number;
  label: string;
  parentId?: number;
  children?: ItemCategory[];
};

export const ITEM_CATEGORIES: ItemCategory[] = [
  {
    id: 1,
    label: "Weapons",
    children: [
      {
        id: 2,
        parentId: 1,
        label: "Swords",
        children: [
          {
            id: 3,
            parentId: 2,
            label: "Long Swords",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: "Armor",
    children: [
      {
        id: 4,
        parentId: 2,
        label: "Plate",
      },
    ],
  },
];
