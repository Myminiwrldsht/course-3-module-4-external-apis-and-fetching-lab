// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!
async function fetchWeatherData(state) {
    const response = await fetch(weatherApi + state)

    if(!response.ok) {
        throw new Error("Failed to fetch weather data");

    }

    const data = await response.json();
    
    return data;
}


function displayAlerts(data) {
    const alertsDisplay = document.querySelector("#alerts-display")
    alertsDisplay.textContent = "";

    const summary = document.createElement("p");
    summary.textContent =  `${data.title}: ${data.features.length}`;
    alertsDisplay.append(summary);

    data.features.forEach((alert)=> {
        const headline= document.createElement("li");
        headline.textContent = alert.properties.headline;
        alertsDisplay.append(headline);

    })
}

const stateInput = document.querySelector("#state-input");
const errorMessage = document.querySelector("#error-message");

async function handleClick() {
    const state = stateInput.value;

    try {
        if(state === "") {
            throw new Error("Input your State")
        }

        const data = await fetchWeatherData(state);
        displayAlerts(data);

        errorMessage.textContent = "";
        errorMessage.classList.add("hidden");
    } catch (error) {
        errorMessage.textContent = error.message;
        errorMessage.classList.remove("hidden");
    }

    stateInput.value = "";

}

document.querySelector("#fetch-alerts").addEventListener("click", handleClick)







//fetchWeatherData("NY").then(displayAlerts);