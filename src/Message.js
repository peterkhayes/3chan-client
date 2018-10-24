// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  avatar: string,
  username: string,
  message: string,
};

const ROOT_STYLE = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: styles.gridSize(),
};

const USERNAME_STYLE = {
  fontFamily: styles.fonts.fun,
  fontWeight: 600,
};

const AVATAR_STYLE = {
  backgroundColor: 'white',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  marginRight: styles.gridSize(),
  width: 48,
  height: 48,
}

const MESSAGE_STYLE = {
  flex: '1 1 0',
};

export default class Message extends React.PureComponent<Props> {
  render() {
    const { avatar, username, message} = this.props;
    return (
      <div style={ROOT_STYLE}>
        <div style={{...AVATAR_STYLE, backgroundImage: `url("${avatar}")`}} />
        <div style={MESSAGE_STYLE}>
          <div style={USERNAME_STYLE}>{username}</div>
          {message}
        </div>
      </div>
    )
  }
}