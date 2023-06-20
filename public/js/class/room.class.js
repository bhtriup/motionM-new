class Room {
  constructor(userInfo, roomIdx) {
    this.roomIdx = roomIdx;
    this.userInfo = userInfo;
    this.roomInfo = {};
    this.userList = [];
  }

  async getRoomList() {
    let userInfo = this.userInfo;

    let response = await fetch(`/room/list`, {
      headers: getHeader(userInfo.ykiho, MSG_DB_TYPE, userInfo.token),
    });

    let data = await response.json();

    this.printRoomList(data);
  }

  printRoomList(list) {
    let html = '';

    list.forEach((item) => {
      html += this.mappingRoomList(item);
    });

    $('#chat-room-list').prepend(html);
  }

  mappingRoomList(item) {
    const today = getToday();
    let lastMsgTime = getDateTime(item.lastMsgTime, 'date');

    if (today == lastMsgTime)
      lastMsgTime = getDateTime(item.lastMsgTime, 'time');

    let imgUrl = '/media/pf-dummy02.png';

    let isCountVisible = '';
    if (item.unreadCount == 0) isCountVisible = ' display: none; ';

    let chatNm = item.chatNm;
    if (item.userCount > 2) chatNm += `(${item.userCount})`;

    let html = `
        <li class="member_tr list__ chat__">
            <a href="/front/room/${item.idx}" title="">
                <div class="profile-img">
                    <div class="three box__">
                        <p><img src="${imgUrl}" alt=""/></p>
                        <p><img src="${imgUrl}" alt=""/></p>
                        <p><img src="${imgUrl}" alt=""/></p>
                    </div>
<!--                    <span class="online-state"></span>-->
                </div>
                <div class="profile-info">
                    <p class=pb-2>${chatNm}</p>
                    <span>${item.lastMsg}</span>
                </div>
                <div class="date_info">
                    <p class="date">${lastMsgTime}</p>
                    <span class="chat_num" style="${isCountVisible}">${item.unreadCount}</span>
                </div>
            </a>
        </li>
    `;
    return html;
  }

  async isMyRoom() {
    let userInfo = this.userInfo;
    const roomIdx = this.roomIdx;

    let response = await fetch(`/room/check/${roomIdx}`, {
      headers: getHeader(userInfo.ykiho, MSG_DB_TYPE, userInfo.token),
    });

    let data = await response.json();

    return data;
  }

  /**
   * 채팅방 정보
   */
  async getRoomInfo() {
    let userInfo = this.userInfo;
    const roomIdx = this.roomIdx;

    let response = await fetch(`/room/${roomIdx}`, {
      headers: getHeader(userInfo.ykiho, MSG_DB_TYPE, userInfo.token),
    });

    let data = await response.json();
    this.roomInfo = data;

    this.printRoomInfo(data);
  }

  printRoomInfo(data) {
    let chatNm = data.chatNm;
    if (data.userCount > 2) chatNm += `(${data.userCount})`;

    $('#room-info .room-name').text(chatNm);
    $('#room-info .room-user-count').text(data.userCount);
  }

  async processMsgRead() {
    const roomIdx = this.roomIdx;

    await fetch(`/chat/read/${roomIdx}`, {
      method: 'POST',
      headers: getHeader(userInfo.ykiho, MSG_DB_TYPE, userInfo.token),
    });
  }
}
