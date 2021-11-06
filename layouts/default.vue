<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-btn
        icon
      >
        <v-icon>mdi-weather-cloudy</v-icon>
      </v-btn>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <city-search-input @query="queryWeather" />
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
    <v-footer
      :absolute="true"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }} {{ author }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'Weather Forecast',
      author: 'Loo Cheah Hong'
    }
  },
  methods: {
    queryWeather (city) {
    }
  }
}
</script>
