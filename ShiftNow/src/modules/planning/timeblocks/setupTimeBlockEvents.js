export function setupTimeBlockEvents({

  container,
  editTimeBlock,
  deleteTimeBlock,
  duplicateTimeBlock,
  render

}) {

  container
    .querySelectorAll(
      ".timeblock-item"
    )
    .forEach(
      item => {

        item.ondblclick =
          () => {

            editTimeBlock(
              item.dataset.code
            );

            render();
          };

        item.oncontextmenu =
          e => {

            e.preventDefault();

            if (
              confirm(
                `Ta bort ${item.dataset.code}?`
              )
            ) {

              deleteTimeBlock(
                item.dataset.code
              );

              render();
            }
          };

        item.onclick =
          e => {

            if (
              e.ctrlKey
            ) {

              duplicateTimeBlock(
                item.dataset.code
              );

              render();
            }
          };

      }
    );
}