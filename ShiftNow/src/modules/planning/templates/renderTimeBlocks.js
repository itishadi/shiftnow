export function renderTimeBlocks(
  getAllTimeBlocks
) {
  return `
    <div class="timeblocks-panel">

      <div
        class="timeblock-item add-timeblock">

        + Nytt tidblock

      </div>

      ${getAllTimeBlocks()
        .map(
          block => `
            <div
              class="timeblock-item ${block.color || ""}"
              data-code="${block.code}"
              draggable="true">

              <strong>
                ${block.code}
              </strong>

              -

              ${block.title}

              <br>

              ${block.start}
              -
              ${block.end}

            </div>
          `
        )
        .join("")}

    </div>
  `;
}