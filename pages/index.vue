<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <WeatherCard
        v-if="weatherData !== null"
        :weather-data="weatherData"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  computed: {
    weatherData () {
      return this.$store.state.weather.weatherData
    }
  }
}
</script>
