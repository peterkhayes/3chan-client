// @flow
import type { Message } from './types';
import React from 'react';
import * as styles from './styles';

import { participantUsername } from './users';
import moderatorAvatar from './moderator/avatar.png';


type Props = Message & {
  onLoad: () => void,
};

const rootStyle = {
  display: 'flex',
  flexDirection: 'row',
  padding: `${styles.gridSize(0.5)}px ${styles.gridSize()}px`,
};

const usernameStyle = {
  fontFamily: styles.fonts.fun,
  fontWeight: 600,
};

const avatarContainerStyle = {
  display: 'inline-block',
  backgroundColor: 'white',
  marginRight: styles.gridSize(),
  marginTop: styles.gridSize(0.25),
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
  wordBreak: 'break-all',
};

const moderatorStyle = {
  fontWeight: 600,
  backgroundColor: styles.colorsWithOpacity.medium(0.1),
};

const atMentionStyle = {
  color: styles.colors.blue,
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
  maxHeight: 300,
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

    const isUserMessage = username === participantUsername;
    const _usernameStyle = {
      ...usernameStyle,
      color: isUserMessage ? styles.colors.blue : styles.colors.dark,
    }

    const textElems = text
      .split('\n')
      .map((line, i) => {
        const words = line.split(" ");
        const wordSpans = words.map((word, j) =>
          word.startsWith("@")
            ? <span key={j} style={atMentionStyle}>{word}{' '}</span>
            : `${word} `
        )
        return (
          <div key={i} style={textStyle}>
            {!line ? <span>&nbsp;</span> : wordSpans}   
          </div>
        )
      })

    return (
      <div style={rootStyle}>
        <div style={avatarContainerStyle}>
          <div style={{...avatarStyle, backgroundImage: `url("${avatarToUse}")`}} />
        </div>
        <div style={messageStyle}>
          <div style={_usernameStyle}>{attribution}</div>
          {textElems}
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
