let roomClass;

const userInfo = getUserInfo();

$(() => {
  roomClass = new Room(userInfo);

  // 소켓 파일 호출
  // loadJS('/js/socket/friend/friend.event.js');

  getRoomList();
});

/**
 * 채팅방 목록
 */
function getRoomList() {
  roomClass.getRoomList();
}
