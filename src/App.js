// @flow

import React from 'react';
import qs from 'query-string';
import USERS from './users';
import Message from './Message';
import Sidebar from './Sidebar';
import * as styles from './styles';

import { phases, type Chat } from './chats';

import defaultChats from './chats/default';

type State = {
    nextChatIndex: number,
    // TODO replace with chats + memes, russians, etc
}

const MIN_DURATION = 1000;
const DURATION_PER_CHAR = 35;
const DURATION_FOR_IMAGE = 3000;

const phaseId = qs.parse(window.location.search).phase || 'good';
const phase = phases.find(({id}) => id === phaseId) || phases[0];
const topicId = qs.parse(window.location.search).topic;
const topic = phase.topics.find(({id}) => id === topicId) || phase.topics[0];

// finds the correct list of messages to display based on the query string
const getChatsToDisplay = (): Array<Chat> => {
    if (!topic) {
        return defaultChats;
    }

    return topic.chats;
};

const allChats = getChatsToDisplay();

// returns interval in ms
const getDurationForChat = (chat: ?Chat): number => {
    if (!chat) {
        return 5000;
    }

    return MIN_DURATION
        + DURATION_PER_CHAR * (chat.message || '').length
        + DURATION_FOR_IMAGE * (Number(!!chat.image));
}

const rootStyle = {
    paddingTop: styles.gridSize(),
    fontFamily: styles.fonts.serious,
    color: styles.colors.dark,
    display: 'flex',
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: styles.colorsWithOpacity.light(0.3),
};

const messageListStyle = {
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
        this.loadOtherContent();
    }

    loadOtherContent = () => {
        if (phase.memeRate > 0) {
            this.loadMemes();
        }
        if (phase.subliminalRate > 0) {
            this.loadSubliminalMessages();
        }
        if (phase.russianRate > 0) {
            this.loadRussians();
        }
        if (phase.catsRate > 0) {
            this.loadCats();
        }
    }

    loadMemes = () => {
        // TODO
    }

    loadSubliminalMessages = () => {
        // TODO
    }

    loadRussians = () => {
        // TODO
    }

    loadCats = () => {
        // TODO
    }

    loadNextChat = () => {
        const { nextChatIndex } = this.state;
        if (nextChatIndex >= allChats.length) {
            // if we're out of messages, refresh the page with a new topic
            return this.loadNextTopic();
        }
        // otherwise, increment the message index and set a timeout
        // based on the length of the last message
        setTimeout(this.loadNextChat, getDurationForChat(allChats[nextChatIndex]));
        this.setState({...this.state, nextChatIndex: nextChatIndex+1});
    }

    loadNextTopic = () => {
        const allTopics = phase.topics;
        let nextTopic = allTopics[0];
        const currentTopic = topic;
        for (let i = 0; i < allTopics.length; i++) {
            if (allTopics[i] === currentTopic) {
                nextTopic = allTopics[(i + 1) % allTopics.length];
            }
        }

        window.location.search = qs.stringify({ phase: phase.id, topic: nextTopic.id });
    }

    _setMessageListEl = (el: ?HTMLDivElement) => {
        this._messageListEl = el;
    };

    _scrollBottom = () => {
        if (this._messageListEl) {
            this._messageListEl.scrollTop = this._messageListEl.scrollHeight;
        }
    }

    render() {
        const offset = parseInt(topic.title.slice(0, 3).toLowerCase(), 36);
        return (
            <div style={rootStyle}>
                <Sidebar topic={topic.title} />
                <div ref={this._setMessageListEl} style={messageListStyle}>
                    {allChats.slice(0, this.state.nextChatIndex).map((chat, idx) => {
                        const userIdx = chat.userId != null
                            ? chat.userId
                            : (idx * 157) % USERS.length;
                        const user = USERS[(offset + userIdx) % USERS.length];

                        return (
                            <Message
                                key={idx}
                                avatar={user.avatar}
                                username={user.username}
                                message={chat.message}
                                image={chat.image}
                                imageTitle={chat.imageTitle}
                                onLoad={this._scrollBottom}
                            />
                        )
                    })}
                </div>
            </div>
        )
    }
}
