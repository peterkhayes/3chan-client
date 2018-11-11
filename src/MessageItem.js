// @flow
import type { Message } from './types';
import React from 'react';
import * as styles from './styles';

import moderatorAvatar from './moderator/avatar.png';

type Props = Message & {
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

const avatarContainerStyle = {
  display: 'inline-block',
  backgroundColor: 'white',
  marginRight: styles.gridSize(),
  width: 60,
  height: 60,
}

const avatarStyle = {
  color: 'white',
  backgroundPosition: 'center',
  backgroundSize: 'cover',
  width: 60,
  height: 60,
}

const messageStyle = {
  flex: '1 1 0',
};

const moderatorStyle = {
  fontWeight: 600,
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

export default class MessageItem extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { avatar, username, isMod, text, image, imageTitle, onLoad } = this.props;

    let avatarToUse, attribution, textStyle;
    if (isMod) {
        avatarToUse = moderatorAvatar;
        attribution = 'MODERATOR';
        textStyle = moderatorStyle;
    } else {
        avatarToUse = avatar;
        attribution = username;
    }

    return (
      <div style={rootStyle}>
        <div style={avatarContainerStyle}>
          <div style={{...avatarStyle, backgroundImage: `url("${avatarToUse}")`}} />
        </div>
        <div style={messageStyle}>
          <div style={usernameStyle}>{attribution}</div>
          {text.split('\n').map((line, i) => <div key={i} style={textStyle}>{line}</div>)}
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
