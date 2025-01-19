/*
 * 隊伍類別
 */
import {UserType} from "./user";

export type TeamType = {
    id: number;
    userId: number;
    name: string;
    description: string;
    maxNum: number;
    password?: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser?: UserType;
    hasJoinNum?: number;
};