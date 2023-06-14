class User extends MotionM {
  constructor() {
    super();
  }

  getUserDetailInfo() {
    let _this = this;
    let userInfo = this.getUserInfo();

    $.ajax({
      url: `/user/${userInfo.userId}`,
      type: 'GET',
      dataType: 'html',
      async: true,
      headers: getHeader(ykiho, '', userInfo.token),
      success: (data) => {
        let _data = JSON.parse(data);
        _this.printUserDetail(_data);
      },
      error: (error) => {
        // console.log('error');
        console.log(error);
        // alert('로그인에 실패했습니다.');
      },
    });
  }

  printUserDetail(info) {
    let html = this.mappingUserDetail(info);

    $('#cont-user-info').html(html);
  }

  logout() {
    let userInfo = this.getUserInfo();

    $.ajax({
      url: `/auth/logout`,
      type: 'GET',
      dataType: 'html',
      async: true,
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
      success: (data) => {},
      error: (error) => {
        // console.log('error');
        console.log(error);
        // alert('로그인에 실패했습니다.');
      },
    });
  }
}
