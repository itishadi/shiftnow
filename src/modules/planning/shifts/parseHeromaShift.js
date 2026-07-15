export function parseHeromaShift(
    text
) {

    const parts =
        text.trim().split(/\s+/);

    if (parts.length < 2) {
        return null;
    }

    const start =
        parts[0].padStart(4, "0");

    const end =
        parts[1].padStart(4, "0");

    const pause =
        Number(parts[2] || 0);

    return {

        start:
            `${start.slice(0, 2)}:${start.slice(2, 4)}`,

        end:
            `${end.slice(0, 2)}:${end.slice(2, 4)}`,

        break:
            pause

    };

}