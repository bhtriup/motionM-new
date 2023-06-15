class User extends MotionM {
  constructor(userInfo) {
    super();

    this.userInfo = userInfo;
  }

  getUserDetailInfo() {
    let _this = this;
    let userInfo = this.userInfo;

    $.ajax({
      url: `/user/info`,
      type: 'GET',
      dataType: 'html',
      async: true,
      headers: getHeader(userInfo.ykiho, '', userInfo.token),
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
    let userInfo = this.userInfo;

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
