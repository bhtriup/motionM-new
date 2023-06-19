let roomClass;
let chatClass;

const userInfo = getUserInfo();

$(() => {
  roomClass = new Room(userInfo);
  chatClass = new Chat(userInfo);

  // 소켓 파일 호출
  // loadJS('/js/socket/friend/friend.event.js');

  // 채팅방 정보
  getChatInfo();
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
