class MotionM {
  getUserInfo() {
    let _data = localStorage.getItem('user-info');
    let _user = JSON.parse(_data);

    return _user.user;
  }

  mappingUserDetail(info) {
    let offStatus = '';
    if (info.userStatus === UserStatus.OFF) {
      offStatus = 'display: none;';
    }

    let positionArr = [];
    if (info.team?.codeNm) positionArr.push(info.team.codeNm);
    if (info.part?.codeNm) positionArr.push(info.part.codeNm);
    if (info.position?.codeNm) positionArr.push(info.position.codeNm);

    let html = `
        <div class="profile-img">
            <figure>
                <img src="/media/pf-dummy01.png" alt=""/>
            </figure>
            <span class="online-state" style="${offStatus}"></span>
        </div>
        <div class="profile-info">
            <p class=pb-2>${info.userNm}</p>
            <span>${positionArr.join('/')}</span>
        </div>`;
    return html;
  }
}
