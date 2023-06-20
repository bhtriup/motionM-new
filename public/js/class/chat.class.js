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

    this.printChatList(list);
  }

  async printChatList(list) {
    const userInfo = this.userInfo;
    let html = '';

    list.forEach((item) => {
      const chatUserInfo = _.find(this.userList, { userId: item.userId });

      if (item.userId != userInfo.userId)
        html += this.mappingChatLeft(item, chatUserInfo);
      else html += this.mappingChatRight(item, chatUserInfo);
    });

    $('#chat-list').prepend(html);
  }

  mappingChatLeft(item, chatUserInfo) {
    const sendDt = getDateTime(item.sendDt, 'time-no-sec');

    let imgUrl = '/media/pf-dummy02.png';
    if (chatUserInfo.profile) {
      imgUrl = `data:image/png;base64,${chatUserInfo.profile}`;
    }

    let html = `
      <div class="chatting-left">
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
                        <span>읽음 20 <b><img src="/media/i-read.png" alt=""></b></span>
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
      <div class="chatting-right">
          <ul class="chat-txt-width">
              <li class="chat-txt-box">
                  <div class="reading-time-wrap">
                      <span><b><img src="/media/i-read.png" alt=""></b> 읽음 20</span>
                      <span>${sendDt}</span>
                  </div>
                  <p>${item.msg}</p>
              </li>
          </ul>
      </div>
    `;

    return html;
  }

  async sendMsg(msg) {
    const { token, userId } = this.userInfo;
    // console.log(this.userInfo);
    // console.log(msg);
    sendMsg({ userId, msg });
  }
}
