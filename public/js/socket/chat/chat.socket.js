url += '/chat';

const socket = io.connect(url, {
  secure: true,
  transports: ['websocket'],
  auth: {
    roomIdx: roomIdx,
  },
});

socket.on('connect', () => {
  console.log('connected!');
});

socket.on('disconnect', () => {
  console.log('disconnected...');
});

socket.on('error', (err) => {
  console.log(`에러 발생 : ${err}`);
});

socket.on('connect_error', (err) => {
  console.log(`connect error du to ${err.message}`);
});
