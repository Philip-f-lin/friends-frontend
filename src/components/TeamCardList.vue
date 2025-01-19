<template>
  <div id="teamCardList">
    <van-card
        v-for="team in props.teamList"
        :thumb="teamIcon"
        :desc="team.description"
        :title="`${team.name}`"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px">
          {{ teamStatusEnum[team.status] }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{ `隊伍人數：${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div>
          {{ `創建時間： ` + team.createTime }}
        </div>
      </template>
      <template #footer>
        <van-button size="small" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                    @click="preJoinTeam(team)">
          加入隊伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" plain
                    @click="doUpdateTeam(team.id)">編輯隊伍
        </van-button>
        <!-- 只有加入隊伍的人可以看見 -->
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="small" plain
                    @click="doQuitTeam(team.id)">退出隊伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="small" plain type="danger"
                    @click="doDeleteTeam(team.id)">解散隊伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="請輸入密碼" show-cancel-button @confirm="doJoinTeam"
                @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="請輸入密碼"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team.ts";
import teamIcon from "../assets/teamIcon.png"
import myAxios from "../plugins/myAxios";
import {showSuccessToast} from "vant";
import 'vant/es/toast/style';
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";
import {useRouter} from "vue-router";

interface TeamCardListProps {
  teamList: TeamType[];
}

const props = withDefaults(defineProps<TeamCardListProps>(), {
  teamList: [] as TeamType[],
});
//const props = defineProps<TeamCardListProps>();

const showPasswordDialog = ref(false);
const password = ref('')
const joinTeamId = ref();
const currentUser = ref();

const router = useRouter();

onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam()
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}

/**
 * 加入隊伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value,
  });
  if (res.code === 0) {
    showSuccessToast('加入成功');
    doJoinCancel();
  } else {
    showSuccessToast('加入失敗' + (res.message ? `， ${res.message}` : ''));
    doJoinCancel();
  }
}

/**
 * 跳轉至更新隊伍頁面
 * @param id
 */
const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}

/**
 * 退出隊伍
 * @param id
 */
const doQuitTeam = async (id: number) => {
  const res = await myAxios.post('/team/quit', {
    teamId: id
  });
  if (res.code === 0) {
    showSuccessToast('退出成功');
  } else {
    showSuccessToast('退出失敗' + (res.message ? `， ${res.message}` : ''));
  }
}

/**
 * 解散隊伍
 * @param id
 */
const doDeleteTeam = async (id: number) => {
  const res = await myAxios.post('/team/delete', {
    id,
  });
  if (res.code === 0) {
    showSuccessToast('解散成功');
  } else {
    showSuccessToast('解散失敗' + (res.message ? `， ${res.message}` : ''));
  }
}

</script>

<style scoped>
#teamCardList :deep(.van-image__img) {
  height: 130px;
  object-fit: unset;
}

</style>