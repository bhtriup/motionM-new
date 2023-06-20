let roomClass;
let chatClass;

const userInfo = getUserInfo();

$(() => {
  roomClass = new Room(userInfo);
  chatClass = new Chat(userInfo);

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
});

/**
 * 채팅방 정보
 */
async function getChatInfo() {
  const isMyRoom = await roomClass.isMyRoom(roomIdx);

  if (isMyRoom == false) {
    location.href = FRONT_URL + '/login';
  }

  await roomClass.getRoomInfo(roomIdx);

  await chatClass.getChatList(roomIdx);

  // 소켓통신 종료 후 마지막 입장 시간 저장
}
