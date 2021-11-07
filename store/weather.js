export const state = () => ({
  weatherData: null,
  forecastData: null,
  selection: null
})

export const mutations = {
  setWeatherData (state, weatherData) {
    state.weatherData = weatherData
  },
  setForecastData (state, forecastData) {
    state.forecastData = forecastData
  },
  updateSelection (state, selectedCity) {
    state.selection = selectedCity
  }
}

export const actions = {
  async queryWeather ({ commit }, city) {
    const weatherData = await this.$axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.$config.weatherApiKey}`)

    commit('setWeatherData', weatherData.data)
  },
  async queryWeatherByLocation ({ commit }, { lat, lon }) {
    const weatherData = await this.$axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.$config.weatherApiKey}`)

    commit('setWeatherData', weatherData.data)
    commit('updateSelection', null)
  },
  async queryForecast ({ commit }, city) {
    const forecastData = await this.$axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${this.$config.weatherApiKey}`)

    commit('setForecastData', forecastData.data)
  },
  async queryForecastByLocation ({ commit }, { lat, lon }) {
    const forecastData = await this.$axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.$config.weatherApiKey}`)

    commit('setForecastData', forecastData.data)
  }
}
