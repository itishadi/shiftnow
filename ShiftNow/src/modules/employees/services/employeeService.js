let employees = [];

const saved = localStorage.getItem("shiftnow_employees");
if (saved) {
  employees = JSON.parse(saved);
}

export function getEmployees() {
  return employees;
}

export function addEmployee(emp) {
  const newEmp = {
    id: Date.now(),
    // Grundfält
    name: emp.name || "",
    competence: emp.competence || "SSK",
    // Anställningsinfo
    from: emp.from || "",
    to: emp.to || "",
    krontalson: emp.krontalson || "0,00",
    sistaAnstallningsdag: emp.sistaAnstallningsdag || "",
    timon: emp.timon || "0,00",
    ejRattTillOvertid: emp.ejRattTillOvertid || "0,00",
    ejRattTillRestid: emp.ejRattTillRestid || "0,00",
    lonetillagg: emp.lonetillagg || "0,00",
    sysselsattningsgrad: emp.sysselsattningsgrad || "100,00",
    heltidsarbetstid: emp.heltidsarbetstid || "40,00",
    besattning: emp.besattning || "100,00",
    foretag: emp.foretag || "14 - Sem tlfpcl chef...",
    enhet: emp.enhet || "11181 - Sjukskötersk...",
    paTeam: emp.paTeam || "PA-Team",
    lok: emp.lok || "LOK Gr AS LE män - ...",
    hok: emp.hok || "HÖK OFR Hälso- och sjukvård",
    fmgrp: emp.fmgrp || "Fmgrp 11-26, 98-99AB...",
    reseersattning: emp.reseersattning || "Reseregeverk RU",
    // Personuppgifter
    aviseringsnamn: emp.aviseringsnamn || "",
    fornamn: emp.fornamn || "",
    efternamn: emp.efternamn || "",
    tilltalsnamn: emp.tilltalsnamn || "",
    mellannamn: emp.mellannamn || "",
    initialer: emp.initialer || "",
    coAdress: emp.coAdress || "",
    gatuadress: emp.gatuadress || "",
    lagenhetsnr: emp.lagenhetsnr || "",
    postnr: emp.postnr || "",
    postadress: emp.postadress || "",
  };
  employees.push(newEmp);
  localStorage.setItem("shiftnow_employees", JSON.stringify(employees));
  return newEmp;
}

export function removeEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("shiftnow_employees", JSON.stringify(employees));
}

export function updateEmployee(index, data) {
  employees[index] = { ...employees[index], ...data };
  localStorage.setItem("shiftnow_employees", JSON.stringify(employees));
}

export function importEmployees(data) {
  data.forEach(emp => addEmployee(emp));
}