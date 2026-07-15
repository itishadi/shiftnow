import { formatDate }
    from "../dates/formatDate.js";

import { isDateActive }
    from "../dates/isDateActive.js";

import { getWeeksForPerson }
    from "../dates/getWeeksForPerson.js";

import { minutesToHHMM }
    from "../calculations/minutesToHHMM.js";

import { calculateWorkedMinutes }
    from "../calculations/calculateWorkedMinutes.js";

import { getTargetMinutes }
    from "../calculations/getTargetMinutes.js";

import { getShiftLength }
    from "../calculations/getShiftLength.js";

import { getShiftPosition }
    from "../shifts/getShiftPosition.js";

import { getShiftWidth }
    from "../shifts/getShiftWidth.js";

import { shiftOutsidePeriod }
    from "../shifts/shiftOutsidePeriod.js";

import { createShift }
    from "../shifts/createShift.js";

import { renderHeader }
    from "../templates/renderHeader.js";

import { renderTimeBlocks }
    from "../templates/renderTimeBlocks.js";

import { renderShiftRoles }
    from "../templates/renderShiftRoles.js";


import { setupDragAndDrop }
    from "../dragdrop/setupDragAndDrop.js";

import { setupWeekRows }
    from "../rows/setupWeekRows.js";

import { setupTimeBlockEvents }
    from "../timeblocks/setupTimeBlockEvents.js";

import { setupPersonRows }
    from "../rows/setupPersonRows.js";

import { setupActionButtons }
    from "../setup/setupActionButtons.js";

import { renderScheduleRows }
    from "../rows/renderScheduleRows.js";

import { getDayHeaderClass }
    from "../dates/getDayHeaderClass.js";

import { getDefaultWeek }
    from "../week/getDefaultWeek.js";

import { setupKeyboardEvents }
    from "../keyboard/setupKeyboardEvents.js";

import {
    timeBlocks,
    getAllTimeBlocks,
    loadTimeBlocks,
    editTimeBlock,
    deleteTimeBlock,
    duplicateTimeBlock,
    createTimeBlock
}
from "../timeBlocks.js";

import {
    getRole,
    getAllRoles,
    createRole
}
from "../../shifts/shiftRoles.js";

export function ScheduleOverview(
    periods,
    currentPeriodId
) {

    const container =
        document.createElement("div");

    container.className =
        "schedule-overview";

    const period =
        periods.find(
            p => p.id === currentPeriodId
        );

    if (!period) {

        container.innerHTML =
            "<p>Ingen period vald.</p>";

        return container;

    }
    loadTimeBlocks();

    let expandedPerson =
        null;

    let selectedWeek =
        null;

    let activeCell =
        null;

    let cellInput =
        "";

    const dayNames = [

        "Måndag",
        "Tisdag",
        "Onsdag",
        "Torsdag",
        "Fredag",
        "Lördag",
        "Söndag"

    ];

    if (
        !selectedWeek
    ) {
        selectedWeek =
            getDefaultWeek(
                period,
                getWeeksForPerson
            );
    }

    function render() {

        container.innerHTML =
            "";

        const wrapper =
            document.createElement(
                "div"
            );

        wrapper.className =
            "heroma-wrapper";

        let html = `

      <table
        class="heroma-table">

        ${renderHeader(
            selectedWeek,
            dayNames,
            getDayHeaderClass
        )}

        <tbody>

    `;

        html += renderScheduleRows({

            period,
            expandedPerson,
            selectedWeek,
            activeCell,
            cellInput,

            formatDate,
            getWeeksForPerson,
            calculateWorkedMinutes,
            getTargetMinutes,
            minutesToHHMM,

            isDateActive,

            getShiftPosition,
            getShiftWidth,
            getShiftLength

        });

        html += `

        </tbody>

      </table>

      ${renderTimeBlocks(
            getAllTimeBlocks
        )}

      ${renderShiftRoles(
            getAllRoles
        )}

    `;

        wrapper.innerHTML =
            html;

        container.appendChild(
            wrapper
        );

        setupDragAndDrop({

            container,
            period,
            timeBlocks,
            shiftOutsidePeriod,
            render

        });

        setupKeyboardEvents({

            activeCell,
            cellInput,

            container,
            period,
            render,

            createShift,
            timeBlocks,
            getRole,
            shiftOutsidePeriod,

            setActiveCell:
                value => {

                    activeCell =
                        value;

                },

            setCellInput:
                value => {

                    cellInput =
                        value;

                }

        });

        setupWeekRows({

            container,

            render,

            setSelectedWeek:
                week => {

                    selectedWeek =
                        week;
                }

        });

        setupPersonRows({

            container,

            period,

            render,

            getExpandedPerson:
                () => expandedPerson,

            setExpandedPerson:
                value => {

                    expandedPerson =
                        value;
                },

            setSelectedWeek:
                week => {

                    selectedWeek =
                        week;
                }

        });

        setupTimeBlockEvents({

            container,

            editTimeBlock,

            deleteTimeBlock,

            duplicateTimeBlock,

            render

        });

        setupActionButtons({

            container,

            createRole,

            createTimeBlock,

            render

        });

    }

    render();

    return container;

}