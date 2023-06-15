class User extends MotionM {
  constructor(userInfo) {
    super();

    this.userInfo = userInfo;
  }

  async getUserDetailInfo() {
    let userInfo = this.userInfo;

    let response = await fetch(`/user/info`, {
      headers: getHeader(userInfo.ykiho, '', userInfo.token),
    });

    let data = await response.json();

    this.printUserDetail(data);
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
