url += '/user';

const socket = io.connect(url, {
  secure: true,
  transports: ['websocket'],
  auth: {
    ykiho: userInfo.ykiho,
  },
});

socket.on('connect', () => {
  console.log('connected!');
  // reqUpdateFriendList();
});

socket.on('disconnect', () => {
  console.log('disconnected...');
  logout();
});

socket.on('error', (err) => {
  console.log(`에러 발생 : ${error}`);
});

socket.on('connect_error', (err) => {
  console.log(`connect error du to ${err.message}`);
});

// -------------------------------------------------------------------------

function reqUpdateFriendList() {
  socket.emit('req-udt-friend-list');
}

socket.on('udt-friend-list', function (data) {
  friendLogin();
});
