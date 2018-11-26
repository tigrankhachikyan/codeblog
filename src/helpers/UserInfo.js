export default class UserInfo {
 /* 
 * @param {firebase.auth.Auth} auth 
 * @param {Object} userSettings 
 */
  constructor(auth, userSettings) {
    this.displayName = auth.displayName;
    this.email = auth.email;
    this.photoUrl = auth.photoURL;
    this.userName = userSettings.USER_NAME;
  }

  userInfo() {
    return {...this};
  }
}