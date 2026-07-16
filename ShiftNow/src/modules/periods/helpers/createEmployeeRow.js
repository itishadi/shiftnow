export function createEmployeeRow(
    name = "Ny person"
) {

    return {

        name,

        status: "Planeras",

        personnr: "",

        from: "",

        to: "Öppet",

        passTyp: "Aktiv/Bunden",

        days: 0,

        time: "40:00",

        veckor: "",

        semesterkoeff: "0",

        kalenderdagsfaktor: "1,0",

        dygnsvila: "11:00",

        veckovila: "36:00",

        begransningsperiod: "100%",

        planering: "",

        manuKoeff: "",

        planeriManu: "",

        faktur: "",

        kl: "",

        lhs: "",

        datumKl: "",

        startdatum: "",

        periodDgr: "",

        planFrom: "",

        planTo: "Öppet",

        toSlut: "",

        shifts: {}

    };

}