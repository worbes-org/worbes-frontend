export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = Optional<Nullable<T>>;

export enum Timeframe {
  ONE_WEEK = "ONE_WEEK",
  TWO_WEEKS = "TWO_WEEKS",
  ONE_MONTH = "ONE_MONTH",
}
