<template>
  <v-autocomplete
    v-model="select"
    :loading="loading"
    :items="items"
    :search-input.sync="search"
    cache-items
    class="mx-4"
    flat
    hide-no-data
    hide-details
    label="Search City"
    solo-inverted
  />
</template>

<script>
import { mapActions, mapMutations } from 'vuex'

export default {
  data () {
    return {
      loading: false,
      items: [],
      cities: [
        'Kuala Lumpur',
        'Klang',
        'Ipoh',
        'Butterworth',
        'Johor Bahru',
        'George Town',
        'Petaling Jaya',
        'Kuantan',
        'Shah Alam',
        'Kota Bharu',
        'Melaka',
        'Kota Kinabalu',
        'Seremban',
        'Sandakan',
        'Papar',
        'Lahad Datu',
        'Sungai Petani',
        'Kuching',
        'Bintulu',
        'Miri',
        'Kuala Terengganu',
        'Alor Setar',
        'Putrajaya',
        'Kangar',
        'Labuan',
        'Pasir Mas',
        'Tumpat',
        'Ketereh',
        'Kampung Lemal',
        'Pulai Chondong'
      ],
      search: null
    }
  },
  computed: {
    select: {
      get () {
        return this.$store.state.weather.selection
      },
      set (value) {
        this.setSelection(value)
      }
    }
  },
  watch: {
    search (value) {
      value && value !== this.select && this.querySelection(value)
    },
    select (value) {
      if (value) {
        this.query(value)
        this.queryForecast(value)
      }
    }
  },
  methods: {
    ...mapActions({
      query: 'weather/queryWeather',
      queryForecast: 'weather/queryForecast'
    }),
    ...mapMutations({
      setSelection: 'weather/updateSelection'
    }),
    querySelection (searchValue) {
      this.loading = true
      // Simulated query
      setTimeout(() => {
        this.items = this.cities.filter((city) => {
          return (city || '').toLowerCase().includes((searchValue || '').toLowerCase())
        })
        this.loading = false
      }, 500)
    },
    clearSelection () {
      this.select = null
    }
  }
}
</script>
