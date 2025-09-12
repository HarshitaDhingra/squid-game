const nameInput = document.getElementById("name");
const mobileInput = document.getElementById("mobile");
const emailInput = document.getElementById("email");
const submitBtn = document.getElementById("submit");
const errorDiv = document.getElementById("error");
const tableBody = document.querySelector("#summaryTable tbody");
const searchInput = document.getElementById("search");
const noResultDiv = document.getElementById("noResult");

let contactsList = [
  {
    name: "Admin",
    mobile: "9999999999",
    email: "admin@xyzcompany.com",
  },
];
const nameRegex = /^[A-Za-z][A-Za-z ]{0,19}$/;
const mobileRegex = /^[0-9]{10}$/;
const emailRegex =
  /^[A-Za-z](?!.*\.\.)([A-Za-z0-9.]{1,9})@[A-Za-z]+\.[A-Za-z]{2,}$/;

function createTable(contacts) {
  tableBody.innerHTML = "";
  if (contacts.length === 0) {
    noResultDiv.style.display = "block";
    return;
  }
  noResultDiv.style.display = "none";
  contacts.forEach((contact) => {
    const row = document.createElement("tr");

    const nameTd = document.createElement("td");
    nameTd.textContent = contact.name;
    const mobileTd = document.createElement("td");
    mobileTd.textContent = contact.mobile;
    const emailTd = document.createElement("td");
    emailTd.textContent = contact.email;

    row.appendChild(nameTd);
    row.appendChild(mobileTd);
    row.appendChild(emailTd);
    tableBody.appendChild(row);
  });
}
function addVendor(e) {
  console.log("Add ");
  e.preventDefault(e);
  const name = nameInput.value.trim();
  const mobile = mobileInput.value.trim();
  const email = emailInput.value.trim();

  if (
    !nameRegex.test(name) ||
    !mobileRegex.test(mobile) ||
    !emailRegex.test(email)
  ) {
    errorDiv.style.display = "block";
    return;
  }
  errorDiv.style.display = "none";
  contactsList.push({
    name,
    mobile,
    email,
  });
  createTable(contactsList);
  nameInput.value = "";
  mobileInput.value = "";
  emailInput.value = "";
}
function searchContact() {
  const searchValue = searchInput.value.trim();
  if (searchValue === "") {
    createTable(contactsList);
    return;
  }
  const filtered = contactsList.filter((c) => c.mobile.includes(searchValue));
  createTable(filtered);
}
submitBtn.addEventListener("click", addVendor);
searchInput.addEventListener("input", searchContact);

createTable(contactsList);
