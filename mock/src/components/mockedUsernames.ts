interface UserData {
  username: string;
  password: string;
}
/**
 * Collection of username/password pairs to be used in login authentication
 */
const mockedUserData: UserData[] = [
  { username: 'my', password: 'dog' },
  { username: 'cool', password: 'bro' },
  { username: 'the', password: 'boss' },
  { username: '', password: ''}, /* empty username/password fields will grant
  access right now to any user, meaning submit button alone with no input
  will suffice to login */
];

export default mockedUserData;