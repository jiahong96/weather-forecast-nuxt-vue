<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <WeatherCard
        v-if="dataLoaded"
        :weather-data="weatherData"
        :forecast-data="forecastData"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    dataLoaded () {
      return this.weatherData && this.forecastData
    },
    weatherData () {
      return this.$store.state.weather.weatherData
    },
    forecastData () {
      return this.$store.state.weather.forecastData
    }
  }
}
</script>
