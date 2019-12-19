<template>
  <div class="card rounded shadow-sm mb-3">
    <div class="card-header bg-content">
      文章推荐
    </div>
    <div class="card-body top">
      <ul class="list-group list-group-flush">
        <template>
          <li class="list-group-item row my-list" v-for="topArticle in data" :key="topArticle.id">
            <div class="top-left col-4">
              <img class="thumbnail" v-if="topArticle.cover" :src="topArticle.cover" alt="">
              <img class="thumbnail" v-else src="https://image.twho.top/default.jpg" alt="">
            </div>
            <div class="top-right col-8">
              <div class="top-title" @click="detail(topArticle.id)">{{ topArticle.title }}</div>
              <div class="common-author">
                <span><i class="fa fa-clock-o mr-1"></i>{{ topArticle.created_at }}</span>
              </div>
            </div>
          </li>
        </template>
      </ul>
    </div>
  </div>
</template>

<script>
// import Vue from 'vue'
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  methods: {
    detail (id) {
      this.$router.push({ name: 'detail', query: { id: id } })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
