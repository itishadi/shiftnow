export function renderShiftRoles(
  getAllRoles
) {
  return `
    <div class="timeblocks-panel">

      <div class="timeblock-item add-role">

        + Nytt färgblock

      </div>

      ${getAllRoles()
        .map(
          role => `
            <div
              class="timeblock-item ${role.color}">

              <strong>
                ${role.code.toUpperCase()}
              </strong>

              -

              ${role.title}

            </div>
          `
        )
        .join("")}

    </div>
  `;
}