class Friend extends MotionM {
  constructor() {
    super();
  }

  getFriendList() {
    let _this = this;
    let userInfo = this.getUserInfo();

    $.ajax({
      url: `/friend/list`,
      type: 'GET',
      dataType: 'html',
      async: true,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      success: (data) => {
        let _data = JSON.parse(data);
        _this.printFriendListDetail(_data);
      },
      error: (error) => {
        // console.log('error');
        console.log(error);
        // alert('로그인에 실패했습니다.');
      },
    });
  }
  printFriendListDetail(list) {
    let _this = this;
    let html = '';

    list.forEach((item) => {
      html += _this.mappingUserDetail(item);
    });
  }
}
