export const state = () => ({
  queryString: null
})

export const mutations = {
  query (state, text) {
    state.queryString = text
  }
}
