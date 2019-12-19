<template>
  <div class="card rounded shadow-sm mb-3 tags">
    <div class="card-header bg-content">
      标签云
      <!-- <hr /> -->
    </div>
    <div class="card-body first-card-body">
      <dl>
        <dd class="rounded" @click="getArticleWithTagId(tag.id)" v-for="tag in data" :key="tag.id"  :style="{backgroundColor: colors[randomColor()]}">
          <!-- <el-tooltip class="item" placement="top" effect="light">
            <template slot="content">
              {{ tag.count }} 个话题
            </template>
            <span>
              {{ tag.name }}（{{tag.count}}）
            </span>
          </el-tooltip> -->
          {{ tag.name }}（{{tag.count}}）
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      colors: [
        '#1abc9c',
        '#2ecc71',
        '#3498db',
        '#9b59b6',
        '#34495e',
        '#f1c40f',
        '#e67e22',
        '#e74c3c',
        '#4caf50',
        '#9c27b0',
        '#f1c40f',
        '#ff9800',
        '#95a5a6',
        '#2196f3',
        '#00bcd4',
        '#009688',
        '#f44336',
        '#58B19F',
        '#FD7272',
        '#B33771',
        '#40407a',
        '#17a2b8',
        '#17c0eb',
        '#f60',
        '#b37333'
      ]
    }
  },
  methods: {
    randomColor () {
      const i = Math.floor(Math.random() * this.colors.length)
      // return this.colors[i]
      return i
    },
    getArticleWithTagId (tagId) {
      this.$router.push({ name: 'tag', query: { id: tagId } })
    }
  }
}
</script>

<style lang="less" scoped>
.card {
  width: 100%;
  padding: 0;
  .card-header {
    width: 100%;
    padding: 0;
    line-height: 2.8rem;
    padding: 0 1.1rem;
    color: #636b6f;
  }
  .card-body {
    padding: 10px 20px !important;
    dl{
      width: 100%;
      margin: 0 !important;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: flex-start;
      dd {
        text-align: left;
        text-indent: .6rem;
        width: 50%;
        line-height: 1.3rem;
        padding: 0 3px;
        font-size: 14px;
        opacity: .7;
        color: white;
        background-clip: content-box;
        -webkit-transition: all .5s;
        -o-transition: all .5s;
        transition: all .5s;
      }
      dd:hover {
        cursor: pointer;
        opacity: 1;
      }
    }

  }
  .first-card-body {
    padding: 10px 10px !important;
  }
}
@media screen and (min-width: 768px) and (max-width: 1024px) {
  .tags {
    .card-body {
      dl{
        width: 100%;
        padding: 0;
        margin: 0;
        // display: flex;
        // flex-direction: row;
        // flex-wrap: wrap;
        // justify-content: flex-start;
        dd {
          text-align: left;
          text-indent: .6rem;
          width: 100% !important;
        }
      }
    }
  }
}
</style>
