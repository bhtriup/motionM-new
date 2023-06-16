class MotionM {
  mappingUserDetail(info) {
    let onlineStatus = 'display: none;';
    if (info.userId === userInfo.userId) {
      onlineStatus = '';
    }

    let imgUrl = '/media/pf-dummy02.png';
    if (info.profile) {
      imgUrl = `data:image/png;base64,${info.profile}`;
    }

    let html = `
        <div class="member_tr" onclick="chatUser('${info.userId}')" data-user-id="${info.userId}">
          <div class="profile-img">
              <figure>
                  <img src="${imgUrl}" alt=""/>
              </figure>
              <span class="online-state" style="${onlineStatus}"></span>
          </div>
          <div class="profile-info">
              <p class=pb-2>${info.userNm}</p>
              <span>${info.job}</span>
          </div>
        </div>
    `;
    return html;
  }
}
