<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="10" md="8">
      <WeatherCard
        v-if="weatherData !== null"
        :city-name="city"
        :weather-data="weatherData"
      />
    </v-col>
  </v-row>
</template>

<script>
export default {
  data () {
    return {
      weatherData: null,
      loading: false
    }
  },
  computed: {
    city () {
      return this.$store.state.weather.queryString
    }
  },
  watch: {
    city (newValue) {
      this.queryWeather(newValue)
    }
  },
  methods: {
    async queryWeather (city) {
      this.loading = true

      const response = await this.$axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.$config.weatherApiKey}`)

      this.loading = false
      this.weatherData = response.data
    }
  }
}
</script>
