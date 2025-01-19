/*
 * 使用者類別
 */
export type UserType = {
    id: number;
    username: string;
    userAccount: string;
    avatarUrl?: string;
    profile?: string;
    gender: number;
    phone: string;
    email: string;
    userStatus: number;
    tags: string;
    createTime: Date;
};