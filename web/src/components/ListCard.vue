<template>
  <Card :icon="icon" :title="title">
    <div class="nav pt-2 ai-center jc-between fs-lg">
      <!-- 索引为data里的isActive的才高亮,点击谁谁高亮 -->
      <div
        v-for="(category, i) in categories"
        :key="i"
        class="nav-item pt-2"
        :class="{ active: isActive === i }"
        @click="$refs.list.swiper.slideTo(i)"
      > <!--点击时swiper滚动到该分类索引值对应的swiper-->
        {{ category.name }}
      </div>
    </div>
    <!-- swiper滑动时isActive改为当前swiper的index，上面分类名随之变黄 -->
    <swiper ref="list" :options="{autoHeight:true}"
    @slide-change="()=>isActive=$refs.list.swiper.realIndex"
    class="mb-2">
      <!-- 循环显示不同分类的swiper-->
      <swiper-slide v-for="(category, i) in categories" :key="i">
        <!-- 每个swiper里循环显示不同文章,
        slot将当前分类下的category对象传回给home -->
        <slot name='articles' :category='category'></slot>
      </swiper-slide>
    </swiper>
  </Card>
</template>

<script>
import Card from "../components/Card.vue";

export default {
  props: ["icon", "title", "categories"],
  components: {
    Card,
  },
  data() {
    return {
      isActive: 0,
    };
  },
};
</script>

<style>
</style>