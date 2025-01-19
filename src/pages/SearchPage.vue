<template>
  <form action="/">
    <van-search
        v-model="searchText"
        show-action
        placeholder="請輸入要搜索的標籤"
    />
    <div style="font-size: 16px; font-weight: bold; color: #666; margin-bottom: 12px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
      大家都在搜
    </div>
    <!-- 常用標籤 -->
    <div style="margin: 12px 0; display: flex; flex-wrap: wrap; gap: 8px;">
      <van-tag
          v-for="tag in commonTags"
          :key="tag"
          type="primary"
          size="medium"
          style="padding: 6px 12px; font-size: 14px; background-color: #f0f8ff; color: #007aff; border-radius: 20px; box-shadow: 0 2px 6px rgba(0, 123, 255, 0.2); cursor: pointer; text-align: center;"
          @click="onCommonTagClick(tag)"
      >
        {{ tag }}
      </van-tag>
    </div>
  </form>
  <div style="padding: 12px">
    <van-button block type="primary" @click="doSearchResult">搜尋</van-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from "vue-router";
const router = useRouter();

const searchText = ref('');

// 常用標籤
const commonTags = ref(['Java', 'Python', 'SQL', 'JavaScript', 'C++']);

// 處理常用標籤點擊事件
const onCommonTagClick = (tag: string) => {
  searchText.value = tag; // 更新搜索框值
};

/**
 * 執行搜索
 */
const doSearchResult = () => {
  router.push({
    path: '/user/list',
    query: {
      tags: searchText.value
    }
  })
}
</script>

<style scoped>
</style>
