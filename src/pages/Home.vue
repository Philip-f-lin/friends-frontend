<template>
  <van-cell center title="配對模式">
    <template #right-icon>
      <van-switch v-model="isMatchMode" size="24" />
    </template>
  </van-cell>
  <user-card-list :user-list="userList" :loading="loading"/>
  <van-empty v-if="!userList || userList.length < 1" description="查無資料" />
</template>

<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import myAxios from "../plugins/myAxios.js";
import {showSuccessToast} from "vant";
import 'vant/es/toast/style';
import UserCardList from "../components/UserCardList.vue";
import {UserType} from "../models/user";

const isMatchMode = ref<boolean>(false);

const userList = ref([]);
const loading = ref(true);

const loadData = async () => {
  let userListData;
  loading.value = true;
   // 配對模式，根據標籤配對使用者
  if (isMatchMode.value){
    const num = 3;
    userListData = await myAxios.get('/user/match', {
      params: {
        num,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showSuccessToast('請求失敗');
        })
  }else{
    // 普通模式，直接分頁查詢使用者
    userListData = await myAxios.get('/user/recommend', {
      params: {
        pageSize: 8,
        pageNum: 1,
      },
    })
        .then(function (response) {
          console.log('/user/recommend succeed', response);
          return response?.data?.records;
        })
        .catch(function (error) {
          console.error('/user/recommend error', error);
          showSuccessToast('請求失敗');
        })
  }
  if (userListData){
    userListData.forEach((user: UserType) =>{
      if (user.tags){
        console.log(user.tags)
        user.tags = JSON.parse(user.tags);
      }
    })
    userList.value = userListData;
  }
  loading.value = false;
}

watchEffect(() => {
  loadData();
})

/*const mockUser = {
  id: 12345,
  username: 'Philip',
  userAccount: 1234,
  profile: '對金錢的執著會影響人當下的判斷，當你是為了錢而想學習他的做法時，就注定已經模仿不了他了',
  avatarUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135768.png',
  gender: 0,
  phone: '0988888888',
  email: '123456@gmail.com',
  userRole: 0,
  planetCode: 1234,
  tags: ['java', 'emo','碼農'],
  createTime: new Date(),
}*/

</script>

<style scoped>

</style>