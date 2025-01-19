<template>
  <van-form @submit="onSubmit">
      <van-field
          v-model="editUser.currentValue"
          :name="editUser.editKey"
          :label="editUser.editName"
          :placeholder="`請輸入${editUser.editName}`"
          :rules="[{ required: true, message: '請輸入修改資訊' }]"
      />
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
</template>

<script setup lang="ts">
import {useRoute, useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showSuccessToast} from "vant";
import 'vant/es/toast/style';
import {getCurrentUser} from "../services/user.ts";

const route = useRoute();
const router = useRouter();

const editUser = ref({
  editKey: route.query.editKey,
  currentValue: route.query.currentValue,
  editName: route.query.editName,
})

const onSubmit = async () => {
  const currentUser = await getCurrentUser();

  if(!currentUser){
    showSuccessToast('使用者未登入');
    return;
  }

  console.log(currentUser, '目前登入使用者')

  const res = await myAxios.post('/user/update', {
    'id': currentUser.id,
    [editUser.value.editKey as string]: editUser.value.currentValue,
  })
  console.log(res, '更新結果');
  if (res.code === 0 && res.data > 0){
    showSuccessToast('修改成功');
    router.back();
  }else {
    showSuccessToast('修改失敗');
  }
};

</script>

<style scoped>

</style>