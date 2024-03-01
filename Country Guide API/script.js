// Selects the search button element by its ID and stores it in the variable 'searchBtn'
let searchBtn = document.getElementById("search-btn");
// Selects the country input element by its ID and stores it in the variable 'countryInp'
let countryInp = document.getElementById("country-inp");
// Selects the result container element by its ID and stores it in the variable 'result'
let result = document.getElementById("result");

// Adds a click event listener to the search button
searchBtn.addEventListener("click", () => {
  // Retrieves the value entered in the country input field and stores it in the variable 'countryName'
  let countryName = countryInp.value;
  // Constructs the final URL for fetching country data based on the entered country name
  let finalUrl = `https://restcountries.com/v3.1/name/${countryName}?fullText=true`;
  console.log(finalUrl);

  // Fetches data from the final URL and processes the response
  fetch(finalUrl)
    .then((response) => response.json())
    .then((data) => {
      // Populates the result container with country information fetched from the API
      result.innerHTML = `
        <img src="${data[0].flags.svg}" class="flag-img">
        <h2>${data[0].name.common}</h2>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Capital:</h4>
            <span>${data[0].capital[0]}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Continents:</h4>
            <span>${data[0].continents}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Currencies:</h4>
            <span>${data[0].currencies[Object.keys(data[0].currencies)].name}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Languages:</h4>
            <span>${Object.values(data[0].languages).toString().split(",").join(", ")}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Area:</h4>
            <span>${data[0].area}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Population:</h4>
            <span>${data[0].population}</span>
          </div>
        </div>
        <div class="wrapper">
          <div class="data-wrapper">
            <h4>Borders:</h4>
            <span>${Object.values(data[0].borders).toString().split(",").join(", ")}</span>
          </div>
        </div>`;
    })
    // Handles errors in fetching data
    .catch(() => {
      // Checks if the input field is empty
      if (countryName.length == 0) {
        result.innerHTML = `<h3>The input field cannot be empty</h3>`;
      } else {
        // Displays an error message for invalid country names
        result.innerHTML = `<h3>Please enter a valid country name</h3>`;
      }
    });
});
