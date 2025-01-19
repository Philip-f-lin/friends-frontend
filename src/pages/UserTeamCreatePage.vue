<template>
  <div id = "teamPage">
    <van-search v-model="searchText" placeholder="尋找隊伍" @search="onSearch"/>
    <van-button type="primary" @click="doJoinTeam">創建隊伍</van-button>
    <team-card-list :team-list="teamList" />
    <van-empty v-if="teamList?.length < 1" description="查無資料" />
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";

const router = useRouter();
const searchText = ref('');

// 跳轉到加入隊伍畫面
const doJoinTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

/**
 * 查詢隊伍
 * @param val
 */
const listTeam = async (val = '') => {
  const res = await myAxios.get("/team/list/my/create", {
    params: {
      searchText: val,
      pageNum: 1
    },
  });
  if (res?.code === 0){
    teamList.value = res.data;
  }else {
    showToast('加載隊伍失敗，請重新整理');
  }
}

// 頁面加載時只會觸發一次
onMounted(() => {
  listTeam();
})



const onSearch = (val) => {
  listTeam(val);
};

</script>

<style scoped>

</style>