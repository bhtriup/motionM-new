let userClass;
let roomClass;
let chatClass;

const userInfo = getUserInfo();

$(() => {
  userClass = new User(userInfo);
  roomClass = new Room(userInfo, roomIdx);
  chatClass = new Chat(userInfo, roomIdx);

  // 소켓 파일 호출
  loadJS('/js/socket/chat/chat.event.js');

  // 채팅방 정보
  getChatInfo();

  $('#msg-box').on('keydown', function (event) {
    if (event.keyCode == 13)
      if (!event.shiftKey) {
        event.preventDefault();
        const msg = $(this).val();
        if (!msg) return false;

        chatClass.sendMsg(msg);
        $(this).val('');
      }
  });

  setInterval(processMsgRead, 1000);
});

/**
 * 채팅방 정보
 */
async function getChatInfo() {
  const isMyRoom = await roomClass.isMyRoom();

  if (isMyRoom == false) {
    location.href = FRONT_URL + '/login';
  }

  await roomClass.processMsgRead();

  // 방에 접속한 마지막 시간
  await roomClass.updateLastEnterDt();

  // 방 정보
  await roomClass.getRoomInfo();

  // 방에 있는 유저들
  chatClass.userList = await userClass.getUserListInRoom(
    userClass.getUserIds(roomClass.roomInfo.users),
  );

  // 채팅 목록
  await chatClass.getChatList();
}

async function processMsgRead() {
  // 포커스를 가지고 있다면 읽음 처리
  if (document.hasFocus()) {
    const list = await roomClass.processMsgRead();

    list.forEach((item) => {
      chatClass.mappingChatRead(item);
    });
  }
}

async function processGetMsg(data) {
  await chatClass.printChatList([data]);

  await processMsgRead();
}
