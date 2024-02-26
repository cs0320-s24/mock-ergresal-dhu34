import { Dispatch, SetStateAction, useState } from 'react';
import mockedUserData from './mockedUsernames';


interface loginProps {
  isLoggedIn: boolean
  setIsLoggedIn: Dispatch<SetStateAction<boolean>>
}

export function LoginButton(props: loginProps) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errormessage, seterrormessage] = useState('');

  const authenticate = () => {
    const user = mockedUserData.find(user => user.username === username);
    // if (!user || user.password !== password) {
    //   seterrormessage('Invalid username or password');
    //   return;
    // }
    const newValue = !props.isLoggedIn
    props.setIsLoggedIn(newValue)
    return newValue
  }

  if (props.isLoggedIn) {
    return (
      <button aria-label='Sign Out' onClick={authenticate}>Sign out</button>
    )
  } else {
    return (
      <div>
      <input
        type="text"
        placeholder="Enter username: "
        value={username}
        onChange={(event) => setUsername(event.target.value)}
      />
      <input
        type="text"
        placeholder="Enter password: "
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
      <p style={{ color: 'red' }}>{errormessage}</p>
      <button aria-label='Login' onClick={authenticate}>Login</button>
    </div>
    )
  }
}