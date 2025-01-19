<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18" />
    </template>
  </van-nav-bar>
  <div id="content">
      <RouterView />
  </div>

  <van-tabbar route @change="">
    <van-tabbar-item replace to="/" icon="home-o" name="home">首頁</van-tabbar-item>
    <van-tabbar-item replace to="/team" icon="search" name="team">隊伍</van-tabbar-item>
    <van-tabbar-item replace to="/user" icon="friends-o" name="user">使用者</van-tabbar-item>
  </van-tabbar>

</template>


<script setup>
import {useRoute, useRouter} from "vue-router";
import { ref } from 'vue';
import routes from "../config/route";

// useRouter 頁面跳轉
const router = useRouter();
// useRoute 獲取資訊
const route = useRoute();
const DEFAULT_TITLE = 'Friends';
const title = ref(DEFAULT_TITLE);

/**
 * 根據路由切換標題
 */
router.beforeEach((to, from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath == route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})

const onClickLeft = () => {
  router.back()
};
const onClickRight = () => {
  router.push('/search')
};


</script>



<style scoped>
#content{
  padding-bottom: 50px;
}
</style>