export function setupActionButtons({

  container,
  createRole,
  createTimeBlock,
  render

}) {

  const addBlock =
    container.querySelector(
      ".add-timeblock"
    );

  const addRole =
    container.querySelector(
      ".add-role"
    );

  if (
    addRole
  ) {

    addRole.onclick =
      () => {

        createRole();

        render();
      };
  }

  if (
    addBlock
  ) {

    addBlock.onclick =
      () => {

        createTimeBlock();

        render();
      };
  }
}