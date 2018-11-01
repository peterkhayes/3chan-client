// @flow
import React from 'react';
import * as styles from './styles';

type Props = {
  avatar: string,
  username: string,
  message: string,
  image: ?string,
  imageTitle: ?string,
  onLoad: () => void,
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

const attachmentStyle = {
  marginTop: styles.gridSize(),
  padding: styles.gridSize(2),
  display: 'inline-block',
  border: styles.border,
  backgroundColor: styles.colors.light,
  borderRadius: styles.gridSize(0.5),
  width: 300,
};

const imageStyle = {
  width: '100%',
  minHeight: 250,
  borderRadius: styles.gridSize(0.5),
}

const imageTitleStyle = {
  fontWeight: 600,
  fontSize: 16,
  marginBottom: styles.gridSize(2),
  // color: 'white',
}

export default class Message extends React.PureComponent<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { avatar, username, message, image, imageTitle, onLoad } = this.props;
    return (
      <div style={rootStyle}>
        <div style={{...avatarStyle, backgroundImage: `url("${avatar}")`}} />
        <div style={messageStyle}>
          <div style={usernameStyle}>{username}</div>
          <div>{message}</div>
          {image && (
            <div style={attachmentStyle}>
              {imageTitle && <div style={imageTitleStyle}>{imageTitle}</div>}
              <img src={image} style={imageStyle} onLoad={onLoad} />
            </div>
          )}
        </div>
      </div>
    )
  }
}