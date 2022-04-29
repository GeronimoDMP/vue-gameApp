<template>
  <div>
    <!-- 轮播图 -->
    <swiper
      :options="swiperOption"
      class="mb-2"
      :autoplay="{ delay: 1000, disableOnInteraction: false }"
    >
      <swiper-slide>
        <img class="w-100" src="../assets/ds1.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/ds1.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/ds1.jpeg" alt="" />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/ds1.jpeg" alt="" />
      </swiper-slide>
      <div class="swiper-pagination" slot="pagination"></div>
    </swiper>
    <!-- end of swiper -->
    <div class="nav-card">
      <div class="nav-icons bg-white d-flex flex-wrap text-center pb-3">
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-news"></i>
          <div py-2>爆料站</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-story"></i>
          <div py-2>故事站</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-shop"></i>
          <div py-2>周边商城</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-feel"></i>
          <div py-2>体验</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-newplayer"></i>
          <div py-2>新人专区</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-grnerate"></i>
          <div py-2>传承</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-community"></i>
          <div py-2>社区</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-camp"></i>
          <div py-2>营地</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-weixin"></i>
          <div py-2>公众号</div>
        </div>
        <div class="nav-item text-dark-1 mt-4">
          <i class="sprite sprite-copies"></i>
          <div py-2>版本介绍</div>
        </div>
      </div>
      <!-- <div class="nav-rollup bg-light py-2 fs-sm text-center">
        <i class="sprite sprite-rollup mr-1"></i>
        <span>收起</span>
      </div> -->
    </div>
    <!-- end of nav -->

    <!-- 父组件接收子组件数据,以自己的方式展示,这样每个卡片结构都不一样 -->
    <ListCard icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <!-- 接收name为articles的slot传回来的对象category 
      每个卡片结构不一样所以不能直接在list card里循环文章-->
      <template #articles="{ category }">
        <!-- 取category里newsList文章列表循环显示 -->
        <router-link
          tag="div"
          :to="`/articles/${article._id}`"
          class="pt-3 fs-lg d-flex"
          v-for="(article, i) in category.newsList"
          :key="i"
        >
          <span style="color: #6060ac">[{{ article.CategoryName }}]</span>
          <span class="px-2">|</span>
          <span class="flex-1 text-dark-1 text-ellipsis pr-1">{{
            article.title
          }}</span>
          <span class="text-grey fs-sm">{{
            article.createdAt.slice(5, 10).replace("-", "/")
          }}</span>
        </router-link>
      </template>
    </ListCard>

    <ListCard icon="card-hero" title="英雄列表" :categories="heroCats">
      <!-- 接收name为articles的slot传回来的对象category 
      每个卡片结构不一样所以不能直接在list card里循环文章-->
      <template #articles="{ category }">
        <!-- 负的margin使整体向外扩张一点-->
        <div class="d-flex flex-wrap text-center" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="pt-3 heroes"
            v-for="(hero, i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" alt="" />
            <div>{{ hero.name }}</div>
          </router-link>
        </div>
      </template>
    </ListCard>
  </div>
</template>

<script>
import ListCard from "../components/ListCard.vue";

export default {
  data() {
    return {
      swiperOption: {
        pagination: {
          el: ".swiper-pagination",
        },
      },
      newsCats: [],
      heroCats: [],
    };
  },
  components: {
    ListCard,
  },
  methods: {
    async fatchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fatchHeroCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    },
  },
  created() {
    this.fatchNewsCats();
    this.fatchHeroCats();
  },
};
</script>
<style  lang='scss' scoped>
.nav-card {
  border-bottom: 1px solid #d4d9de;
  border-top: 1px solid #d4d9de;
  .nav-item {
    width: 25%;
    // height: 5rem;
    border-right: 1px solid #d4d9de;
    // 最右元素不加边框
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.heroes {
  width: 20%;
  img {
    border-radius: 10%;
    width: 55px;
  }
}
</style>
