const apiKey = "76507ac034b848419e382107232812";
const apiUrl = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=`;

// Selector
const selectEl = (el) => document.querySelector(el);

// Select DOM Elements
const searchForm = selectEl(".search__form");
const searchInput = selectEl("#search__input");
const currentDegreeEl = selectEl('#switch')


const fetchWeather = (city = 'Douala', cDeg = false) => {
    if (localStorage.getItem('city') === city) {
        if (JSON.parse(localStorage.getItem('data'))) {
            const data = JSON.parse(localStorage.getItem('data'))
            setDataToDOM(data, cDeg)
        }
    } else {
        localStorage.setItem('city', city)
        fetch(apiUrl + localStorage.getItem('city'))
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('data', JSON.stringify(data))
                setDataToDOM(data, false)
            })
    }

}

const setDataToDOM = (data, cDeg) => {
    const temperature = cDeg ? data.current.temp_f : data.current.temp_c
    const feelslike = cDeg ? data.current.feelslike_f : data.current.feelslike_c
    const note = cDeg ? '°F' : '°C'
    selectEl('#weather__city').innerText = data.location.name + ", " + data.location.country
    selectEl('#date_date').innerText = data.location.localtime
    selectEl('#degree_value').innerText = temperature
    selectEl('#degree_unit').innerText = note
    selectEl('#weather__icon').src = data.current.condition.icon
    selectEl('#condition_text').innerText = data.current.condition.text
    selectEl('#feels-value').innerText = feelslike + ' ' + note
    selectEl('#humidity-value').innerText = data.current.humidity + ' %'
    selectEl('#rain-value').innerText = data.current.precip_mm + ' %'
    selectEl('#wind-value').innerText = data.current.wind_mph + ' mph'
}


currentDegreeEl.addEventListener('click', () => {
    const value = currentDegreeEl.checked
    const city = localStorage.getItem('city')
    fetchWeather(city, value)
})

searchForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const city = searchInput.value || 'Maroua'
    fetchWeather(city)
})

window.addEventListener('DOMContentLoaded', () => {
    fetchWeather()
})
