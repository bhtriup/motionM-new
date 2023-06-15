class Friend extends MotionM {
  constructor(userInfo) {
    super();

    this.userInfo = userInfo;
  }

  async getFriendList() {
    let userInfo = this.userInfo;

    let response = await fetch(`/user/list`, {
      headers: getHeader(userInfo.ykiho, '', userInfo.token),
    });

    let data = await response.json();

    this.saveFriendList(data);
    this.printFriendListDetail(data);
  }

  printFriendListDetail(list) {
    let _this = this;
    let html = '';

    list.forEach((item) => {
      html += _this.mappingUserDetail(item);
    });

    $('#cont-profile-list').html(html);
  }

  setFriendOnlineStatus(data) {
    const list = data.list;

    $('#cont-profile-list .online-state').hide();

    this.friendList.forEach((item) => {
      if (list.includes(item.userId)) {
        $(`.member_tr[data-user-id='${item.userId}'] .online-state`).show();
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
