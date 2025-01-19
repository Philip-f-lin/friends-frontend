<template>
  <template v-if="user">
    <van-cell title="暱稱" is-link to = "/user/edit" :value="user.username" @click="toEdit('username', '暱稱', user.username)" />
    <van-cell title="帳號" :value="user.userAccount" />
    <van-cell title="頭貼" is-link to = "/user/edit">
      <img style="height: 48px" :src="user.avatarUrl" />
    </van-cell>
    <van-cell title="性別" is-link to = "/user/edit" :value="user.gender" @click="toEdit('gender', '性別', user.gender)" />
    <van-cell title="電話" is-link to = "/user/edit" :value="user.phone" @click="toEdit('phone', '電話', user.phone)" />
    <van-cell title="電子郵件" is-link to = "/user/edit" :value="user.email" @click="toEdit('email', '電子郵件', user.email)"/>
    <van-cell title="註冊時間" :value="user.createTime" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import 'vant/es/toast/style';
import {getCurrentUser} from "../services/user.ts";

/*const user = {
  id: 1,
  username: 'Philip',
  userAccount: 'philip',
  avatarUrl: 'https://cdn-icons-png.flaticon.com/512/3135/3135715.png',
  gender: '男',
  phone: '0988888888',
  email: '123456@gmail.com',
  planetCode: '1234',
  createTime: new Date(),
}*/

const user = ref();

onMounted(async () => {
  user.value = await getCurrentUser();
})

const router = useRouter();

const toEdit = (editKey: string, editName: string, currentValue: string) => {
  router.push({
    path: '/user/edit',
    query: {
      editKey,
      editName,
      currentValue,
    }
  })
}
</script>

<style scoped>

</style>