/**
 * 로그인 처리
 */
function sendMsg(data) {
  // console.log(data);
  socket.emit('send-msg', data);
}

socket.on('get-msg', function (data) {
  chatClass.printChatList([data]);
});
