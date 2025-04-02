const BASE_URL =
  "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const button = document.querySelector("button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

window.addEventListener("load", () => {
  newRate();
});

for (let select of dropdowns) {
  for (curr in countryList) {
    let newoption = document.createElement("option");
    newoption.innerText = curr;
    newoption.value = curr;
    if (select.name === "From" && curr === "USD") {
      newoption.selected = "selected";
    } else if (select.name === "To" && curr === "INR") {
      newoption.selected = "selected";
    }
    select.append(newoption);
  }
  select.addEventListener("change", (evt) => {
    flag(evt.target);
  });
}

const flag = (element) => {
  let curr = element.value;
  let countryCode = countryList[curr];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

button.addEventListener("click", (evt) => {
  evt.preventDefault();
  newRate();
});

const newRate = async () => {
  let amount = document.querySelector(".amount input");
  let amountVal = amount.value;
  if (amountVal === "" || amountVal < 1) {
    amountVal = 0;
    amount.value = "0";
  }

  const URL = `${BASE_URL}/${fromcurr.value.toLowerCase()}.json`;
  let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
  let convertedAmount = amountVal * rate;
  msg.innerText = `${amountVal} ${fromcurr.value} = ${convertedAmount} ${tocurr.value}`;
};
