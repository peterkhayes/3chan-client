// @flow

import React from 'react';
import qs from 'query-string';
import CHATS, { type Chat } from './chats';
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
  backgroundColor: styles.colors.light,
  display: 'flex',
  position: 'absolute',
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
};

const MESSAGE_LIST_STYLE = {
  marginLeft: styles.sidebarWidth,
  paddingLeft: styles.gridSize(),
  flexGrow: 1,
  flexDirection: 'column',
  overflowY: 'auto',
}

export default class App extends React.Component<{}, State> {
  state = stateForTime(20)

  componentDidMount() {
    setInterval(this.incrementTime, 1000);
  }

  incrementTime = () => {
    const newTime = this.state.time + 1;
    this.setState(stateForTime(newTime));
  };

  render() {
    return (
      <div style={ROOT_STYLE}>
        <Sidebar title="Furries" />
        <div style={MESSAGE_LIST_STYLE}>
          {this.state.chats.map((chat, idx) => (
            <Message
              key={idx}
              message={chat.message}
            />
          ))}
        </div>
      </div>
    )
  }
}