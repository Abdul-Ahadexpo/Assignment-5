let accountBalance = 1000;
let totalDonated = 0;

const donationData = {
  Noakhali: 1742,
  Feni: 1900,
  Quota: 1000,
};

function toggleSection(showDonation) {
  const cardsSection = document.querySelector(".cards");
  const historySection = document.getElementById("historySection");

  if (showDonation) {
    cardsSection.classList.remove("hidden");
    historySection.classList.add("hidden");
  } else {
    cardsSection.classList.add("hidden");
    historySection.classList.remove("hidden");
  }
}

function validateDonation(amount) {
  const maxDonation = 5000;
  if (isNaN(amount) || amount <= 0) {
    return "Invalid donation amount.";
  }
  if (amount < 10) {
    return "R U fokir? Donate more than 9 BDT";
  }
  if (amount > accountBalance) {
    return "Not enough balance.";
  }
  if (amount > maxDonation) {
    return `You can only donate up to ${maxDonation} BDT at a time.`;
  }
  return null;
}

function handleDonation(button) {
  const inputField = button.previousElementSibling;
  const amount = parseFloat(inputField.value);
  const errorMsg = validateDonation(amount);

  if (errorMsg) {
    alert(errorMsg);
    return;
  }

  accountBalance -= amount;
  totalDonated += amount;
  document.getElementById("accountBalance").innerText = accountBalance;

  const causeElement = button
    .closest(".card-body")
    .querySelector(".card-title");
  const causeName = causeElement.innerText.split(" ")[2];
  updateDonationForCause(amount, causeName);

  addToHistory(amount, causeName, "Bangladesh");
  showModal(amount);

  inputField.value = "";
}

function updateDonationForCause(amount, cause) {
  donationData[cause] += amount;

  const stMoneyElement = Array.from(
    document.querySelectorAll(".st-mony h1")
  ).find((el) => el.innerText.includes(donationData[cause] - amount));

  if (stMoneyElement) {
    stMoneyElement.innerText = `${donationData[cause]} BDT`;
  }
}

function addToHistory(amount, cause, location) {
  const historyList = document.getElementById("historyList");
  const now = new Date();

  const historyItem = document.createElement("li");
  historyItem.classList.add("card", "bg-base-200", "shadow-xl", "p-4", "mb-4");
  historyItem.innerHTML = `
        <h1>${amount} Taka was Donated for ${cause} at ${location}</h1>
        <p>Date: ${now.toString()}</p>
    `;
  historyList.appendChild(historyItem);
}

function showModal(amount) {
  const modalTitle = document.getElementById("modalTitle");
  const modalMessage = document.getElementById("modalMessage");

  modalTitle.innerText = "Congratulations!";
  modalMessage.innerText = `You have successfully donated ${amount} BDT! Thank you for your Donation`;

  const modal = document.getElementById("donationModal");
  modal.classList.add("modal-open");
}

document.getElementById("closeModal").addEventListener("click", function () {
  const modal = document.getElementById("donationModal");
  modal.classList.remove("modal-open");
});

document.querySelectorAll(".btn-wide").forEach((button) => {
  button.addEventListener("click", function () {
    handleDonation(this);
  });
});

document.getElementById("donationBtn").addEventListener("click", function () {
  toggleSection(true);
});

document.getElementById("historyBtn").addEventListener("click", function () {
  toggleSection(false);
});
