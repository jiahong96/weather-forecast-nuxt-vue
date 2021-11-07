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
            :src="mainIcon"
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

    <v-divider />

    <v-list class="transparent">
      <v-list-item
        v-for="(item, key) in forecastDates"
        :key="key"
      >
        <v-list-item-title>{{ key }}</v-list-item-title>

        <v-list-item-icon>
          <v-img
            :src="iconUrl(item.icon)"
            alt="weather icon"
            width="70"
          />
        </v-list-item-icon>

        <v-list-item-subtitle class="text-right">
          {{ `${temperatureConverter(item.tempMax)}&deg;C / ${temperatureConverter(item.tempMin)}&deg;C` }}
        </v-list-item-subtitle>
      </v-list-item>
    </v-list>
  </v-card>
</template>

<script>
export default {
  props: {
    weatherData: {
      type: Object,
      required: true
    },
    forecastData: {
      type: Object,
      required: true
    }
  },
  computed: {
    forecastDates () {
      return (this.forecastData.list || []).reduce((accumulated, item) => {
        const date = new Date(item.dt_txt)
        const day = date.toLocaleDateString('en-US', { weekday: 'long' })

        if (!accumulated[day]) {
          accumulated[day] = { tempMin: item.main.temp_min, tempMax: item.main.temp_max, icon: item.weather[0].icon }
        } else {
          if (accumulated[day].tempMin > item.main.temp_min) {
            accumulated[day].tempMin = item.main.temp_min
          }

          if (accumulated[day].tempMax < item.main.temp_max) {
            accumulated[day].tempMax = item.main.temp_max
            accumulated[day].icon = item.weather[0].icon
          }
        }

        return accumulated
      }, {})
    },
    cityName () {
      return this.weatherData.name || ''
    },
    description () {
      return this.weatherData.weather?.[0]?.description || ''
    },
    celsius () {
      return this.temperatureConverter(this.weatherData.main?.temp)
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
    mainIcon () {
      return this.iconUrl(this.weatherData.weather?.[0]?.icon)
    }
  },
  methods: {
    temperatureConverter (tempInKelvin) {
      return Math.round(parseFloat(tempInKelvin) - 273.15)
    },
    iconUrl (iconId) {
      return `https://openweathermap.org/themes/openweathermap/assets/vendor/owm/img/widgets/${iconId}.png`
    }
  }
}
</script>
