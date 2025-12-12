const Base_URL = "https://latest.currency-api.pages.dev/v1/currencies/";

const dropdowns = document.querySelectorAll(".dropdown select");

const btn = document.querySelector("form button");

const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");

const msg = document.querySelector(".msg");

// for(let code in countryList){
//     console.log(code , countryList[code]);
// }


// For adding countries to dropdown
for (let select of dropdowns) {
    for (const currcode in countryList) {     // currcode is INR
        let newoption = document.createElement("option");
        newoption.innerText = currcode;
        newoption.value = currcode;
        if (select.name === "from" && currcode === "USD") {
            newoption.selected = "selected";
        }
        else if (select.name === "to" && currcode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
    }
    // event of changing flag
    select.addEventListener("change", (evt) => {
        updateFlag(evt.target);
    });
}


const updateExchangeRate = async () => {
    let amountInput = document.querySelector(".amount input");
    let amtval = amountInput.value;
    // console.log(amtval);
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amountInput.value = "1";
    }

    // console.log(fromCurr.value,toCurr.value);

    let fromCountry = fromCurr.value.toLowerCase();
    let toCountry = toCurr.value.toLowerCase();

    let URL = `${Base_URL}${fromCountry}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    // console.log(data[fromCountry][toCountry]);  returns the exchanged value rate
    let rate = data[fromCountry][toCountry];
    let finalAmount = amtval * rate;

    msg.innerText = `${currencySymbols[fromCurr.value]}${amtval} ${fromCurr.value} = ${currencySymbols[toCurr.value]}${finalAmount} ${toCurr.value}`;
}


const updateFlag = (element) => {    // Here we are having select as element
    // console.log(element.value);   // returns changed country currency like INR
    let currcode = element.value;
    let countryCode = countryList[currcode];    // like IN
    // console.log(countryCode);
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let newimg = element.parentElement.querySelector("img");   // since image tag is sibling of select
    newimg.src = newsrc;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();

});

window.addEventListener("load", () => {
    updateExchangeRate();
})

