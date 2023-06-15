/**
 * 로그인 처리
 */
function setOnline(userId) {
  socket.emit('req-set-online', { userId });
}

socket.on('set-online', function (data) {
  friendClass.setFriendOnlineStatus(data);
});
////////////////////////////////////////
/**
 * 로그인 사용자 목록
 */
function reqOnlineUserList() {
  socket.emit('req-online-user-list');
}

socket.on('online-user-list', function (data) {
  console.log(data);
});

/////////////////////////////////////////
// 로그인 처리
// setOnline(userInfo.userId);
//
// // 로그인 사용자 목록
// reqOnlineUserList();
