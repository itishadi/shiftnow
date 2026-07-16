export function createPeriodData(
    container,
    rows
) {

    return {

        name:
            container.querySelector(
                "#name"
            ).value,

        from:
            container.querySelector(
                "#from"
            ).value,

        to:
            container.querySelector(
                "#toDate"
            ).value,

        days:
            container.querySelector(
                "#days"
            ).value,

        planFrom:
            container.querySelector(
                "#planFrom"
            ).value,

        planTo:
            container.querySelector(
                "#planToDate"
            ).value,

        approveDate:
            container.querySelector(
                "#approveDate"
            ).value,

        rows

    };

}