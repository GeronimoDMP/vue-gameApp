<template>
  <div>
    <div>
      <div class="topbar bg-black py-2 px-3 d-flex ai-center">
        <!-- topbar -->
        <img src="../assets/logo (2).jpeg" alt="" height="30">
        <!-- 中间元素撑开多余空间 -->
        <span class="text-white pl-2 flex-1 fs-xl">王者之战</span>
        <button class="btn bg-primary">立即下载</button>
      </div>
      <div style="height:2.9308rem"></div>
      <div class="nav bg-primary py-2 pt-3 nav-revers jc-around fs-md">
        <!-- nav -->
        <div class="nav-item active">
            <router-link tag="div" to="/">首页</router-link>
        </div>
        <div class="nav-item">
            <router-link tag="div" to="/">攻略中心</router-link>
        </div>
        <div class="nav-item">
            <router-link tag="div" to="/">赛事中心</router-link>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="scss" scoped>
.topbar{
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
}

</style>