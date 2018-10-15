// @flow

import React from 'react';
import qs from 'query-string';
import CHATS, { type Chat } from './chats';

type State = {
  chats: Array<Chat>,
  time: number,
}

const initialTime = qs.parse(window.location.search).time || 0;
const stateForTime = (time: number): State => ({
  chats: CHATS.filter((chat) => chat.timestamp <= time),
  time: time,
});

export default class App extends React.Component<{}, State> {
  state = stateForTime(0)

  componentDidMount() {
    setInterval(this.incrementTime, 1000);
  }

  incrementTime = () => {
    const newTime = this.state.time + 1;
    this.setState(stateForTime(newTime));
  };

  render() {
    return (
      <div>
        {this.state.chats.map((chat, idx) => (
          <div key={idx}>{chat.message}</div>
        ))}
      </div>
    )
  }
}