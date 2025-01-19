<template>
  <div id = "teamUpdatePage">
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

import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showToast} from "vant";
import {TeamType} from "../models/team";

const router = useRouter();
const route = useRoute();

const id = route.query.id;

// 需要讓使用者填寫的表單資料
const addTeamData = ref<TeamType>({})

// 獲取之前的隊伍資訊
onMounted(async () => {
  if(id <= 0){
    showToast('獲取隊伍資訊失敗');
    return;
  }
  const res = await myAxios.get("/team/get", {
    params:{
      id
    }
  });
  if (res?.code === 0){
    addTeamData.value = res.data;
  }else{
    showToast('獲取隊伍資訊失敗，請重新整理');
  }}
)

// 提交
const onSubmit = async () => {
  const postData = {
    ...addTeamData.value,
    status: Number(addTeamData.value.status)
  }
  const res = await myAxios.post("/team/update", postData);
  if(res?.code === 0 && res.data){
    showToast('更新成功');
    router.push({
      path: '/team',
      replace: true,
    });
  }else {
    showToast('更新失敗');
  }
}
</script>

<style scoped>

</style>