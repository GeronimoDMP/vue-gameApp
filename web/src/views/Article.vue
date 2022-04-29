<template>
  <div class="article-page">
    <div class="bg-light-1 p-2 d-flex">
      <i class="iconfont icon-back fs-xl mx-1" @click="back"></i>
      <span class="fs-xs text-ellipsis">{{ article.title }} </span>
    </div>
    <div v-html="article.body" class="px-4"></div>
  </div>
</template>

<script>
export default {
  name: "ArticlePage",
  data() {
    return {
      article: {},
    };
  },
  props: ["id"],
  methods: {
    back() {
      this.$router.back();
    },
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.article = res.data;
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>