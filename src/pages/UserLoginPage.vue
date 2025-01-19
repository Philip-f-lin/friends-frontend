<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="帳號"
          placeholder="請輸入帳號"
          :rules="[{ required: true, message: '請填寫帳號' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密碼"
          placeholder="請輸入密碼"
          :rules="[{ required: true, message: '請填寫密碼' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showSuccessToast} from "vant";
import 'vant/es/toast/style';

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');

const onSubmit = async () => {
  const res = await myAxios.post('/user/login', {
    userAccount: userAccount.value,
    userPassword: userPassword.value
  })
  console.log(res, '使用者登入');
  if(res.code === 0 && res.data){
    showSuccessToast('登入成功');
    // 跳轉到之前的畫面
    const redirectUrl = route.query?.redirect as string ?? '/';
    window.location.href = redirectUrl;
  }else{
    showSuccessToast('登入失敗');
  }
};


</script>

<style scoped>

</style>