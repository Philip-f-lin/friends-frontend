<template>
  <div id = "teamPage">
    <van-search v-model="searchText" placeholder="尋找隊伍" @search="onSearch"/>
    <team-card-list :team-list="teamList" />
    <van-empty v-if="teamList?.length < 1" description="查無資料" />
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showSuccessToast} from "vant";
import {getCurrentUser} from "../services/user.ts";

const router = useRouter();
const searchText = ref('');

const teamList = ref([]);

/**
 * 查詢隊伍
 * @param val
 */
const listTeam = async (val = '') => {
  // 獲取當前使用者資訊
  const currentUser = await getCurrentUser();
  if (!currentUser) {
    showSuccessToast('無法獲取使用者資訊，請重新登入');
    return;
  }
  const res = await myAxios.get("/team/list/my/join", {
    params: {
      searchText: val,
      pageNum: 1
    },
  });

  if (res?.code === 0) {
    teamList.value = res.data; // 更新隊伍列表
  } else {
    showSuccessToast('查詢失敗' + (res.description ? `， ${res.description}` : ''));
  }
};

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