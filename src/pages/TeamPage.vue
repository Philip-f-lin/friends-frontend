<template>
  <div id = "teamPage">
    <van-search v-model="searchText" placeholder="尋找隊伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公開" name="public" />
      <van-tab title="私人" name="private" />
    </van-tabs>
    <div style="margin-bottom: 16px" />
    <van-button class="add-button" type="primary" icon="plus" @click="toAddTeam" />
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

const active = ref('public');
const router = useRouter();
const searchText = ref('');

/**
 * 切換查詢狀態
 * @param name
 */
const onTabChange = (name) => {
  if(name === 'public'){
    listTeam(searchText.value, 0);
  }else {
    // 查私人
    listTeam(searchText.value, 1);
  }
}

// 跳轉到加入隊伍畫面
const toAddTeam = () => {
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

/**
 * 查詢隊伍
 * @param val
 * @param status
 */
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
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
#teamPage {
  padding-bottom: 120px; /* 確保內容不會壓住按鈕 */
}

.add-button {
  position: fixed; /* 固定按鈕在右下角 */
  bottom: 80px; /* 調整按鈕的高度 */
  right: 16px;
  z-index: 1000; /* 保證按鈕在最上層 */
}

</style>