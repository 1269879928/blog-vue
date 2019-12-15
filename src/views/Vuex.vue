<template>
  <div class="container">
    {{ getCount }}
    <div class="btn btn-primary mr-3" @click="sync('+')">
      同步自增2
    </div>
    <div class="btn btn-primary" @click="sync('-')">
      同步自减3
    </div>
    <hr />
    <div class="btn btn-primary" @click="asyncIn()">
      异步自增1
    </div>
    <div class="btn btn-primary" @click="asyncDe()">
      异步自减1
    </div>
  </div>
</template>

<script>
// import { mapMutations } from 'vuex'
export default {
  data () {
    return {
    }
  },
  computed: {
    getCount () {
      return this.$store.state.user.count
    }
  },
  methods: {
    // ...mapMutations(['INCREMENT', 'DECREMENT']),
    sync (type) {
      switch (type) {
        case '+':
          this.$store.commit({
            type: 'user/INCREMENT',
            payload: { number: 2 }
          })
          break
        default:
          this.$store.commit({
            type: 'user/DECREMENT',
            payload: 3
          })
          break
      }
    },
    asyncIn () {
      this.$store.dispatch({
        type: 'user/asyncIncrement',
        payload: { number: 1 }
      })
    },
    asyncDe () {
      this.$store.dispatch({
        type: 'user/asyncDecrement',
        payload: 1
      })
    }
  }
}
</script>

<style scoped>

</style>
