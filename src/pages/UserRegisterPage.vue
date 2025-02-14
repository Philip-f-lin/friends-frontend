<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="username"
          name="username"
          label="使用者名稱"
          placeholder="請輸入使用者名稱"
          :rules="[{ required: true, message: '請輸入使用者名稱(需大於 4 位)' }]"
      />
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="帳號"
          placeholder="請輸入帳號"
          :rules="[{ required: true, message: '請輸入帳號(需大於 8 位)' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密碼"
          placeholder="請輸入密碼"
          :rules="[{ required: true, message: '請填寫密碼(需大於 8 位)' }]"
      />
      <van-field
          v-model="checkPassword"
          type="password"
          name="checkPassword"
          label="確認密碼"
          placeholder="請再次輸入密碼"
          :rules="[{ required: true, message: '請再次輸入密碼' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        註冊
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round plain block type="primary" native-type="submit" @click="moveToLogin">
        回到登入畫面
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showSuccessToast} from 'vant';

const router = useRouter();
const route = useRoute();

const username = ref('');
const userAccount = ref('');
const userPassword = ref('');
const checkPassword = ref('');

// 轉跳到登入畫面
const moveToLogin = () => {
  router.push('/user/login')
}

const onSubmit = async () => {
  const res = await myAxios.post('/user/register', {
    username: username.value,
    userAccount: userAccount.value,
    userPassword: userPassword.value,
    checkPassword: checkPassword.value,
  })
  if (res.code === 0 && res.data) {
    // 註冊成功轉跳到登入畫面
    router.push({
      path: '/user/login',
      replace: true,
    });
    showSuccessToast('註冊成功');
  } else {
    showSuccessToast('註冊失敗' + (res.description ? `， ${res.description}` : ''));
  }
};

</script>

<style scoped>

</style>