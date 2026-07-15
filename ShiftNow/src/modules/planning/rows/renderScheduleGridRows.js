  
export function renderScheduleGridRows({
    tbody,
    rows,
    period,
    parseHeromaShift
}) {

  
  rows.forEach(
      (row, index) => {

        const tr =
          document.createElement("tr");

        tr.innerHTML = `

          <td>

            <input
              value="${row.name || ""}"
              data-i="${index}"
              data-f="name">

          </td>

          <td>

            <input
              value="${row.personnr || ""}"
              data-i="${index}"
              data-f="personnr">

          </td>

          <td>

            <input
              type="date"
              value="${row.from || ""}"
              data-i="${index}"
              data-f="from">

          </td>

          <td>

            <input
              value="${row.to || ""}"
              data-i="${index}"
              data-f="to">

          </td>

          <td>

            <input
              value="${row.passTyp || ""}"
              data-i="${index}"
              data-f="passTyp">

          </td>

          <td>

              ${row.status || "Planeras"}

          </td>

          <td>

            <input
              value="${row.time || ""}"
              data-i="${index}"
              data-f="time">

          </td>

          <td>

  <input
    value="${row.veckor || ""}"
    data-i="${index}"
    data-f="veckor">

</td>

<td>

  <input
    value="${row.semesterkoeff || "0,00"}"
    data-i="${index}"
    data-f="semesterkoeff">

</td>

<td>

  <input
    value="${row.kalenderdagsfaktor || "1,0"}"
    data-i="${index}"
    data-f="kalenderdagsfaktor">

</td>

<td>

  <input
    value="${row.dygnsvila || "11:00"}"
    data-i="${index}"
    data-f="dygnsvila">

</td>

<td>

  <input
    value="${row.veckovila || "36:00"}"
    data-i="${index}"
    data-f="veckovila">

</td>

<td>

  <input
    value="${row.begransningsperiod || "100%"}"
    data-i="${index}"
    data-f="begransningsperiod">

</td>

<td>

  <input
    value="${row.planering || ""}"
    data-i="${index}"
    data-f="planering">

</td>

          <td>

            <input
              placeholder="645 1515 30"
              data-shift="${index}">

          </td>

        `;

        tbody.appendChild(tr);

      }
    );
    
        tbody
          .querySelectorAll("input[data-i]")
          .forEach(input => {
    
            input.oninput = e => {
    
              const index =
                Number(
                  e.target.dataset.i
                );
    
              const field =
                e.target.dataset.f;
    
              rows[index][field] =
                e.target.value;
    
            };
    
          });
    
        tbody
          .querySelectorAll(
            "input[data-shift]"
          )
          .forEach(input => {
    
            input.onkeydown = e => {
    
              if (
                e.key !== "Enter"
              ) {
                return;
              }
    
              const index =
                Number(
                  e.target.dataset.shift
                );
    
              const shift =
                parseHeromaShift(
                  e.target.value
                );
    
              if (!shift) {
    
                alert(
                  "Fel format. Exempel: 645 1515 30"
                );
    
                return;
              }
    
              const date =
                rows[index].from
                ||
                period.from;
    
              rows[index].shifts[
                date
              ] = shift;
    
              e.target.style.background =
                "#c8f7c5";
    
              e.target.title =
                `${shift.start}-${shift.end} Rast ${shift.break}`;
    
            };
    
          });
        }