"use client";

import ScrollFade from "@/components/ScrollFade";
import Skeleton from "@/components/Skeleton";
import type { Nullable } from "@/types/misc";
import type {
  TableBodyProps,
  TableHeaderProps,
  TableProps,
} from "@/types/table";
import { cn } from "@/utils/styles";
import { resolveAlignClass } from "@/utils/table";
import { useVirtualizer, type VirtualItem } from "@tanstack/react-virtual";
import { range } from "lodash-es";
import { RefObject, useRef } from "react";
import { InView } from "react-intersection-observer";
import { useIsomorphicLayoutEffect } from "react-use";

function Table<TData>({
  className,
  tableClassName,
  headerClassName,
  bodyClassName,
  columns: _columns,
  values: _values,
  rowSize = "md",
  isLoading,
  placeholderRowCount = 10,
  onRowsRendered,
  ...props
}: TableProps<TData>) {
  const columns = _columns.filter((column) => !column.hide);

  const scrollAreaRef = useRef<Nullable<HTMLDivElement>>(null);

  const virtualizer = useVirtualizer({
    count: (_values?.length ?? 0) + (isLoading ? placeholderRowCount : 0),
    overscan: 30,
    estimateSize: () => getRowHeight(rowSize),
    getScrollElement: () => scrollAreaRef.current,
  });
  const virtualItems = virtualizer.getVirtualItems();
  const virtualValues = _values ? getVirtualValues(virtualItems, _values) : [];

  useIsomorphicLayoutEffect(() => {
    onRowsRendered?.();
  }, [virtualValues]);

  const totalSize = virtualizer.getTotalSize();
  const paddingTop = virtualItems.length > 0 ? virtualItems[0].start : 0;
  const paddingBottom =
    virtualItems.length > 0
      ? totalSize - virtualItems[virtualItems.length - 1].end
      : 0;

  return (
    <div
      className={cn(
        "relative flex flex-col [--table-head-height:3rem]",
        className,
      )}
    >
      <div
        className="scrollbar-hide flex-1 overflow-auto"
        style={{ height: totalSize === 0 ? "auto" : totalSize }}
        ref={scrollAreaRef}
      >
        <table
          className={cn(
            "min-w-full text-green-100 [&_th]:h-11 [&_th,&_td]:p-3 [&_th,&_td]:first-of-type:pl-5 [&_th,&_td]:last-of-type:pr-5",
            rowSize === "sm" && "[&_td]:h-11",
            rowSize === "md" && "[&_td]:h-17",
            rowSize === "lg" && "[&_td]:h-23",
            tableClassName,
          )}
        >
          <TableHeader
            className={cn("sticky top-0", headerClassName)}
            columns={columns}
          />
          <TableBody
            className={cn("", bodyClassName)}
            columnClassName="pt-2.5 h-5.5"
            columns={columns}
            values={virtualValues}
            virtualPaddingTop={paddingTop}
            virtualPaddingBottom={paddingBottom}
            isLoading={isLoading}
            placeholderRowCount={placeholderRowCount}
            {...props}
          />
        </table>
      </div>

      <ScrollFade
        scrollAreaRef={scrollAreaRef as RefObject<HTMLElement>}
        direction="bottom"
      />
      <ScrollFade
        className="top-(--table-head-height)"
        scrollAreaRef={scrollAreaRef as RefObject<HTMLElement>}
        direction="top"
      />
    </div>
  );

  function getVirtualValues(items: VirtualItem[], values: TData[]) {
    return items.map((item) => values[item.index]).filter(Boolean);
  }

  function getRowHeight(rowSize: TableProps<TData>["rowSize"]) {
    switch (rowSize) {
      case "sm":
        return 44;
      case "md":
        return 50;
      case "lg":
        return 92;
      default:
        return 68;
    }
  }
}

function TableHeader<TData>({
  className,
  columnClassName,
  columns,
}: TableHeaderProps<TData>) {
  return (
    <thead
      className={cn(
        "z-[1] h-(--table-head-height) bg-gray-800 text-base font-semibold",
        className,
      )}
    >
      <tr>
        {columns.map((column, index) => (
          <th
            key={column.key}
            className={cn(
              resolveAlignClass({
                align: column.align,
                isFirstColumn: index === 0,
              }),
              column.headClassName,
              columnClassName,
            )}
          >
            {typeof column.label === "function" ? column.label() : column.label}
          </th>
        ))}
      </tr>
    </thead>
  );
}

function TableBody<TData>({
  className,
  rowClassName,
  columnClassName,
  columns,
  values = [],
  isLoading,
  placeholderRowCount = 10,
  virtualPaddingTop,
  virtualPaddingBottom,
  renderEmpty,
  keyExtractor,
  onClickRow,
  onLastVisible,
}: TableBodyProps<TData>) {
  const isEmpty = values.length === 0 && !isLoading;

  return (
    <tbody className={cn("", className)}>
      {isEmpty && (
        <tr>
          <td className={columnClassName} colSpan={columns.length}>
            {renderEmpty ? (
              renderEmpty()
            ) : (
              <div className="py-8 text-center">No data available...</div>
            )}
          </td>
        </tr>
      )}

      {!isEmpty && (
        <>
          {virtualPaddingTop > 0 && (
            <tr aria-hidden>
              <td
                className="!p-0"
                style={{ height: virtualPaddingTop }}
                colSpan={columns.length}
              />
            </tr>
          )}

          {values.map((value: TData, index: number) => (
            <tr
              className={cn(
                "hover:bg-gray-900",
                typeof rowClassName === "function"
                  ? rowClassName(value)
                  : rowClassName,
              )}
              key={keyExtractor(value, index)}
              onClick={(event) => onClickRow?.(value, event)}
            >
              {columns.map((column, index) => (
                <td
                  className={cn(
                    resolveAlignClass({
                      align: column.align,
                      isFirstColumn: index === 0,
                    }),
                    typeof column.className === "function"
                      ? column.className(value)
                      : column.className,
                    columnClassName,
                  )}
                  key={column.key}
                  onClick={(event) => column.onClick?.(value, event)}
                >
                  {column.render(value)}
                </td>
              ))}
            </tr>
          ))}

          {isLoading &&
            range(placeholderRowCount).map((index) => (
              <tr key={index}>
                {columns.map((column, index) => (
                  <td
                    className={cn(
                      resolveAlignClass({
                        align: column.align,
                        isFirstColumn: index === 0,
                      }),
                      columnClassName,
                    )}
                    key={column.key}
                  >
                    <Skeleton className="inline-block size-full max-w-2/3 min-w-6" />
                  </td>
                ))}
              </tr>
            ))}

          {virtualPaddingBottom > 0 && (
            <tr aria-hidden>
              <td
                className="!p-0"
                style={{ height: virtualPaddingBottom }}
                colSpan={columns.length}
              />
            </tr>
          )}

          <tr aria-hidden>
            <td className="!p-0" colSpan={columns.length}>
              <InView
                threshold={0.1}
                triggerOnce={false}
                onChange={(inView) => {
                  if (inView) {
                    onLastVisible?.();
                  }
                }}
              >
                <div className="h-1" />
              </InView>
            </td>
          </tr>
        </>
      )}
    </tbody>
  );
}

export default Table;
