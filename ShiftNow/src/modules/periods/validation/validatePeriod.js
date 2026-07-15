export function validatePeriod(
    container
) {

    const from =
        container.querySelector(
            "#from"
        ).value;

    if (!from) {

        return {
            valid: false,
            message:
                "From-datum måste anges."
        };

    }

    return {
        valid: true
    };

}