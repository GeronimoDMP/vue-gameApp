<template>
  <div class="card bg-white mt-3 p-3">
    <div class="card-header pb-3 d-flex">
      <i :class="`iconfont icon-${icon} fs-md`"></i>
      <div class="fs-xl flex-1 ml-1">{{ title }}</div>
      <i class="iconfont icon-menu fs-xl"></i>
    </div>
    <div class="card-body">
        
      <slot></slot>
      
    </div>
  </div>
</template>

<script>
export default {
  name: "news-card",
  props: ["title", "icon"],
};
</script>

<style lang="scss">
.card {
 
  .card-header {
    border-bottom: 1px solid #d4d9de;
  }
}
</style>