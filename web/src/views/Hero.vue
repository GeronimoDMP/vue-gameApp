<template>
  <div class="hero-page">
    <div class="topbar bg-black py-2 px-3 d-flex ai-center text-white">
      <!-- topbar -->
      <img src="../assets/logo (2).jpeg" alt="" height="30" />
      <!-- 中间元素撑开多余空间 -->
      <span class="pl-2 flex-1 fs-xl">王者之战</span>
      <router-link to="/" tag="div" class="fs-xs">更多英雄</router-link>
      <i class="iconfont icon-arrow fs-xs"></i>
    </div>
    <div>
      <h4>{{ hero.title }}</h4>
      <h2>{{ hero.name }}</h2>
      <div>{{ hero.categories.name }}</div>
      <div v-if="hero.scores">
        <span class="mr-2">难度{{ hero.scores.difficult }}</span>
        <span class="mr-2">技能{{ hero.scores.skills }}</span>
        <span class="mr-2">攻击{{ hero.scores.attack }}</span>
        <span class="mr-2">生存{{ hero.scores.survive }}</span>
      </div>
      <!-- skills -->
      <h3>技能:</h3>
      <div v-for="(item, i) in hero.skills" :key="i" class="mb-2">
        <div>技能名称：{{ item.name }}</div>
        <div>技能描述：{{ item.description }}</div>
        <div>技能提示：{{ item.tips }}</div>
      </div>
      <!-- cards -->
      <Card icon="card-hero" title="使用技巧">
        <div>{{ hero.usageTips }}</div>
      </Card>
      <Card icon="card-hero" title="对抗技巧">
        <div>{{ hero.battleTips }}</div>
      </Card>
      <Card icon="card-hero" title="团战思路">
        <div>{{ hero.teamTips }}</div>
      </Card>
    </div>
  </div>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  name: "HeroPage",
  data() {
    return {
      hero: {},
    };
  },
  props: ["id"],
  components: { Card },
  methods: {
    async fetch() {
      const res = await this.$http.get(`heros/${this.id}`);
      this.hero = res.data;
      console.log(res.data);
    },
  },
  created() {
    this.fetch();
  },
};
</script>

<style>
</style>