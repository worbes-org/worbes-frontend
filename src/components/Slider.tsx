"use client";

import { Nullable } from "@/types/misc";
import { cn } from "@/utils/styles";
import { clamp, isEqual, throttle } from "lodash-es";
import { FC, useRef, useState } from "react";
import { useIsomorphicLayoutEffect } from "react-use";

const INDEX = { START: 0, END: 1 };
type SliderValue = { start: number; end: number };
type InternalSliderValue = [number, number];

type Props = {
  className?: string;
  thumbClassName?: string;
  min: number;
  max: number;
  step: number;
  value?: SliderValue;
  onChange: (value: SliderValue) => void;
  onCommit?: (value: SliderValue) => void;
};

const Slider: FC<Props> = ({
  className,
  thumbClassName,
  min,
  max,
  step,
  value = { start: min, end: max },
  onChange,
  onCommit,
}) => {
  const sliderDivRef = useRef<Nullable<HTMLDivElement>>(null);
  const draggingIndexRef = useRef<Nullable<number>>(null);
  const valuesRef = useRef<InternalSliderValue>([value.start, value.end]);

  const [visibleTooltip, setVisibleTooltip] = useState<boolean>(false);

  const handleRange = throttle(_handleRange, 100);
  const range = max - min;

  useIsomorphicLayoutEffect(() => {
    document.addEventListener("mousemove", handleMove);
    document.addEventListener("touchmove", handleMove);
    document.addEventListener("mouseup", handleEnd);
    document.addEventListener("touchend", handleEnd);

    return () => {
      document.removeEventListener("mousemove", handleMove);
      document.removeEventListener("touchmove", handleMove);
      document.removeEventListener("mouseup", handleEnd);
      document.removeEventListener("touchend", handleEnd);
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    updateValues(adjustValues([value.start, value.end]));
  }, [value, min, max]);

  return (
    <div className={cn("px-2.5", className)}>
      <div
        className="relative h-1 w-full rounded-lg bg-gray-500 select-none"
        ref={sliderDivRef}
      >
        <div
          className="absolute h-full rounded-sm bg-green-500 transition-all duration-200"
          style={{
            left: `${((value.start - min) / range) * 100}%`,
            width: `${((value.end - value.start) / range) * 100}%`,
          }}
        />

        {valuesRef.current.map((value, index) => (
          <div
            className={cn(
              "absolute top-1/2 size-5 -translate-x-1/2 -translate-y-1/2 transform-gpu cursor-pointer rounded-full bg-green-500 transition-all duration-200",
              thumbClassName,
            )}
            style={{
              left: `${((value - min) / range) * 100}%`,
            }}
            key={index}
            tabIndex={-1}
            onMouseDown={handleStart(index)}
            onTouchStart={handleStart(index)}
          >
            <div
              className={cn(
                "absolute bottom-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2",
                "pointer-events-none rounded-sm bg-gray-500 px-2 py-1 text-sm text-white",
                "transition duration-100",
                visibleTooltip && draggingIndexRef.current === index
                  ? "opacity-100"
                  : "translate-y-1 opacity-0 delay-1000",
              )}
              role="tooltip"
              aria-label={value.toString()}
              aria-hidden={!visibleTooltip}
            >
              {value}
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-x-4 border-t-4 border-x-transparent border-t-gray-500" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  function handleStart(index: number) {
    return () => {
      setVisibleTooltip(true);
      draggingIndexRef.current = index;
    };
  }

  function handleMove(event: Event) {
    if (event instanceof MouseEvent) {
      handleRange({
        x: event.clientX,
        y: event.clientY,
      });
      return;
    }

    if (event instanceof TouchEvent) {
      handleRange({
        x: event.touches[0].clientX,
        y: event.touches[0].clientY,
      });
      return;
    }
  }

  function handleEnd() {
    setVisibleTooltip(false);
    draggingIndexRef.current = null;
    onCommit?.({
      start: valuesRef.current[INDEX.START],
      end: valuesRef.current[INDEX.END],
    });
  }

  function _handleRange(position: { x: number; y: number }) {
    if (!sliderDivRef.current || draggingIndexRef.current === null) {
      return;
    }

    const draggingIndex = draggingIndexRef.current;
    const rect = sliderDivRef.current.getBoundingClientRect();
    const floatValue = ((position.x - rect.left) / rect.width) * range + min;
    const newValue = Math.round(floatValue / step) * step;

    let newValues: InternalSliderValue = [...valuesRef.current];
    newValues[draggingIndex] = newValue;

    updateValues(adjustValues(newValues));
  }

  function adjustValues(values: InternalSliderValue): InternalSliderValue {
    const firstClamped = clamp(values[INDEX.START], min, max);
    const secondClamped = clamp(values[INDEX.END], min, max);
    let newValues: InternalSliderValue = [firstClamped, secondClamped];

    const isUnbalanced = newValues[INDEX.START] > newValues[INDEX.END];
    if (isUnbalanced) {
      newValues = [firstClamped, firstClamped];
    }

    return newValues;
  }

  function updateValues(values: InternalSliderValue) {
    if (isEqual(valuesRef.current, values)) {
      return;
    }

    valuesRef.current = values;
    onChange({ start: values[INDEX.START], end: values[INDEX.END] });
  }
};

export default Slider;
