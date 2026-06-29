
let employees = [];

// Ladda från localStorage vid start
const saved = localStorage.getItem("shiftnow_employees");
if (saved) {
  employees = JSON.parse(saved);
}

export function getEmployees() {
  return employees;
}

export function addEmployee(emp) {
  const newEmp = { id: Date.now(), ...emp };
  employees.push(newEmp);
  localStorage.setItem("shiftnow_employees", JSON.stringify(employees));
  return newEmp;
}

export function removeEmployee(index) {
  employees.splice(index, 1);
  localStorage.setItem("shiftnow_employees", JSON.stringify(employees));
}

export function updateEmployee(index, data) {
  employees[index] = { ...employees[index], ...data };
  localStorage.setItem("shiftnow_employees", JSON.stringify(employees));
}
