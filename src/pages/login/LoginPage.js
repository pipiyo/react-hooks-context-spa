import React, {useState}  from 'react';

import { getUser } from '../../api/api';
import { UserConsumer } from '../../context/UserContext';

function useLogin() {
  const [
      state, 
      setState
  ] = useState({
    error: null,
    loading: false,
    username: '',
    password: ''
  });

  const onStateChange = ({ index, value }) => setState({
    ...state,
    [index]: value
  });

  return {
    state,
    onStateChange
  };
}

function LoginPage() {

  const {     
    state,
    onStateChange 
  } = useLogin();

  const handleInputChange = evt => {
    evt.preventDefault();
    onStateChange({
      index: [evt.target.name],
      value: evt.target.value
    });
  };

  const handleSubmit = async(evt, onLogin) => {
    evt.preventDefault();

    onStateChange({
      index: 'loading',
      value: true
    });
    onStateChange({
      index: 'error',
      value: null
    });

      try {
        const result = await getUser({ username: state.username, email: state.password });
        onStateChange({
          index: 'loading',
          value: false
        });
        if (result.length === 0) {
          onStateChange({
            index: 'error',
            value: {
              message: 'User or Password Incorrect',
            }
          });
        } else {
          onLogin(result[0]);
        }
      } catch (error) {
        onStateChange({
          index: 'loading',
          value: false
        });
        onStateChange({
          index: 'error',
          value: error
        });
      }
  };

    const { username, password, error, loading } = state;

    return (
      <UserConsumer>
        {({ onLogin }) => (
          <div className="LoginPage">
            <form onSubmit={(evt) => handleSubmit(evt, onLogin) }>
              <h1> UMBRELLACORP </h1>
              <label>
                Sing in whit email
                <input
                  name="username"
                  value={username}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Password
                <input
                  name="password"
                  type="password"
                  value={password}
                  onChange={handleInputChange}
                />
              </label>
              {error && <div className="error">{error.message}</div>}
              <button type="submit" disabled={loading}>
                Sign In
              </button>
            </form>
          </div>
        )}
      </UserConsumer>
    );
  
}

export default LoginPage;
