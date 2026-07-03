import {
  getRole
}
from "../shifts/shiftRoles.js";

export let timeBlocks = {

  A: {

    code: "A",

    title: "Dag ssk",

    start: "06:45",

    end: "16:00",

    break: 30,

    color: "shift-type-ssk"

  },

  A2: {

    code: "A2",

    title: "Dag ssk",

    start: "06:45",

    end: "15:15",

    break: 30,

    color: "shift-type-ssk"

  },

  A3: {

    code: "A3",

    title: "Dag ssk",

    start: "06:45",

    end: "15:30",

    break: 30,

    color: "shift-type-ssk"

  },

  C: {

    code: "C",

    title: "Kväll ssk",

    start: "13:30",

    end: "22:00",

    break: 30,

    color: "shift-type-ssk"

  },

  C1: {

    code: "C1",

    title: "Kväll ssk",

    start: "13:30",

    end: "21:30",

    break: 30,

    color: "shift-type-ssk"

  },

  UA: {

    code: "UA",

    title: "Dag usk",

    start: "06:45",

    end: "15:15",

    break: 30,

    color: "shift-type-usk"

  },

  UA1: {

    code: "UA1",

    title: "Dag usk",

    start: "06:45",

    end: "15:00",

    break: 30,

    color: "shift-type-usk"

  },

  UA2: {

    code: "UA2",

    title: "Dag usk",

    start: "06:45",

    end: "15:15",

    break: 30,

    color: "shift-type-usk"

  },

  UA3: {

    code: "UA3",

    title: "Dag usk",

    start: "06:45",

    end: "15:30",

    break: 30,

    color: "shift-type-usk"

  },

  UC: {

    code: "UC",

    title: "Kväll usk",

    start: "13:30",

    end: "22:00",

    break: 30,

    color: "shift-type-usk"

  }

};
export function getAllTimeBlocks() {

  return Object
    .values(
      timeBlocks
    )
    .sort(
      (
        a,
        b
      ) =>
        a.code.localeCompare(
          b.code
        )
    );

}
export function addOrUpdateTimeBlock(
  block
) {

  timeBlocks[
    block.code
  ] = block;

}

export function removeTimeBlock(
  code
) {

  delete timeBlocks[
    code
  ];

}
export function saveTimeBlocks() {

  localStorage.setItem(
    "shiftnow_timeblocks",
    JSON.stringify(
      timeBlocks
    )
  );

}

export function loadTimeBlocks() {

  const saved =
    localStorage.getItem(
      "shiftnow_timeblocks"
    );

  if (!saved) {
    return;
  }

  const data =
    JSON.parse(saved);

  Object.keys(
    data
  ).forEach(
    key => {

      timeBlocks[
        key
      ] = data[
        key
      ];

    }
  );

}
export function editTimeBlock(
  code
) {

  const block =
    timeBlocks[
      code
    ];

  if (!block) {
    return;
  }

  const newCode =
    prompt(
      "Kortkod",
      block.code
    );

  if (!newCode) {
    return;
  }

  const title =
    prompt(
      "Beskrivning",
      block.title
    );

  if (!title) {
    return;
  }

  const start =
    prompt(
      "Starttid",
      block.start
    );

  if (!start) {
    return;
  }

  const end =
    prompt(
      "Sluttid",
      block.end
    );

  if (!end) {
    return;
  }

  const breakMinutes =
    prompt(
      "Rast",
      block.break
    );

  renameTimeBlock(
    code,
    newCode.toUpperCase()
  );

  const updated =
    timeBlocks[
      newCode.toUpperCase()
    ];

  updated.title =
    title;

  updated.start =
    start;

  updated.end =
    end;

  updated.break =
    Number(
      breakMinutes || 0
    );

  saveTimeBlocks();

}

export function renameTimeBlock(
  oldCode,
  newCode
) {

  const block =
    timeBlocks[
      oldCode
    ];

  if (!block) {
    return;
  }

  delete timeBlocks[
    oldCode
  ];

  block.code =
    newCode;

  timeBlocks[
    newCode
  ] = block;

  saveTimeBlocks();

}

export function deleteTimeBlock(
  code
) {

  if (
    !timeBlocks[code]
  ) {

    return;

  }

  delete timeBlocks[
    code
  ];

  saveTimeBlocks();

}
export function duplicateTimeBlock(
  code
) {

  const block =
    timeBlocks[
      code
    ];

  if (!block) {
    return;
  }

  const newCode =
    prompt(
      "Ny kortkod",
      `${code}X`
    );

  if (!newCode) {
    return;
  }

  timeBlocks[
    newCode.toUpperCase()
  ] = {

    ...block,

    code:
      newCode.toUpperCase()

  };

  saveTimeBlocks();

}

export function createTimeBlock() {

  const code =
    prompt(
      "Kortkod"
    );

  if (!code) {
    return;
  }

  const title =
    prompt(
      "Beskrivning"
    );

  if (!title) {
    return;
  }

  const roleCode =
    prompt(
      "Färgblock (t.ex. SSK eller USK)"
    );

  if (!roleCode) {
    return;
  }

  const role =
    getRole(
      roleCode
    );

  if (!role) {

    alert(
      "Färgblock finns inte"
    );

    return;

  }

  const start =
    prompt(
      "Starttid",
      "06:45"
    );

  if (!start) {
    return;
  }

  const end =
    prompt(
      "Sluttid",
      "15:15"
    );

  if (!end) {
    return;
  }

  const breakMinutes =
    prompt(
      "Rast",
      "30"
    );

  timeBlocks[
    code.toUpperCase()
  ] = {

    code:
      code.toUpperCase(),

    title,

    start,

    end,

    break:
      Number(
        breakMinutes || 0
      ),

    color:
      role.color,

    role:
      role.code

  };

  saveTimeBlocks();

}