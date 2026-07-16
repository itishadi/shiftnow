export function periodFormTemplate() {

    return `

<div class="mv-container">

  <div class="mv-header">

    Inställningar för Schemaperiod

  </div>

  <div class="mv-body">

    <div class="mv-left">

      <div class="row">
        <label>Benämning</label>
        <input
          id="name"
          value="Ny schemaperiod">
      </div>

      <div class="row">
        <label>From</label>
        <input
          id="from"
          type="date">
      </div>

      <div class="row">
        <label>Tom</label>
        <input
          id="toDate"
          type="date">
      </div>

      <div class="row">
        <label>Rullande antal dagar</label>
        <input
          id="days"
          type="number"
          value="0">
      </div>

      <div class="row">
        <label>Semesterkoefficient</label>
        <input
          id="semesterCoeff"
          value="0">
      </div>

      <div class="row">
        <label>Kalenderdagsfaktor</label>
        <input
          id="calendarFactor"
          value="1,0">
      </div>

      <div class="row">
        <label>Sem.koeff planering</label>
        <input
          id="semesterPlanning"
          value="0">
      </div>

    </div>

    <div class="mv-right">

      <div class="row">
        <label>Planperiod from</label>
        <input
          id="planFrom"
          type="date">
      </div>

      <div class="row">
        <label>Planperiod tom</label>
        <input
          id="planToDate"
          type="date">
      </div>

      <div class="row">
        <label>Justering tom</label>
        <input
          value="Öppet">
      </div>

      <div class="row">
        <label>Korrigering tom</label>
        <input
          value="Öppet">
      </div>

      <div class="row">
        <label>Godkänn senast</label>
        <input
          id="approveDate"
          type="date">
      </div>

      <div class="row">
        <label>Ärendemetod</label>

        <select>
          <option>
            Välj ärendemetod
          </option>
        </select>

      </div>

    </div>

  </div>

  <div class="mv-extra-row">

    <label>
      Skicka besked med:
    </label>

    <select>

      <option>
        Skicka inte
      </option>

      <option>
        E-post
      </option>

      <option>
        SMS
      </option>

    </select>

  </div>

  <div class="grid-wrapper">

    <div class="grid-scroll-wrapper">

      <table id="periodTable">

        <thead>

          <tr>
            <th>Namn</th>
            <th>Personnr</th>
            <th>From</th>
            <th>Tom</th>
            <th>Passtyp</th>
            <th>Rullande</th>
            <th>Tid</th>
            <th>Veckor</th>
            <th>Semesterkoeff</th>
            <th>Kalenderfaktor</th>
            <th>Dygnsvila</th>
            <th>Veckovila</th>
            <th>Begr.period</th>
            <th>Planering</th>
          </tr>

        </thead>

        <tbody id="grid-body">

        </tbody>

      </table>

    </div>

  </div>

  <div class="grid-footer">

    <button id="add">
      Lägg till obemannat schema
    </button>

    <button id="importStaff">
      Importera personal
    </button>

    <button id="save">
      Spara
    </button>

    <button id="plan">
      Spara/Planera schema
    </button>

    <button id="cancel">
      Avbryt
    </button>

  </div>

</div>

    `;

}