import type { Optional } from "@/types/misc";
import type { MouseEvent, ReactNode } from "react";

export type TableColumn<TValue> = {
  key: string;
  label: string | (() => ReactNode);
  className?: string | ((value: TValue) => string);
  headClassName?: string;
  align?: "left" | "center" | "right";
  hide?: boolean;
  render: (value: TValue) => ReactNode;
  onClick?: (value: TValue, event: MouseEvent) => void;
};

export type TableProps<TValue> = {
  className?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string | ((value: TValue) => string);
  values: Optional<TValue[]>;
  columns: TableColumn<TValue>[];
  isLoading?: boolean;
  placeholderRowCount?: number;
  keyExtractor: (value: TValue, index: number) => string | number;
  renderEmpty?: () => ReactNode;
  onClickRow?: (value: TValue, event: MouseEvent) => void;
  onLastVisible?: () => void;
  onRowsRendered?: () => void;
};

export type TableHeaderProps<TValue> = {
  columnClassName?: string;
} & Pick<TableProps<TValue>, "className" | "columns">;

export type TableBodyProps<TValue> = {
  columnClassName?: string;
  virtualPaddingTop: number;
  virtualPaddingBottom: number;
} & Pick<
  TableProps<TValue>,
  | "className"
  | "rowClassName"
  | "columns"
  | "values"
  | "isLoading"
  | "placeholderRowCount"
  | "renderEmpty"
  | "keyExtractor"
  | "onClickRow"
  | "onLastVisible"
>;
