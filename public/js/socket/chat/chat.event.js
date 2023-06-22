/**
 * 메시지 전송
 */
function sendMsg(data) {
  socket.emit('send-msg', data);
}

socket.on('get-msg', function (data) {
  processGetMsg(data);
});
