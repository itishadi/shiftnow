import { handleKeyboardInput }
    from "./handleKeyboardInput.js";

export function setupKeyboardEvents({

    activeCell,
    cellInput,

    container,
    period,
    render,

    createShift,
    timeBlocks,
    getRole,
    shiftOutsidePeriod,

    setActiveCell,
    setCellInput

}) {

    document.onkeydown = e => {

        const result =
            handleKeyboardInput({
                event: e,
                activeCell,
                cellInput,
                container,
                period,
                render,
                createShift,
                timeBlocks,
                getRole,
                shiftOutsidePeriod
            });

        setActiveCell(
            result.activeCell
        );

        setCellInput(
            result.cellInput
        );
    };
}