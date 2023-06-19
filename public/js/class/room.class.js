class Room {
  constructor(userInfo) {
    this.userInfo = userInfo;
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

    let html = `
        <li class="member_tr list__ chat__">
            <a href="/front/room/${item.idx}" title="">
                <div class="profile-img">
                    <figure>
                        <img src="${imgUrl}" alt=""/>
                    </figure>
<!--                    <span class="online-state"></span>-->
                </div>
                <div class="profile-info">
                    <p class=pb-2>${item.chatNm}</p>
                    <span>${item.lastMsg}</span>
                </div>
                <div class="date_info">
                    <p class="date">${lastMsgTime}</p>
                    <span class="chat_num">${item.unreadCount}</span>
                </div>
            </a>
        </li>
    `;
    return html;
  }
}
