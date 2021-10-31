<template>
  <div id="app">
    <h1 class="title">World weather</h1>
    <p class="subtitle">Watch weather in your current location</p>
    <city-list
            :cities="cities"
            @handleRemove="handleRemove"
            @reloadCity="reloadCity"
    />
    <p
            v-if="errorCity"
            class="error-message">There are no such city</p>
    <button class="button__add"
            @click="showPopup">
      <img
              :src="require('./assets/button.jpg')"
              alt="add button"
              class="button__image">
    </button>
    <add-city-popup
            v-if="this.popupVizible"
            @closePopup="closePopup"
            @addCity="addCity"
            class="wrapper"
      />
  </div>
</template>

<script>
import CityList from "./components/CityList"
import AddCityPopup from "./components/AddCityPopup"
import {fetchData} from "./api/api";
import moment from "moment"

export default {
  name: 'App',
  components: {
    'city-list': CityList,
    'add-city-popup': AddCityPopup
  },
  data() {
    return {
      popupVizible: false,
      cities: [],
      errorCity: false,
    }
  },
  created() {
    const citiesFromLocalStorage = localStorage.getItem('cities-list')
    if(citiesFromLocalStorage) {
      this.cities = JSON.parse(citiesFromLocalStorage)
    }
  },
  methods: {
    showPopup() {
      this.popupVizible = true
    },
    closePopup() {
      this.popupVizible = false
    },
    async addCity(quiz) {
      this.errorCity = false
        const data = await fetchData(quiz)
        if(!data) {
          this.errorCity = true
          return
        }
        const quizCity = this.cities.find(x => x.name == data.name)
        const timeFromLastFetch = moment()
        if(!quizCity) {
          this.cities.push({
                    name: data.name,
                    country: data.sys.country,
                    weather: data.weather[0].main,
                    temperature: data.main.temp,
                    humidity: data.main.humidity,
                    timestamp: timeFromLastFetch
                  }
          )} else {
          quizCity.name = data.name,
                  quizCity.country = data.sys.country,
                  quizCity.weather = data.weather[0].main,
                  quizCity.temperature = data.main.temp,
                  quizCity.humidity = data.main.humidity,
                  quizCity.timestamp = timeFromLastFetch
        }
        localStorage.setItem('cities-list', JSON.stringify(this.cities))

    },
    handleRemove(city) {
      this.cities = this.cities.filter(t => t !== city)
      localStorage.setItem('cities-list', JSON.stringify(this.cities))
    },
    reloadCity(name) {
      console.log(`обновили данные по ${name}`)
      this.addCity(name)
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;
  margin: 0;
}
.title {
  padding: 0;
  margin-top: 0;
  margin-bottom: 32px;
  font-size: 70px;
  font-weight: 300;
  text-align: center;
}
.subtitle {
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 24px;
  color: #767676;
  padding-bottom: 20px;
  text-align: center;
}
.button__add{
  border: none;
  margin-left: auto;
  margin-right: 50px;
  background-color: transparent;
  display: block;
  width: 80px;
  height: 80px;
  border-radius: 50%;
  padding: 0;
  cursor:pointer;
}
.button__image{
  width: 80px;
  height: 80px;
}
.wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0,0,0,.4);
}
.error-message {
  color: red;
  font-weight: bold;
  font-size: 24px;
}
</style>
