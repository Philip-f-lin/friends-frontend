<template>
  <div id = "teamAddPage">
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            v-model="addTeamData.name"
            name="name"
            label="隊伍名稱"
            placeholder="請輸入隊伍名稱"
            :rules="[{ required: true, message: '請輸入隊伍名稱' }]"
        />
        <van-field
            v-model="addTeamData.description"
            rows="4"
            autosize
            label="隊伍簡介"
            type="textarea"
            placeholder="請輸入隊伍簡介"
        />
        <van-field name="stepper" label="最大人數">
          <template #input>
            <van-stepper v-model="addTeamData.maxNum" max = "10" min = "2"/>
          </template>
        </van-field>
        <van-field name="radio" label="隊伍狀態">
          <template #input>
            <van-radio-group v-model="addTeamData.status" direction="horizontal">
              <van-radio name="0">公開</van-radio>
              <van-radio name="1">私人</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field
            v-if="Number(addTeamData.status) === 1"
            v-model="addTeamData.password"
            type="password"
            name="password"
            label="密碼"
            placeholder="請輸入密碼"
            :rules="[{ required: true, message: '請輸入密碼' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script setup lang="ts">

import {useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showSuccessToast} from "vant";

const router = useRouter();

const initFormData = {
  "name": "",
  "description": "",
  "maxNum": 3,
  "password": "",
  "status": 0,
}

// 需要讓使用者填寫的表單資料
const addTeamData = ref({...initFormData})

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  const res = await myAxios.post("/team/add", postData);
  if(res?.code === 0 && res.data){
    showSuccessToast('新增成功');
    router.push({
      path: '/team',
      replace: true,
    });
  }else {
    showSuccessToast('新增失敗' + (res.description ? `， ${res.description}` : ''));
  }
}
</script>

<style scoped>

</style>