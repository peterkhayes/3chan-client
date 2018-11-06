// @flow
import type { MessageProps } from './types';
import React from 'react';
import * as styles from './styles';

import moderatorAvatar from './moderator/avatar.png';

type Props = MessageProps & {
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

export default class Message extends React.Component<Props> {
  componentDidMount() {
    this.props.onLoad();
  }

  render() {
    const { avatar, username, isMod, text, image, imageTitle, onLoad } = this.props;
      console.log('props', this.props);
    let avatarToUse, attribution, textStyle;
    if (isMod) {
        avatarToUse = moderatorAvatar;
        attribution = 'MODERATOR';
        textStyle = moderatorStyle;
    } else {
        avatarToUse = avatar;
        attribution = username;
        textStyle = {};
    }
    return (
      <div style={rootStyle}>
        <div style={{...avatarStyle, backgroundImage: `url("${avatarToUse}")`}} />
        <div style={messageStyle}>
          <div style={usernameStyle}>{attribution}</div>
          <div style={textStyle}>{text}</div>
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
