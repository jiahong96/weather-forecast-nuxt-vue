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
      select: null,
      search: null
    }
  },
  watch: {
    search (value) {
      value && value !== this.select && this.querySelection(value)
    },
    select (value) {
      this.$emit('query', value)
    }
  },
  methods: {
    querySelection (searchValue) {
      this.loading = true
      // Simulated query
      setTimeout(() => {
        this.items = this.cities.filter((city) => {
          return (city || '').toLowerCase().includes((searchValue || '').toLowerCase())
        })
        this.loading = false
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
