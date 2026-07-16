import { validatePostnr } from "../../../utils/helpers.js";

export function EmployeeDetailView({ employee, onSave, onCancel }) {
  const container = document.createElement("div");
  container.style.padding = "10px";
  container.style.maxHeight = "80vh";
  container.style.overflowY = "auto";

  function validate(data) {
    if (!data.fornamn || !data.efternamn) {
      alert("Förnamn och efternamn måste fyllas i.");
      return false;
    }
    if (data.postnr && !validatePostnr(data.postnr)) {
      alert("Postnumret måste vara 5 siffror.");
      return false;
    }
    return true;
  }

  container.innerHTML = `
    <h2>${employee ? "Redigera" : "Ny"} personal</h2>
    <form id="detailForm" style="display:grid; grid-template-columns:1fr 1fr; gap:8px;">
      <!-- Grunduppgifter -->
      <div class="form-group" style="grid-column: span 2;">
        <label><strong>Grunduppgifter</strong></label>
        <hr />
      </div>
      <div class="form-group">
        <label>Förnamn *</label>
        <input id="fornamn" value="${employee?.fornamn || ''}" required />
      </div>
      <div class="form-group">
        <label>Efternamn *</label>
        <input id="efternamn" value="${employee?.efternamn || ''}" required />
      </div>
      <div class="form-group">
        <label>Tilltalsnamn</label>
        <input id="tilltalsnamn" value="${employee?.tilltalsnamn || ''}" />
      </div>
      <div class="form-group">
        <label>Aviseringsnamn</label>
        <input id="aviseringsnamn" value="${employee?.aviseringsnamn || ''}" />
      </div>
      <div class="form-group">
        <label>Kompetens</label>
        <input id="competence" value="${employee?.competence || 'SSK'}" />
      </div>

      <!-- Adress -->
      <div class="form-group" style="grid-column: span 2;">
        <label><strong>Adress</strong></label>
        <hr />
      </div>
      <div class="form-group" style="grid-column: span 2;">
        <label>Gatuadress</label>
        <input id="gatuadress" value="${employee?.gatuadress || ''}" style="width:100%;" />
      </div>
      <div class="form-group">
        <label>Postnr</label>
        <input id="postnr" value="${employee?.postnr || ''}" />
      </div>
      <div class="form-group">
        <label>Postadress</label>
        <input id="postadress" value="${employee?.postadress || ''}" />
      </div>
      <div class="form-group" style="grid-column: span 2;">
        <label>C/O Adress</label>
        <input id="coAdress" value="${employee?.coAdress || ''}" style="width:100%;" />
      </div>

      <!-- Anställning -->
      <div class="form-group" style="grid-column: span 2;">
        <label><strong>Anställning</strong></label>
        <hr />
      </div>
      <div class="form-group">
        <label>Anställningsperiod from</label>
        <input type="date" id="from" value="${employee?.from || ''}" />
      </div>
      <div class="form-group">
        <label>Anställningsperiod tom</label>
        <input type="date" id="to" value="${employee?.to || ''}" />
      </div>
      <div class="form-group">
        <label>Sysselsättningsgrad (%)</label>
        <input id="sysselsattningsgrad" value="${employee?.sysselsattningsgrad || '100'}" />
      </div>
      <div class="form-group">
        <label>Heltidsarbetstid (tim/v)</label>
        <input id="heltidsarbetstid" value="${employee?.heltidsarbetstid || '40'}" />
      </div>
      <div class="form-group">
        <label>Enhet</label>
        <input id="enhet" value="${employee?.enhet || '11181 - Sjukskötersk...'}" />
      </div>
      <div class="form-group">
        <label>Företag</label>
        <input id="foretag" value="${employee?.foretag || '14 - Sem tlfpcl chef...'}" />
      </div>

      <!-- Knappar -->
      <div style="grid-column: span 2; display:flex; gap:10px; margin-top:10px;">
        <button type="button" id="saveBtn" style="padding:8px 20px; background:#2ecc71; color:white; border:none; border-radius:4px;">Spara</button>
        <button type="button" id="cancelBtn" style="padding:8px 20px; background:#e74c3c; color:white; border:none; border-radius:4px;">Avbryt</button>
      </div>
    </form>
  `;

  container.querySelector("#saveBtn").onclick = () => {
    const data = {
      fornamn: container.querySelector("#fornamn").value,
      efternamn: container.querySelector("#efternamn").value,
      tilltalsnamn: container.querySelector("#tilltalsnamn").value,
      aviseringsnamn: container.querySelector("#aviseringsnamn").value,
      competence: container.querySelector("#competence").value,
      gatuadress: container.querySelector("#gatuadress").value,
      postnr: container.querySelector("#postnr").value,
      postadress: container.querySelector("#postadress").value,
      coAdress: container.querySelector("#coAdress").value,
      from: container.querySelector("#from").value,
      to: container.querySelector("#to").value,
      sysselsattningsgrad: container.querySelector("#sysselsattningsgrad").value,
      heltidsarbetstid: container.querySelector("#heltidsarbetstid").value,
      enhet: container.querySelector("#enhet").value,
      foretag: container.querySelector("#foretag").value,
    };
    // Namn för listvisning
    data.name = `${data.fornamn} ${data.efternamn}`.trim() || "Namnlös";
    if (!validate(data)) return;
    onSave(data);
  };

  container.querySelector("#cancelBtn").onclick = onCancel;

  return container;
}