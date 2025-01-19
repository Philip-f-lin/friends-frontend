<template>
  <template v-if="user">
    <van-cell title="使用者" :value="user?.username" />
    <van-cell title="修改訊息" is-link to="/user/update" />
    <van-cell title="我創建的隊伍" is-link to="/user/team/create" />
    <van-cell title="我加入的隊伍" is-link to="/user/team/join" />
  </template>
</template>

<script setup lang="ts">
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import 'vant/es/toast/style';
import {getCurrentUser} from "../services/user.ts";

const user = ref();

const router = useRouter();

onMounted(async () => {
  user.value = await getCurrentUser();
})

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