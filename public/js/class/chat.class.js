class Chat {
  constructor(userInfo) {
    this.userInfo = userInfo;
    this.page = 1;
  }

  async getChatList(roomIdx) {
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
    let html = '';

    list.forEach((item) => {
      html += this.mappingChat(item);
    });

    $('#chat-list').prepend(html);
  }

  mappingChat(item) {
    const sendDt = getDateTime(item.sendDt, 'time-no-sec');

    let imgUrl = '/media/pf-dummy02.png';

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
}
