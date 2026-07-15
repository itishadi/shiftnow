export function getShiftClass(
  shift
) {
  switch (
    shift.type
  ) {
    case "t":
      return "shift-type-t";

    case "u":
      return "shift-type-u";

    case "s":
      return "shift-type-s";

    case "adm":
      return "shift-type-adm";

    default:
      return "shift-type-default";
  }
}