<template>
  <div id="buttonContainer">
    <v-btn
      icon
      @click="findMe"
    >
      <v-icon>mdi-map-marker</v-icon>
    </v-btn>
    <v-dialog
      v-model="dialog"
      persistent
      max-width="290"
    >
      <v-card>
        <v-card-title class="text-h5">
          Geolocation Error
        </v-card-title>
        <v-card-text>{{ geoStatus }}</v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            text
            @click="dialog = false"
          >
            Got It
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      geoStatus: null,
      dialog: false
    }
  },
  methods: {
    ...mapActions({
      queryByLocation: 'weather/queryWeatherByLocation',
      queryForecastByLocation: 'weather/queryForecastByLocation'
    }),
    findMe () {
      if (!navigator.geolocation) {
        this.geoStatus = 'Geolocation is not supported by your browser'
        this.dialog = true
      } else {
        navigator.geolocation.getCurrentPosition(this.success, this.error)
      }
    },
    success (position) {
      const latitude = position.coords.latitude
      const longitude = position.coords.longitude

      this.queryByLocation({ lat: latitude, lon: longitude })
      this.queryForecastByLocation({ lat: latitude, lon: longitude })
    },
    error () {
      this.geoStatus = 'Unable to retrieve your location'
      this.dialog = true
    }
  }
}
</script>

<style scoped>
  #buttonContainer {
    display: inline
  }
</style>
