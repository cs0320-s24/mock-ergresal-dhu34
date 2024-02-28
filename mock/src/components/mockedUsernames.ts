interface UserData {
  username: string;
  password: string;
}

const mockedUserData: UserData[] = [
  { username: 'my', password: 'dog' },
  { username: 'cool', password: 'bro' },
  { username: 'the', password: 'boss' },
  { username: '', password: ''}, // empty rn will log in
  // Add more user data as needed
];

export default mockedUserData;