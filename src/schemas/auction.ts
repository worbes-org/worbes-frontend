import z from "zod";

export const AuctionsSchema = z
  .object({
    content: z.array(
      z.object({
        item_id: z.number(),
        item_bonus: z.string().nullable(),
        item_level: z.number(),
        crafting_tier: z.number().nullable(),
        lowest_price: z.number(),
        total_quantity: z.number(),
      }),
    ),
    first: z.boolean(),
    last: z.boolean(),
    pageable: z.object({
      pageNumber: z.number(),
    }),
  })
  .transform((data) => ({
    ...data,
    content: data.content.map((item) => ({
      uuid: crypto.randomUUID(),
      itemId: item.item_id,
      itemBonus: item.item_bonus,
      itemLevel: item.item_level,
      craftingTier: item.crafting_tier,
      lowestPrice: item.lowest_price,
      totalQuantity: item.total_quantity,
    })),
  }));

export const AuctionDetailSchema = z
  .object({
    content: z.object({
      item_id: z.number(),
      item_bonus: z.string().nullable(),
      lowest_price: z.number(),
      total_quantity: z.number(),
      current_auctions: z.record(z.string(), z.number()),
    }),
  })
  .transform((data) => ({
    itemId: data.content.item_id,
    itemBonus: data.content.item_bonus,
    lowestPrice: data.content.lowest_price,
    totalQuantity: data.content.total_quantity,
    currentAuctions: data.content.current_auctions,
  }));

export const AuctionHistorySchema = z
  .object({
    content: z.object({
      average_lowest_price: z.number(),
      median_lowest_price: z.number(),
      history: z.array(
        z.object({
          time: z.string(),
          lowest_price: z.number(),
          total_quantity: z.number(),
        }),
      ),
    }),
  })
  .transform((data) => {
    const sorted = data.content.history.sort(
      (a, b) => new Date(a.time).getTime() - new Date(b.time).getTime(),
    );

    return {
      averageLowestPrice: data.content.average_lowest_price,
      medianLowestPrice: data.content.median_lowest_price,
      data: sorted.map((item) => ({
        time: new Date(item.time),
        lowestPrice: item.lowest_price,
        totalQuantity: item.total_quantity,
      })),
    };
  });
