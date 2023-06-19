let chatClass;

const userInfo = getUserInfo();

$(() => {
  chatClass = new Chat(userInfo);

  // 소켓 파일 호출
  // loadJS('/js/socket/friend/friend.event.js');

  getRoomList();
});

/**
 * 채팅방 정보
 */
async function getChatInfo() {
  const isMyRoom = await chatClass.isMyRoom(roomIdx);

  if (isMyRoom == false) {
    location.href = FRONT_URL + '/login';
  }
}
