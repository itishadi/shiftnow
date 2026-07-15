export function createEmployeeRow(
    name,
    period
) {
    return {
        name,

        status: "Planeras",

        personnr: "",

        from: period.from || "",

        to: period.to || "Öppet",

        passTyp: "Aktiv/Bunden",

        days: 0,

        time: "40:00",

        veckor: "",

        semesterkoeff: "0,00",

        kalenderdagsfaktor: "1,0",

        dygnsvila: "11:00",

        veckovila: "36:00",

        begransningsperiod: "100%",

        planering: "",

        shifts: {}
    };
}
