<template>
  <v-app dark>
    <v-app-bar
      fixed
      app
    >
      <v-icon class="mx-2">
        mdi-weather-cloudy
      </v-icon>
      <v-toolbar-title v-text="title" />
      <v-spacer />

      <city-search-input />
      <current-location-button />
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
  }
}
</script>
