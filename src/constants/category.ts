import type { ItemRootCategory } from "@/types/category";

export const ITEM_CATEGORIES: ItemRootCategory[] = [
  {
    name: "무기",
    detailColumn: {
      prop: "itemLevel",
      name: "레벨",
    },
    class: 2,
    subcategories: [
      {
        name: "한손 장비",
        class: 2,
        subClasses: [0, 4, 7, 9, 15, 13, 19],
        subcategories: [
          {
            name: "한손 도끼류",
            class: 2,
            subClass: 0,
          },
          {
            name: "한손 둔기류",
            class: 2,
            subClass: 4,
          },
          {
            name: "한손 도검류",
            class: 2,
            subClass: 7,
          },
          {
            name: "전투검",
            class: 2,
            subClass: 9,
          },
          {
            name: "단검류",
            class: 2,
            subClass: 15,
          },
          {
            name: "장착 무기류",
            class: 2,
            subClass: 13,
          },
          {
            name: "마법봉류",
            class: 2,
            subClass: 19,
          },
          {
            name: "이동 속도",
            class: 2,
            subClasses: [0, 4, 7, 9, 15, 13, 19],
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 2,
            subClasses: [0, 4, 7, 9, 15, 13, 19],
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 2,
            subClasses: [0, 4, 7, 9, 15, 13, 19],
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 2,
            subClasses: [0, 4, 7, 9, 15, 13, 19],
            bonusStat: 64,
          },
        ],
      },
      {
        name: "양손 장비",
        class: 2,
        subClasses: [1, 5, 8, 6, 10],
        subcategories: [
          {
            name: "양손 도끼류",
            class: 2,
            subClass: 1,
          },
          {
            name: "양손 둔기류",
            class: 2,
            subClass: 5,
          },
          {
            name: "양손 도검류",
            class: 2,
            subClass: 8,
          },
          {
            name: "장창류",
            class: 2,
            subClass: 6,
          },
          {
            name: "지팡이류",
            class: 2,
            subClass: 10,
          },
          {
            name: "이동 속도",
            class: 2,
            subClasses: [1, 5, 8, 6, 10],
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 2,
            subClasses: [1, 5, 8, 6, 10],
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 2,
            subClasses: [1, 5, 8, 6, 10],
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 2,
            subClasses: [1, 5, 8, 6, 10],
            bonusStat: 64,
          },
        ],
      },
      {
        name: "원거리 장비",
        class: 2,
        subClasses: [2, 18, 3, 16],
        subcategories: [
          {
            name: "활류",
            class: 2,
            subClass: 2,
          },
          {
            name: "석궁류",
            class: 2,
            subClass: 18,
          },
          {
            name: "총기류",
            class: 2,
            subClass: 3,
          },
          {
            name: "투척 무기류",
            class: 2,
            subClass: 16,
          },
          {
            name: "이동 속도",
            class: 2,
            subClasses: [2, 18, 3, 16],
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 2,
            subClasses: [2, 18, 3, 16],
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 2,
            subClasses: [2, 18, 3, 16],
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 2,
            subClasses: [2, 18, 3, 16],
            bonusStat: 64,
          },
        ],
      },
      {
        name: "기타",
        class: 2,
        subClasses: [20, 14],
        subcategories: [
          {
            name: "낚싯대",
            class: 2,
            subClass: 20,
          },
          {
            name: "기타",
            class: 2,
            subClass: 14,
          },
        ],
      },
    ],
  },
  {
    name: "방어구",
    detailColumn: {
      prop: "itemLevel",
      name: "레벨",
    },
    class: 4,
    subcategories: [
      {
        name: "판금",
        class: 4,
        subClass: 4,
        subcategories: [
          {
            name: "룬조각술",
            class: 4,
            subClass: 4,
            extraFilters: [11],
          },
          {
            name: "머리",
            class: 4,
            subClass: 4,
            invTypes: [1],
          },
          {
            name: "어깨",
            class: 4,
            subClass: 4,
            invTypes: [3],
          },
          {
            name: "가슴",
            class: 4,
            subClass: 4,
            invTypes: [5, 20],
          },
          {
            name: "허리",
            class: 4,
            subClass: 4,
            invTypes: [6],
          },
          {
            name: "다리",
            class: 4,
            subClass: 4,
            invTypes: [7],
          },
          {
            name: "발",
            class: 4,
            subClass: 4,
            invTypes: [8],
          },
          {
            name: "손목",
            class: 4,
            subClass: 4,
            invTypes: [9],
          },
          {
            name: "손",
            class: 4,
            subClass: 4,
            invTypes: [10],
          },
          {
            name: "이동 속도",
            class: 4,
            subClass: 4,
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 4,
            subClass: 4,
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 4,
            subClass: 4,
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 4,
            subClass: 4,
            bonusStat: 64,
          },
        ],
      },
      {
        name: "사슬",
        class: 4,
        subClass: 3,
        subcategories: [
          {
            name: "룬조각술",
            class: 4,
            subClass: 3,
            extraFilters: [11],
          },
          {
            name: "머리",
            class: 4,
            subClass: 3,
            invTypes: [1],
          },
          {
            name: "어깨",
            class: 4,
            subClass: 3,
            invTypes: [3],
          },
          {
            name: "가슴",
            class: 4,
            subClass: 3,
            invTypes: [5, 20],
          },
          {
            name: "허리",
            class: 4,
            subClass: 3,
            invTypes: [6],
          },
          {
            name: "다리",
            class: 4,
            subClass: 3,
            invTypes: [7],
          },
          {
            name: "발",
            class: 4,
            subClass: 3,
            invTypes: [8],
          },
          {
            name: "손목",
            class: 4,
            subClass: 3,
            invTypes: [9],
          },
          {
            name: "손",
            class: 4,
            subClass: 3,
            invTypes: [10],
          },
          {
            name: "이동 속도",
            class: 4,
            subClass: 3,
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 4,
            subClass: 3,
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 4,
            subClass: 3,
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 4,
            subClass: 3,
            bonusStat: 64,
          },
        ],
      },
      {
        name: "가죽",
        class: 4,
        subClass: 2,
        subcategories: [
          {
            name: "룬조각술",
            class: 4,
            subClass: 2,
            extraFilters: [11],
          },
          {
            name: "머리",
            class: 4,
            subClass: 2,
            invTypes: [1],
          },
          {
            name: "어깨",
            class: 4,
            subClass: 2,
            invTypes: [3],
          },
          {
            name: "가슴",
            class: 4,
            subClass: 2,
            invTypes: [5, 20],
          },
          {
            name: "허리",
            class: 4,
            subClass: 2,
            invTypes: [6],
          },
          {
            name: "다리",
            class: 4,
            subClass: 2,
            invTypes: [7],
          },
          {
            name: "발",
            class: 4,
            subClass: 2,
            invTypes: [8],
          },
          {
            name: "손목",
            class: 4,
            subClass: 2,
            invTypes: [9],
          },
          {
            name: "손",
            class: 4,
            subClass: 2,
            invTypes: [10],
          },
          {
            name: "이동 속도",
            class: 4,
            subClass: 2,
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 4,
            subClass: 2,
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 4,
            subClass: 2,
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 4,
            subClass: 2,
            bonusStat: 64,
          },
        ],
      },
      {
        name: "천",
        class: 4,
        subClass: 1,
        subcategories: [
          {
            name: "룬조각술",
            class: 4,
            subClass: 1,
            extraFilters: [11],
          },
          {
            name: "머리",
            class: 4,
            subClass: 1,
            invTypes: [1],
          },
          {
            name: "어깨",
            class: 4,
            subClass: 1,
            invTypes: [3],
          },
          {
            name: "가슴",
            class: 4,
            subClass: 1,
            invTypes: [5, 20],
          },
          {
            name: "허리",
            class: 4,
            subClass: 1,
            invTypes: [6],
          },
          {
            name: "다리",
            class: 4,
            subClass: 1,
            invTypes: [7],
          },
          {
            name: "발",
            class: 4,
            subClass: 1,
            invTypes: [8],
          },
          {
            name: "손목",
            class: 4,
            subClass: 1,
            invTypes: [9],
          },
          {
            name: "손",
            class: 4,
            subClass: 1,
            invTypes: [10],
          },
          {
            name: "이동 속도",
            class: 4,
            subClass: 1,
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 4,
            subClass: 1,
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 4,
            subClass: 1,
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 4,
            subClass: 1,
            bonusStat: 64,
          },
        ],
      },
      {
        name: "기타",
        class: 4,
        subClass: 0,
        subcategories: [
          {
            name: "룬조각술",
            class: 4,
            subClass: 0,
            extraFilters: [11],
          },
          {
            name: "목",
            class: 4,
            subClass: 0,
            invTypes: [2],
          },
          {
            name: "망토",
            class: 4,
            subClass: 1,
            invTypes: [16],
          },
          {
            name: "손가락",
            class: 4,
            subClass: 0,
            invTypes: [11],
          },
          {
            name: "장신구",
            class: 4,
            subClass: 0,
            invTypes: [12],
          },
          {
            name: "보조장비",
            class: 4,
            subClass: 0,
            invTypes: [23],
          },
          {
            name: "방패",
            class: 4,
            subClass: 6,
          },
          {
            name: "속옷",
            class: 4,
            subClass: 0,
            invTypes: [4],
          },
          {
            name: "머리",
            class: 4,
            subClass: 0,
            invTypes: [1],
          },
          {
            name: "이동 속도",
            class: 4,
            subClasses: [0, 6],
            bonusStat: 61,
          },
          {
            name: "생기흡수",
            class: 4,
            subClasses: [0, 6],
            bonusStat: 62,
          },
          {
            name: "광역회피",
            class: 4,
            subClasses: [0, 6],
            bonusStat: 63,
          },
          {
            name: "파괴 불가",
            class: 4,
            subClasses: [0, 6],
            bonusStat: 64,
          },
        ],
      },
      {
        name: "장식",
        class: 4,
        subClass: 5,
      },
    ],
  },
  {
    name: "가방류",
    detailColumn: {
      prop: "slots",
      name: "칸",
    },
    class: 1,
    subcategories: [
      {
        name: "가방",
        class: 1,
        subClass: 0,
      },
      {
        name: "약초 가방",
        class: 1,
        subClass: 2,
      },
      {
        name: "마법부여 가방",
        class: 1,
        subClass: 3,
      },
      {
        name: "기계공학 가방",
        class: 1,
        subClass: 4,
      },
      {
        name: "보석 가방",
        class: 1,
        subClass: 5,
      },
      {
        name: "채광 자루",
        class: 1,
        subClass: 6,
      },
      {
        name: "가죽세공 가방",
        class: 1,
        subClass: 7,
      },
      {
        name: "주문각인 가방",
        class: 1,
        subClass: 8,
      },
      {
        name: "낚시상자",
        class: 1,
        subClass: 9,
      },
      {
        name: "요리 가방",
        class: 1,
        subClass: 10,
      },
      {
        name: "재료 가방",
        class: 1,
        subClass: 11,
      },
    ],
  },
  {
    name: "보석",
    detailColumn: {
      prop: "itemLevel",
      name: "레벨",
    },
    class: 3,
    subcategories: [
      {
        name: "유물 성물",
        class: 3,
        subClass: 11,
      },
      {
        name: "지능",
        class: 3,
        subClass: 0,
      },
      {
        name: "민첩성",
        class: 3,
        subClass: 1,
      },
      {
        name: "힘",
        class: 3,
        subClass: 2,
      },
      {
        name: "체력",
        class: 3,
        subClass: 3,
      },
      {
        name: "치명타 및 극대화",
        class: 3,
        subClass: 5,
      },
      {
        name: "특화",
        class: 3,
        subClass: 6,
      },
      {
        name: "가속",
        class: 3,
        subClass: 7,
      },
      {
        name: "유연성",
        class: 3,
        subClass: 8,
      },
      {
        name: "기타",
        class: 3,
        subClass: 9,
      },
      {
        name: "다수의 능력치",
        class: 3,
        subClass: 10,
      },
    ],
  },
  {
    name: "아이템 강화",
    detailColumn: {
      prop: "itemLevel",
      name: "레벨",
    },
    class: 8,
    subcategories: [
      {
        name: "머리",
        class: 8,
        subClass: 0,
      },
      {
        name: "목",
        class: 8,
        subClass: 1,
      },
      {
        name: "어깨",
        class: 8,
        subClass: 2,
      },
      {
        name: "망토",
        class: 8,
        subClass: 3,
      },
      {
        name: "가슴",
        class: 8,
        subClass: 4,
      },
      {
        name: "손목",
        class: 8,
        subClass: 5,
      },
      {
        name: "손",
        class: 8,
        subClass: 6,
      },
      {
        name: "허리",
        class: 8,
        subClass: 7,
      },
      {
        name: "다리",
        class: 8,
        subClass: 8,
      },
      {
        name: "발",
        class: 8,
        subClass: 9,
      },
      {
        name: "손가락",
        class: 8,
        subClass: 10,
      },
      {
        name: "무기",
        class: 8,
        subClass: 11,
      },
      {
        name: "양손 무기",
        class: 8,
        subClass: 12,
      },
      {
        name: "방패/보조무기",
        class: 8,
        subClass: 13,
      },
      {
        name: "기타",
        class: 8,
        subClass: 14,
      },
    ],
  },
  {
    name: "소비용품",
    detailColumn: {
      prop: "reqLevel",
      name: "레벨",
    },
    class: 0,
    subcategories: [
      {
        name: "폭발물 및 장치",
        class: 0,
        subClass: 0,
      },
      {
        name: "물약",
        class: 0,
        subClass: 1,
      },
      {
        name: "비약",
        class: 0,
        subClass: 2,
      },
      {
        name: "영약 및 약병",
        class: 0,
        subClass: 3,
      },
      {
        name: "음식과 음료",
        class: 0,
        subClass: 5,
      },
      {
        name: "붕대",
        class: 0,
        subClass: 7,
      },
      {
        name: "반투스 룬",
        class: 0,
        subClass: 9,
      },
      {
        name: "기타",
        class: 0,
        subClass: 8,
      },
    ],
  },
  {
    name: "문양",
    class: 16,
    subcategories: [
      {
        name: "전사",
        class: 16,
        subClass: 1,
      },
      {
        name: "성기사",
        class: 16,
        subClass: 2,
      },
      {
        name: "사냥꾼",
        class: 16,
        subClass: 3,
      },
      {
        name: "도적",
        class: 16,
        subClass: 4,
      },
      {
        name: "사제",
        class: 16,
        subClass: 5,
      },
      {
        name: "주술사",
        class: 16,
        subClass: 7,
      },
      {
        name: "마법사",
        class: 16,
        subClass: 8,
      },
      {
        name: "흑마법사",
        class: 16,
        subClass: 9,
      },
      {
        name: "드루이드",
        class: 16,
        subClass: 11,
      },
      {
        name: "죽음의 기사",
        class: 16,
        subClass: 6,
      },
      {
        name: "수도사",
        class: 16,
        subClass: 10,
      },
      {
        name: "악마사냥꾼",
        class: 16,
        subClass: 12,
      },
    ],
  },
  {
    name: "재료",
    class: 7,
    subcategories: [
      {
        name: "천",
        class: 7,
        subClass: 5,
      },
      {
        name: "가죽",
        class: 7,
        subClass: 6,
      },
      {
        name: "광물",
        class: 7,
        subClass: 7,
      },
      {
        name: "요리",
        class: 7,
        subClass: 8,
      },
      {
        name: "약초",
        class: 7,
        subClass: 9,
      },
      {
        name: "마법부여",
        class: 7,
        subClass: 12,
      },
      {
        name: "주문각인",
        class: 7,
        subClass: 16,
      },
      {
        name: "보석세공",
        class: 7,
        subClass: 4,
      },
      {
        name: "부품",
        class: 7,
        subClass: 1,
      },
      {
        name: "원소",
        class: 7,
        subClass: 10,
      },
      {
        name: "선택 재료",
        class: 7,
        subClass: 18,
      },
      {
        name: "마무리 재료",
        class: 7,
        subClass: 19,
      },
      {
        name: "기타",
        class: 7,
        subClass: 11,
      },
    ],
  },
  {
    name: "제조법",
    detailColumn: {
      prop: "skill",
      name: "숙련도",
    },
    class: 9,
    subcategories: [
      {
        name: "가죽세공",
        class: 9,
        subClass: 1,
      },
      {
        name: "재봉술",
        class: 9,
        subClass: 2,
      },
      {
        name: "기계공학",
        class: 9,
        subClass: 3,
      },
      {
        name: "대장기술",
        class: 9,
        subClass: 4,
      },
      {
        name: "연금술",
        class: 9,
        subClass: 6,
      },
      {
        name: "마법부여",
        class: 9,
        subClass: 8,
      },
      {
        name: "보석세공",
        class: 9,
        subClass: 10,
      },
      {
        name: "주문각인",
        class: 9,
        subClass: 11,
      },
      {
        name: "요리",
        class: 9,
        subClass: 5,
      },
      {
        name: "응급치료",
        class: 9,
        subClass: 7,
      },
      {
        name: "낚시",
        class: 9,
        subClass: 9,
      },
      {
        name: "책",
        class: 9,
        subClass: 0,
      },
    ],
  },
  {
    name: "전문 기술 장비",
    detailColumn: {
      prop: "itemLevel",
      name: "레벨",
    },
    class: 19,
    subcategories: [
      {
        name: "주문각인",
        class: 19,
        subClass: 12,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 12,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 12,
            invTypes: [30],
          },
        ],
      },
      {
        name: "재봉술",
        class: 19,
        subClass: 6,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 6,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 6,
            invTypes: [30],
          },
        ],
      },
      {
        name: "가죽세공",
        class: 19,
        subClass: 1,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 1,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 1,
            invTypes: [30],
          },
        ],
      },
      {
        name: "보석세공",
        class: 19,
        subClass: 11,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 11,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 11,
            invTypes: [30],
          },
        ],
      },
      {
        name: "연금술",
        class: 19,
        subClass: 2,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 2,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 2,
            invTypes: [30],
          },
        ],
      },
      {
        name: "대장기술",
        class: 19,
        subClass: 0,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 0,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 0,
            invTypes: [30],
          },
        ],
      },
      {
        name: "기계공학",
        class: 19,
        subClass: 7,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 7,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 7,
            invTypes: [30],
          },
        ],
      },
      {
        name: "마법부여",
        class: 19,
        subClass: 8,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 8,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 8,
            invTypes: [30],
          },
        ],
      },
      {
        name: "채광",
        class: 19,
        subClass: 5,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 5,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 5,
            invTypes: [30],
          },
        ],
      },
      {
        name: "약초채집",
        class: 19,
        subClass: 3,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 3,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 3,
            invTypes: [30],
          },
        ],
      },
      {
        name: "무두질",
        class: 19,
        subClass: 10,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 10,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 10,
            invTypes: [30],
          },
        ],
      },
      {
        name: "요리",
        class: 19,
        subClass: 4,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 4,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 4,
            invTypes: [30],
          },
        ],
      },
      {
        name: "낚시",
        class: 19,
        subClass: 9,
        subcategories: [
          {
            name: "도구",
            class: 19,
            subClass: 9,
            invTypes: [29],
          },
          {
            name: "장신구",
            class: 19,
            subClass: 9,
            invTypes: [30],
          },
        ],
      },
    ],
  },
  {
    name: "전투 애완동물",
    class: 17,
    subcategories: [
      {
        name: "인간형",
        class: 17,
        subClass: 1,
      },
      {
        name: "용족",
        class: 17,
        subClass: 2,
      },
      {
        name: "비행",
        class: 17,
        subClass: 3,
      },
      {
        name: "언데드",
        class: 17,
        subClass: 4,
      },
      {
        name: "동물",
        class: 17,
        subClass: 5,
      },
      {
        name: "마법",
        class: 17,
        subClass: 6,
      },
      {
        name: "정령",
        class: 17,
        subClass: 7,
      },
      {
        name: "야수",
        class: 17,
        subClass: 8,
      },
      {
        name: "물",
        class: 17,
        subClass: 9,
      },
      {
        name: "기계",
        class: 17,
        subClass: 10,
      },
      {
        name: "애완동물 친구",
        class: 17,
        subClass: 0,
      },
    ],
  },
  {
    name: "퀘스트 아이템",
    class: 12,
  },
  {
    name: "기타",
    class: 15,
    subcategories: [
      {
        name: "잡동사니",
        class: 15,
        subClass: 0,
      },
      {
        name: "재료",
        class: 15,
        subClass: 1,
      },
      {
        name: "축제용품",
        class: 15,
        subClass: 3,
      },
      {
        name: "기타",
        class: 15,
        subClass: 4,
      },
      {
        name: "탈것",
        class: 15,
        subClass: 5,
      },
      {
        name: "탈것 장비",
        class: 15,
        subClass: 6,
      },
    ],
  },
  {
    name: "WoW 토큰",
    class: 18,
  },
] as const;
