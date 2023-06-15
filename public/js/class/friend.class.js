class Friend extends MotionM {
  constructor(userInfo) {
    super();

    this.userInfo = userInfo;
  }

  getFriendList() {
    let _this = this;
    let userInfo = this.userInfo;

    $.ajax({
      url: `/user/list`,
      type: 'GET',
      dataType: 'html',
      async: true,
      headers: getHeader(userInfo.ykiho, '', userInfo.token),
      success: (data) => {
        let _data = JSON.parse(data);
        _this.saveFriendList(_data);
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

    $('#cont-profile-list').html(html);
  }

  setFriendOnlineStatus(list) {
    $('#cont-profile-list .online-state').hide();

    this.friendList.forEach((item) => {
      if (list.includes(item.userId)) {
        $(`.member_tr[data-user-id='${item.userId}']`).show();
      }
    });
  }

  saveFriendList(list) {
    this.friendList = list;
  }

  searchFriend(val) {
    let list = _.filter(this.friendList, (item) => {
      return item.userNm.indexOf(val) !== -1;
    });

    this.printFriendListDetail(list);
  }
}
