import { getPeriodStatus }
    from "../services/periodService.js";

import {
    state,
    setState
} from "../../shared/state/store.js";

export function renderPeriodCards(
    periods,
    list
) {

    periods.forEach(p => {

        const div =
            document.createElement("div");

        const status =
            getPeriodStatus(p);

        div.className =
            status.complete
                ? "period-card complete"
                : "period-card incomplete";

        if (
            state.selectedPeriod === p.id
        ) {

            div.classList.add(
                "selected"
            );

        }

        div.innerHTML = `

            <strong>
                ${p.name}
            </strong>

            <br>

            <small>
                ${p.from}
                →
                ${p.to}
            </small>

            <br>

            <small>
                ${status.approved}
                /
                ${status.total}
                fastställda
            </small>

        `;

        div.onclick = () => {

            setState(
                "selectedPeriod",
                p.id
            );

            window.dispatchEvent(
                new Event(
                    "navigate"
                )
            );

        };

        list.appendChild(
            div
        );

    });

}