// @flow

import React from 'react';
import qs from 'query-string';
import AVATARS from './avatars';
import USERNAMES from './usernames';
import Message from './Message';
import Sidebar from './Sidebar';
import * as styles from './styles';
import moment from 'moment';

import { type Chat } from './chats';

import defaultChats from './chats/default';
// TODO import more chats

type State = {
    nextChatIndex: number,
}

const DAY_OF_WEEK = {
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
    SUNDAY: 7,
};

const CHAT_TOPICS = {
    FURRIES: 'furries',
    // TODO finish me
};

const CHATS_BY_TOPIC_AND_DAY = {
    [CHAT_TOPICS.FURRIES]: {
        [DAY_OF_WEEK.THURSDAY]: [], // TODO fill in with imported data
        // etc..
    },
    // etc...
};

const MIN_DURATION = 300;
const DURATION_PER_CHAR = 10;

// TODO snap to a day that's thursday-sunday
const dayOfWeek = qs.parse(window.location.search).day || moment().day();
const chatTopic = qs.parse(window.location.search).topic;

const getChatsToDisplay = (): Array<Chat> => {
    if (!chatTopic) {
        return defaultChats;
    }

    const chatsForChatTopic = CHATS_BY_TOPIC_AND_DAY[chatTopic];
    if (!chatsForChatTopic) {
        return defaultChats;
    }

    const chatsForDay = CHATS_BY_TOPIC_AND_DAY[dayOfWeek];
    return chatsForDay || defaultChats;
};

const allChats = getChatsToDisplay();

// returns interval in ms
const getDurationForChat = (chat: Chat): number => {
    return MIN_DURATION + DURATION_PER_CHAR * chat.message.length;
}

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

  state = { nextChatIndex: 0 };

  componentDidMount() {
      this.loadNextChat();
  }

  _setMessageListEl = (el: ?HTMLDivElement) => {
    this._messageListEl = el;
  };

  loadNextChat = () => {
    const { nextChatIndex } = this.state;
    if (nextChatIndex >= allChats.length) {
      return;
    }
    setTimeout(this.loadNextChat, getDurationForChat(allChats[nextChatIndex]));
    this.setState({...this.state, nextChatIndex: nextChatIndex+1});
  }

  render() {
    return (
      <div style={ROOT_STYLE}>
        <Sidebar topic="Furries" />
        <div ref={this._setMessageListEl} style={MESSAGE_LIST_STYLE}>
          {allChats.slice(0, this.state.nextChatIndex).map((chat, idx) => (
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
