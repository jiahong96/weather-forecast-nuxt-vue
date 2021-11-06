<template>
  <v-card
    class="mx-auto"
    max-width="400"
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5">
          {{ cityName }}
        </v-list-item-title>
        <v-list-item-subtitle>{{ currentTime }}, {{ description }}</v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <v-card-text>
      <v-row align="center">
        <v-col
          class="text-h2"
          cols="6"
        >
          {{ celsius }}&deg;C
        </v-col>
        <v-col cols="6">
          <v-img
            :src="icon"
            :alt="description"
            width="92"
          />
        </v-col>
      </v-row>
    </v-card-text>

    <v-list-item>
      <v-list-item-title>Wind</v-list-item-title>
      <v-list-item-subtitle>{{ windSpeed }}</v-list-item-subtitle>
    </v-list-item>

    <v-list-item>
      <v-list-item-title>Humidity</v-list-item-title>
      <v-list-item-subtitle> {{ humidity }}%</v-list-item-subtitle>
    </v-list-item>
  </v-card>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object,
      required: true
    }
  },
  computed: {
    cityName () {
      return this.weatherData.name || ''
    },
    description () {
      return this.weatherData.weather?.[0]?.description || ''
    },
    celsius () {
      return Math.round(parseFloat(this.weatherData.main?.temp) - 273.15)
    },
    humidity () {
      return this.weatherData.main?.humidity || 'N/A'
    },
    windSpeed () {
      return `${Math.round(parseFloat(this.weatherData.wind?.speed)).toFixed(1)} m/s`
    },
    currentTime () {
      const options = { weekday: 'short', hour: 'numeric', minute: 'numeric' }
      const today = new Date()

      return today.toLocaleString('en-US', options)
    },
    icon () {
      return `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${this.weatherData.weather?.[0]?.icon}.png`
    }
  }
}
</script>
