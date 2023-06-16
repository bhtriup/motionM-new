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
    let html = `
        <li class="member_tr list__ chat__">
            <a href="#" title="">
                <div class="profile-img">
                    <figure>
                        <img src="/media/pf-dummy01.png" alt=""/>
                    </figure>
                    <span class="online-state"></span>
                </div>
                <div class="profile-info">
                    <p class=pb-2>${item.chatNm}</p>
                    <span>${item.lastMsg}</span>
                </div>
                <div class="date_info">
                    <p class="date">${item.lastMsgTime}</p>
                    <span class="chat_num">${item.unreadCount}</span>
                </div>
            </a>
        </li>
    `;
    return html;
  }
}
