import React, {useState}  from 'react';

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

    const { username, password, error, loading } = state;

    return (
          <div className="LoginPage">
            <form>
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
    );
  
}

export default LoginPage;
