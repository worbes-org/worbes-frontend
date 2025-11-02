export function resolveAlignClass(args: {
  align?: "left" | "center" | "right";
  isFirstColumn?: boolean;
}): string {
  switch (args.align) {
    case "left":
      return "text-left";
    case "right":
      return "text-right";
    case "center":
      return "text-center";
    default:
      return args.isFirstColumn ? "text-left" : "text-right";
  }
}
