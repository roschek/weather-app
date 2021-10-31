const API_KEY = '5a83bfb57afaff6c38f3976d1c7f83ab'
const URL = `http://api.openweathermap.org/data/2.5/weather?units=metric&lang=en&`

export const fetchData = city => {
    return fetch(`${URL}APPID=${API_KEY}&q=${city}`)
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .catch(() => console.log('some error'));
}
