import myAxios from "../plugins/myAxios";
import {setCurrentUserState} from "../states/user.ts";

export const getCurrentUser = async () => {
    /*const currentUser = getCurrentUserState();
    if(currentUser){
        return currentUser;
    }*/
    // 使用者不存在從後端獲取資訊
    const res = await myAxios.get('/user/current');
    if(res.code === 0){
        setCurrentUserState(res.data);
        return res.data;
    }
    return null;
}

