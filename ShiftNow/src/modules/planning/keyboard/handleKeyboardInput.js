export function handleKeyboardInput({
  event,
  activeCell,
  cellInput,
  container,
  period,
  render,
  createShift,
  timeBlocks,
  getRole,
  shiftOutsidePeriod
}) {

  if (!activeCell) {
    return {
      activeCell,
      cellInput
    };
  }

  if (
    event.key === "ArrowRight" ||
    event.key === "ArrowLeft" ||
    event.key === "ArrowUp" ||
    event.key === "ArrowDown"
  ) {

    event.preventDefault();

    const cells =
      Array.from(
        container.querySelectorAll(
          ".day-slot"
        )
      );

    const currentIndex =
      cells.findIndex(
        cell =>
          `${cell.dataset.person}-${cell.dataset.date}` ===
          activeCell
      );

    if (currentIndex === -1) {
      return {
        activeCell,
        cellInput
      };
    }

    let nextIndex =
      currentIndex;

    if (event.key === "ArrowRight") {
      nextIndex++;
    }

    if (event.key === "ArrowLeft") {
      nextIndex--;
    }

    if (event.key === "ArrowDown") {
      nextIndex += 7;
    }

    if (event.key === "ArrowUp") {
      nextIndex -= 7;
    }

    if (
      nextIndex >= 0 &&
      nextIndex < cells.length
    ) {

      const nextCell =
        cells[nextIndex];

      activeCell =
        `${nextCell.dataset.person}-${nextCell.dataset.date}`;

      render();
    }

    return {
      activeCell,
      cellInput
    };
  }

  if (event.key === "Enter") {

    const parts =
      activeCell.split("-");

    const personIndex =
      parts[0];

    const date =
      parts.slice(1).join("-");

    const person =
      period.rows[
        Number(personIndex)
      ];

    createShift(
      cellInput,
      date,
      person,
      period,
      timeBlocks,
      getRole,
      shiftOutsidePeriod
    );

    cellInput = "";

    render();

    return {
      activeCell,
      cellInput
    };
  }

  if (
    event.key === "Backspace"
  ) {

    cellInput =
      cellInput.slice(
        0,
        -1
      );

    render();

    return {
      activeCell,
      cellInput
    };
  }

  if (
    event.key.length === 1
  ) {

    cellInput +=
      event.key;

    render();
  }

  return {
    activeCell,
    cellInput
  };
}