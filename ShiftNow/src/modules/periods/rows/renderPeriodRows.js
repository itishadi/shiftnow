export function renderPeriodRows(
    tbody,
    rows
) {

    tbody.innerHTML = "";

    rows.forEach(row => {

        const tr =
            document.createElement("tr");

        tr.innerHTML = `
            <td>
                <input
                    value="${row.name || ""}">
            </td>

            <td>
                <input
                    value="${row.personnr || ""}">
            </td>

            <td>
                <input
                    type="date"
                    value="${row.from || ""}">
            </td>

            <td>
                <input
                    value="${row.to || ""}">
            </td>

            <td>
                <input
                    value="${row.passTyp || ""}">
            </td>

            <td>
                <input
                    value="${row.days || 0}">
            </td>

            <td>
                <input
                    value="${row.time || ""}">
            </td>

            <td>
                <input
                    value="${row.veckor || ""}">
            </td>

            <td>
                <input
                    value="${row.semesterkoeff || "0"}">
            </td>

            <td>
                <input
                    value="${row.kalenderdagsfaktor || "1,0"}">
            </td>

            <td>
                <input
                    value="${row.dygnsvila || "11:00"}">
            </td>

            <td>
                <input
                    value="${row.veckovila || "36:00"}">
            </td>

            <td>
                <input
                    value="${row.begransningsperiod || "100%"}">
            </td>

            <td>
                <input
                    value="${row.planering || ""}">
            </td>
        `;

        tbody.appendChild(tr);

    });

}