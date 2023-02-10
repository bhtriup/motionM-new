export interface UserData {
  idx: number;
  userId: string;
  userNm: string;
  token: string;
}

export interface UserRO {
  user: UserData;
}
