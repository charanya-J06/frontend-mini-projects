let searchBtn = document.getElementById("search-btn");
let countryInput = document.getElementById("country-input");
let result = document.getElementById("result");

searchBtn.addEventListener("click", () => {
    let countryName = countryInput.value.trim();

    if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
        return;
    }

    let finalURL = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
    fetch(finalURL)
        .then((response) => response.json())
        .then((data) => {

            result.innerHTML = `
            <img src="${data[0].flags.png}" class="flag-img" alt="Flag of ${data[0].name.common}">
            <h2>${data[0].name.common}</h2>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Capital:</h4>
                    <span>${data[0].capital[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Continent:</h4>
                    <span>${data[0].continents[0]}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Population:</h4>
                    <span>${data[0].population.toLocaleString()}</span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Currency:</h4>
                    <span>
                        ${data[0].currencies[Object.keys(data[0].currencies)[0]].name}
                        -${Object.keys(data[0].currencies)[0]}
                    </span>
                </div>
            </div>
            <div class="wrapper">
                <div class="data-wrapper">
                    <h4>Common Languages:</h4>
                    <span>${Object.values(data[0].languages).toString().split(",").join(",")}</span>
                </div>
            </div>
        `;
        }).catch(() => {
            result.innerHTML = `<h3>Please enter valid country name</h3>`;
        })
});

countryInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchBtn.click();
});