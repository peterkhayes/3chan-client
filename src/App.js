// @flow

import React from 'react';
import qs from 'query-string';
import CHATS, { type Chat } from './chats';
import AVATARS from './avatars';
import USERNAMES from './usernames';
import Message from './Message';
import Sidebar from './Sidebar';
import * as styles from './styles';

type State = {
  chats: Array<Chat>,
  time: number,
}

const initialTime = qs.parse(window.location.search).time || 0;
const stateForTime = (time: number): State => ({
  chats: CHATS.filter((chat) => chat.timestamp <= time),
  time: time,
});

const ROOT_STYLE = {
  paddingTop: styles.gridSize(),
  fontFamily: styles.fonts.serious,
  color: styles.colors.dark,
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  backgroundColor: styles.colors.light,
};

const MESSAGE_LIST_STYLE = {
  marginLeft: styles.sidebarWidth,
  paddingLeft: styles.gridSize(),
  flexGrow: 1,
  flexDirection: 'column',
  overflowY: 'auto',
}

export default class App extends React.Component<{}, State> {
  _messageListEl: ?HTMLDivElement;
  
  state = stateForTime(0)

  componentDidMount() {
    setInterval(this.incrementTime, 1500);
  }

  componentDidUpdate() {
    if (this._messageListEl) {
      this._messageListEl.scrollTop = this._messageListEl.scrollHeight;
    }
  }

  _setMessageListEl = (el: ?HTMLDivElement) => {
    this._messageListEl = el;
  };

  incrementTime = () => {
    const newTime = this.state.time + 1;
    this.setState(stateForTime(newTime));
  };

  render() {
    return (
      <div style={ROOT_STYLE}>
        <Sidebar topic="Furries" />
        <div ref={this._setMessageListEl} style={MESSAGE_LIST_STYLE}>
          {this.state.chats.map((chat, idx) => (
            <Message
              key={idx}
              avatar={AVATARS[idx * 157 % AVATARS.length]}
              username={USERNAMES[idx * 237 % USERNAMES.length]}
              message={chat.message}
            />
          ))}
        </div>
      </div>
    )
  }
}