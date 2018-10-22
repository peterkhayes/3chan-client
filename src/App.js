// @flow

import React from 'react';
import qs from 'query-string';
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

export default class App extends React.Component<{}, State> {
    state = { nextChatIndex: 0 };

    componentDidMount() {
        this.loadNextChat();
    }

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
            <div>
            {allChats.map((chat, idx) => {
                if (idx < this.state.nextChatIndex) {
                    return <div key={idx}>{chat.message}</div>;
                }
            })}
            </div>
        )
    }
}
