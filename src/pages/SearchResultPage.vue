<template>
  <van-skeleton title avatar :row="3" :loading="isLoading">
    <user-card-list :user-list="userList" :loading="isLoading"/>
    <van-empty v-if="!isLoading && (!userList || userList.length < 1)" description="查無資料"/>
    <div v-if="hasError" style="color: red;">請求失敗，請稍後重試。</div>
  </van-skeleton>
</template>

<script setup>
import {onMounted, ref} from 'vue';
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios.js";
import {showSuccessToast} from "vant";
import qs from 'qs';
import 'vant/es/toast/style';
import UserCardList from "../components/UserCardList.vue";

const route = useRoute();
const {tags} = route.query;

const userList = ref([]);
const isLoading = ref(true); // 加載狀態
const hasError = ref(false); // 錯誤狀態

onMounted(async () => {
  try {
    const userListData = await myAxios.get('/user/search/tags', {
      params: {tagNameList: tags},
      paramsSerializer: params => qs.stringify(params, {indices: false})
    });

    if (userListData?.data) {
      userListData.data.forEach(user => {
        if (user.tags) {
          user.tags = JSON.parse(user.tags);
        }
      });
      userList.value = userListData.data;
    }
  } catch (error) {
    console.error('/user/search/tags error', error);
    showSuccessToast('請求失敗');
    hasError.value = true;
  } finally {
    isLoading.value = false; // 結束加載狀態
  }
});
</script>
