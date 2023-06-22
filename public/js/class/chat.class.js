class Chat {
  constructor(userInfo) {
    this.roomIdx = roomIdx;
    this.userInfo = userInfo;
    this.page = 1;

    this.userList = [];
  }

  async getChatList() {
    const roomIdx = this.roomIdx;

    let response = await fetch(
      `/chat/list?roomIdx=${roomIdx}&page=${this.page}`,
      {
        headers: getHeader(userInfo.ykiho, MSG_DB_TYPE, userInfo.token),
      },
    );

    let list = await response.json();

    this.printChatList(list, 'top');
  }

  async printChatList(list, position) {
    const userInfo = this.userInfo;

    list.forEach((item) => {
      let html = '';

      const chatUserInfo = _.find(this.userList, { userId: item.userId });

      if (item.userId != userInfo.userId)
        html += this.mappingChatLeft(item, chatUserInfo);
      else html += this.mappingChatRight(item, chatUserInfo);

      if (position == 'top') $('#chat-list').prepend(html);
      else $('#chat-list').append(html);
    });
  }

  mappingChatLeft(item, chatUserInfo) {
    const sendDt = getDateTime(item.sendDt, 'time-no-sec');

    let imgUrl = '/media/pf-dummy02.png';
    if (chatUserInfo.profile) {
      imgUrl = `data:image/png;base64,${chatUserInfo.profile}`;
    }

    let html = `
      <div class="chat-item chatting-left" data-msg-idx="${item.idx}">
        <div class="_img-wrap">
            <a href="#">
                <img src="${imgUrl}" alt="">
            </a>
        </div>
        <div class="_txt-wrap">
            <div class="name-txt">
                <span>${item.userId}</span>
            </div>
            <ul class="chat-txt-width">
                <li class="chat-txt-box">
                    <p>${item.msg}</p>
                    <div class="reading-time-wrap">
                        <span>읽음 <span class="read-count">${item.readCount}</span><b><img src="/media/i-read.png" alt=""></b></span>
                        <span>${sendDt}</span>
                    </div>
                </li>
            </ul>
        </div>
    </div>
    `;

    return html;
  }

  mappingChatRight(item, chatUserInfo) {
    const sendDt = getDateTime(item.sendDt, 'time-no-sec');

    let html = `
      <div class="chat-item chatting-right" data-msg-idx="${item.idx}">
          <ul class="chat-txt-width">
              <li class="chat-txt-box">
                  <div class="reading-time-wrap">
                      <span><b><img src="/media/i-read.png" alt=""></b> 읽음 <span class="read-count">${item.readCount}</span></span>
                      <span>${sendDt}</span>
                  </div>
                  <p>${item.msg}</p>
              </li>
          </ul>
      </div>
    `;

    return html;
  }

  mappingChatRead(item) {
    $(`.chat-item[data-msg-idx=${item.msgIdx}] .read-count`).text(item.count);
  }

  async sendMsg(msg) {
    const { token, userId } = this.userInfo;
    const roomIdx = this.roomIdx;
    sendMsg({ roomIdx, userId, msg });
  }
}
