import { getEmployees }
    from "../../employees/services/employeeService.js";

export function showImportModal({
    rows,
    container,
    render,
    createEmployeeRow
}) {

    const employees =
        getEmployees();

    if (
        employees.length === 0
    ) {

        alert(
            "Ingen personal finns."
        );

        return;
    }

    const overlay =
        document.createElement(
            "div"
        );

    overlay.style.cssText = `
        position:fixed;
        inset:0;
        background:rgba(0,0,0,.4);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
    `;

    const modal =
        document.createElement(
            "div"
        );

    modal.style.cssText = `
        background:white;
        padding:20px;
        border-radius:8px;
        max-width:500px;
        width:90%;
        max-height:80vh;
        overflow:auto;
    `;

    modal.innerHTML = `

        <h3>
            Importera personal
        </h3>

        <div id="staffList"></div>

        <div
            style="
                margin-top:15px;
                display:flex;
                gap:10px;
            "
        >

            <button id="importBtn">
                Importera
            </button>

            <button id="cancelBtn">
                Avbryt
            </button>

        </div>

    `;

    const list =
        modal.querySelector(
            "#staffList"
        );

    employees.forEach(
        (employee, index) => {

            const name =
                employee.name
                ||
                employee.aviseringsnamn
                ||
                `${employee.fornamn || ""}
                 ${employee.efternamn || ""}`
                    .trim();

            const row =
                document.createElement(
                    "label"
                );

            row.style.display =
                "block";

            row.innerHTML = `

                <input
                    type="checkbox"
                    data-index="${index}"
                    checked>

                ${name}

            `;

            list.appendChild(
                row
            );

        }
    );

    modal
        .querySelector(
            "#cancelBtn"
        )
        .onclick = () => {

            document.body.removeChild(
                overlay
            );

        };

    modal
        .querySelector(
            "#importBtn"
        )
        .onclick = () => {

            const selected = [];

            modal
                .querySelectorAll(
                    "input[type='checkbox']:checked"
                )
                .forEach(cb => {

                    selected.push(
                        employees[
                            Number(
                                cb.dataset.index
                            )
                        ]
                    );

                });

            selected.forEach(
                employee => {

                    const name =
                        employee.name
                        ||
                        employee.aviseringsnamn
                        ||
                        `${employee.fornamn || ""}
                         ${employee.efternamn || ""}`
                            .trim();

                    if (
                        rows.some(
                            r => r.name === name
                        )
                    ) {
                        return;
                    }

                    const row =
                        createEmployeeRow(
                            name
                        );

                    row.status =
                        "Planeras";

                    row.from =
                        container
                            .querySelector(
                                "#from"
                            )
                            .value;

                    row.to =
                        container
                            .querySelector(
                                "#toDate"
                            )
                            .value
                        ||
                        "Öppet";

                    rows.push(
                        row
                    );

                }
            );

            render();

            document.body.removeChild(
                overlay
            );

        };

    overlay.appendChild(
        modal
    );

    document.body.appendChild(
        overlay
    );

}