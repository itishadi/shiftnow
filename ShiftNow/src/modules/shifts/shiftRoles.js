export let shiftRoles = {};

export function getRole(
  code
) {

  return shiftRoles[
    code.toLowerCase()
  ];

}

export function deleteRole(
  code
) {

  delete shiftRoles[
    code.toLowerCase()
  ];

}

export function getAllRoles() {

  return Object.values(
    shiftRoles
  );

}

export function addOrUpdateRole(
  role
) {

  shiftRoles[
    role.code.toLowerCase()
  ] = role;

}

export function createRole() {

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

  const colorChoice =
    prompt(
`1 Grön
2 Rosa
3 Blå
4 Gul
5 Lila
6 Turkos
7 Orange
8 Röd
9 Brun
10 Mörkgrön
11 Mörkblå
12 Grå`,
      "1"
    );

  const color =
    `shift-type-${colorChoice}`;

  shiftRoles[
    code.toLowerCase()
  ] = {

    code:
      code.toLowerCase(),

    title,

    color

  };

}