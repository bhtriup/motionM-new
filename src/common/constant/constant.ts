let mInfo = {
  ykiho: '',
  type: '',
};

const DB_TYPE = {
  user: '0',
  chat: '5',
};

enum OnlineStatusCode {
  OFF,
  On,
}

enum ResponseCode {
  OK,
  FAIL,
  ERROR,
}

export { OnlineStatusCode, ResponseCode, mInfo, DB_TYPE };
