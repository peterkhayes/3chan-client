// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  avatar: string,
  username: string,
  message: string,
  image: ?string,
};

const rootStyle = {
  display: 'flex',
  flexDirection: 'row',
  marginBottom: styles.gridSize(),
};

const usernameStyle = {
  fontFamily: styles.fonts.fun,
  fontWeight: 600,
};

const avatarStyle = {
  backgroundColor: 'white',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  marginRight: styles.gridSize(),
  width: 48,
  height: 48,
}

const messageStyle = {
  flex: '1 1 0',
};

const imageStyle = {
  maxHeight: 300,
}

export default class Message extends React.PureComponent<Props> {
  render() {
    const { avatar, username, message, image } = this.props;
    return (
      <div style={rootStyle}>
        <div style={{...avatarStyle, backgroundImage: `url("${avatar}")`}} />
        <div style={messageStyle}>
          <div style={usernameStyle}>{username}</div>
          {message}
          <img src={image} style={imageStyle} />
        </div>
      </div>
    )
  }
}