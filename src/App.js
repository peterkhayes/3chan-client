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
};

const CHAT_TOPICS = {
    FURRIES: 'furries',
    POLY: 'poly',
    // TODO finish me
};

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
    // etc...
};

const MIN_DURATION = 500;
const DURATION_PER_CHAR = 10;

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
            // if we're out of messages, refresh the page with a new topic
            return this.loadNextTopic();
        }
        // otherwise, increment the message index and set a timeout
        // based on the length of the new message
        setTimeout(this.loadNextChat, getDurationForChat(allChats[nextChatIndex]));
        this.setState({...this.state, nextChatIndex: nextChatIndex+1});
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
