class Chat {
  constructor(userInfo) {
    this.userInfo = userInfo;
  }

  async isMyRoom(roomIdx) {
    let userInfo = this.userInfo;

    let response = await fetch(`/room/${roomIdx}`, {
      headers: getHeader(userInfo.ykiho, MSG_DB_TYPE, userInfo.token),
    });

    let data = await response.json();

    return data;
  }
}
