import React from 'react';
import { UserConsumer } from '../../context/UserContext';

class UserMenu extends React.Component {
  state = {
    menuVisible: false
  };

  avatarRef = React.createRef();

  componentDidMount() {
    document.addEventListener('click', this.hideMenu);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.hideMenu);
  }

  hideMenu = e => {
    // Ignore clicks on the avatar
    // so that the menu can open
    if (e.target !== this.avatarRef.current) {
      this.setState({ menuVisible: false });
    }
  };

  toggleMenu = () => {
    this.setState(state => ({
      menuVisible: !state.menuVisible
    }));
  };

  render() {
    return (
      <UserConsumer>
        {({ user, onLogout }) => (
          <div className="UserMenu">
            <h2
                onClick={this.toggleMenu}
                ref={this.avatarRef}
            > 
              { user.username } 
            </h2>
            {this.state.menuVisible && (
              <ul>
                <li onClick={onLogout}>Logout</li>
              </ul>
            )}
          </div>
        )}
      </UserConsumer>
    );
  }
}

export default UserMenu;
