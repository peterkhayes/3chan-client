// @flow

import React from 'react';
import qs from 'query-string';
import USERS from './users';
import Message from './Message';
import Sidebar from './Sidebar';
import * as styles from './styles';
import moment from 'moment';

import { type Chat } from './chats';

import defaultChats from './chats/default';
import ketoGood from './chats/keto_good';
import ketoBad from './chats/keto_bad';
// TODO import more chats

type State = {
    nextChatIndex: number,
}

const DAY_OF_WEEK = {
    THURSDAY: 4,
    FRIDAY: 5,
    SATURDAY: 6,
};

const CHAT_TOPICS = {
    FURRIES: 'furries',
    POLY: 'poly',
    KETO: 'keto',
    // TODO finish me
};

const CHAT_TOPIC_NAMES = {
    [CHAT_TOPICS.FURRIES]: 'Furries',
    [CHAT_TOPICS.KETO]: 'Ketogenic diets',
}

const CHATS_BY_TOPIC_AND_DAY = {
    [CHAT_TOPICS.FURRIES]: {
        // TODO fill in with imported data
        [DAY_OF_WEEK.THURSDAY]: [{message: 'I LOVE CURRY'}, {message: 'yes we do'}],
        [DAY_OF_WEEK.FRIDAY]: [],
        [DAY_OF_WEEK.SATURDAY]: [],
        // etc..
    },
    [CHAT_TOPICS.POLY]: {
        // TODO fill in with imported data
        [DAY_OF_WEEK.THURSDAY]: [{message: 'poly is lots of fun'}, {message: 'yes it is'}, {message: 'my nam beryl'}],
        [DAY_OF_WEEK.FRIDAY]: [],
        [DAY_OF_WEEK.SATURDAY]: [],
    },
    [CHAT_TOPICS.KETO]: {
        [DAY_OF_WEEK.THURSDAY]: ketoGood,
        [DAY_OF_WEEK.FRIDAY]: ketoBad,
        [DAY_OF_WEEK.SATURDAY]: [],
    },
    // etc...
};

const MIN_DURATION = 500;
const DURATION_PER_CHAR = 30;

// TODO account for the fact that each day at RS includes the next day's early morning
const getDayOfWeek = (): number => {
    const dayFromURL = qs.parse(window.location.search).day;
    if (dayFromURL != null) {
        return dayFromURL;
    }
    const currentDay = moment().day();
    if (currentDay === DAY_OF_WEEK.THURSDAY || currentDay === DAY_OF_WEEK.FRIDAY || currentDay === DAY_OF_WEEK.SATURDAY) {
        return currentDay;
    }
    return DAY_OF_WEEK.THURSDAY;
}
const dayOfWeek = getDayOfWeek();
const chatTopic = qs.parse(window.location.search).topic;
const chatTopicName = CHAT_TOPIC_NAMES[chatTopic] || 'who knows??';

// finds the correct list of messages to display based on the query string
const getChatsToDisplay = (): Array<Chat> => {
    if (!chatTopic) {
        return defaultChats;
    }

    const chatsForChatTopic = CHATS_BY_TOPIC_AND_DAY[chatTopic];
    if (!chatsForChatTopic) {
        return defaultChats;
    }

    const chatsForDay = chatsForChatTopic[dayOfWeek];
    return chatsForDay || defaultChats;
};

const allChats = getChatsToDisplay();

// returns interval in ms
const getDurationForChat = (chat: ?Chat): number => {
    if (!chat) {
        return 5000;
    }
    return MIN_DURATION + DURATION_PER_CHAR * (chat.message || '').length;
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
    paddingRight: styles.gridSize(),
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

    loadNextChat = () => {
        const { nextChatIndex } = this.state;
        if (nextChatIndex >= allChats.length) {
            // if we're out of messages, refresh the page with a new topic
            return this.loadNextTopic();
        }
        // otherwise, increment the message index and set a timeout
        // based on the length of the new message
        setTimeout(this.loadNextChat, getDurationForChat(allChats[nextChatIndex+1]));
        this.setState({...this.state, nextChatIndex: nextChatIndex+1});

        if (this._messageListEl) {
            this._messageListEl.scrollTop = this._messageListEl.scrollHeight;
        }
    }

    loadNextTopic = () => {
        const allTopics = Object.keys(CHAT_TOPICS).map((key) => CHAT_TOPICS[key]).filter((topic) => (
            CHATS_BY_TOPIC_AND_DAY[topic][dayOfWeek].length > 0
        ));
        let nextTopic = allTopics[0];
        const currentTopic = chatTopic;
        for (let i = 0; i < allTopics.length; i++) {
            if (allTopics[i] === currentTopic) {
                nextTopic = allTopics[(i + 1) % allTopics.length];
            }
        }

        window.location.search = qs.stringify({ day: dayOfWeek, topic: nextTopic });
    }

    _setMessageListEl = (el: ?HTMLDivElement) => {
        this._messageListEl = el;
    };

    render() {
        const offset = parseInt(chatTopicName.slice(0, 3).toLowerCase(), 36);
        return (
            <div style={ROOT_STYLE}>
                <Sidebar topic={chatTopicName} />
                <div ref={this._setMessageListEl} style={MESSAGE_LIST_STYLE}>
                    {allChats.slice(0, this.state.nextChatIndex).map((chat, idx) => {
                        const userIdx = chat.userId != null
                            ? chat.userId
                            : (offset + idx * 157) % USERS.length;
                        const user = USERS[userIdx % USERS.length];

                        return (
                            <Message
                                key={idx}
                                avatar={user.avatar}
                                username={user.username}
                                message={chat.message}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}
