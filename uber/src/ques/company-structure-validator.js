// - Company Structure Validator (Asked By Uber)
// A medium-level frontend interview question where we need to build a function to validate organisational hierarchy data. It is tests the candidate on problem solving, data structures, algorithms like DFS, and core frontend concepts.

// You are given an array of [employee, manager] pairs.
// Write a function isValidCompanyStructure(pairs) that returns true if the company hierarchy is valid, otherwise false.

// const pairs = [
//   ["A", "B"],
//   ["B", "C"],
//   ["C", "D"]
// ];

// const pairs = [
//   ["A", "B"],
//   ["B", "A"]
// ];
// false

// const pairs = [
//   ["A", "B"],
//   ["C", "D"]
// ];
// false

// const company = {
//   name: "CEO",
//   reports: [
//     { name: "CTO", reports: [{ name: "Dev1" }, { name: "Dev2" }] },
//     { name: "CFO", reports: [] }
//   ]
// };
function isValidCompanyStructure(pairs) {
  const adj = new Map();
  const employees = new Set();
  const managers = new Set();

  for (const [emp, mgr] of pairs) {
    if (!adj.has(mgr)) adj.set(mgr, []);
    adj.get(mgr).push(emp);
    employees.add(emp);
    managers.add(mgr);
  }

  // Find root (CEO) — person who is never an employee
  const roots = [...managers].filter(x => !employees.has(x));
  if (roots.length !== 1) return false;
  const root = roots[0];

  // DFS for cycle detection
  const visited = new Set();
  const visiting = new Set();

  function dfs(node) {
    if (!adj.has(node)) return;
    visiting.add(node);
    for (const child of adj.get(node)) {
      if (visiting.has(child)) return false; // cycle
      if (!visited.has(child)) {
        if (!dfs(child)) return false;
      }
    }
    visiting.delete(node);
    visited.add(node);
    return true;
  }

  if (!dfs(root)) return false;

  // Ensure all employees reachable
  return visited.size === employees.size;
}
