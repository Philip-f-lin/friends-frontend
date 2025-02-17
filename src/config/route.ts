import Home from "../pages/Home.vue";
import Team from "../pages/TeamPage.vue";
import SearchResultPage from "../pages/SearchResultPage.vue";
import UserEditPage from "../pages/UserEditPage.vue";
import UserLoginPage from "../pages/UserLoginPage.vue";
import TeamAddPage from "../pages/TeamAddPage.vue";
import TeamUpdatePage from "../pages/TeamUpdatePage.vue";
import UserUpdatePage from "../pages/UserUpdatePage.vue";
import UserPage from "../pages/UserPage.vue";
import UserTeamCreatePage from "../pages/UserTeamCreatePage.vue";
import UserTeamJoinPage from "../pages/UserTeamJoinPage.vue";
import UserRegisterPage from "../pages/UserRegisterPage.vue";
import SearchPage from "../pages/SearchPage.vue";


// 定義路由
const routes = [
    {path: '/', component: Home},
    {path: '/team', title:'尋找隊伍', component: Team},
    {path: '/team/add', title:'創建隊伍' ,component: TeamAddPage},
    {path: '/team/update', title:'更新隊伍' ,component: TeamUpdatePage},
    {path: '/user', title:'個人資訊' ,component: UserPage},
    {path: '/search', title:'找朋友' ,component: SearchPage},
    {path: '/user/list', title:'使用者列表' ,component: SearchResultPage},
    {path: '/user/edit', title:'編輯資訊' ,component: UserEditPage},
    {path: '/user/login', title:'登入' ,component: UserLoginPage},
    {path: '/user/register', title:'註冊' ,component: UserRegisterPage},
    {path: '/user/update', title:'更新資訊' ,component: UserUpdatePage},
    {path: '/user/team/join', title:'我加入的隊伍' ,component: UserTeamJoinPage},
    {path: '/user/team/create', title:'我創建的隊伍' ,component: UserTeamCreatePage}
]

export default routes;