// @flow
import type { MessageProps, Phase, Topic, Message } from './types';
import React from 'react';
import qs from 'query-string';
import USERS from './users';
import phases from './phases';

import Chatroom from './Chatroom';

type State = {
    nextMessageIndex: number,
    messages: Array<MessageProps>,
}

const MIN_DURATION = 1000;
const DURATION_PER_CHAR = 35;
const DURATION_FOR_IMAGE = 3000;

const phaseId = qs.parse(window.location.search).phase || 'good';
const phase: Phase = phases.find(({id}) => id === phaseId) || phases[0];
const topicId = qs.parse(window.location.search).topic;
const topic: ?Topic = phase.topics.find(({id}) => id === topicId) || phase.topics[0];
const topicMessages: Array<Message> = topic ? topic.messages : [];
const randomOffset = topic ? parseInt(topic.title.slice(0, 3).toLowerCase(), 36) : 0;

// returns interval in ms
const getDurationForMessage = (message: Message): number => {
    return MIN_DURATION
        + DURATION_PER_CHAR * (message.text || '').length
        + DURATION_FOR_IMAGE * (Number(!!message.image));
}

const formatMessage = (message: Message, idx: number): MessageProps => {
    const userIdx = message.userId != null
        ? message.userId
        : (idx * 157) % USERS.length;
    const user = USERS[(randomOffset + userIdx) % USERS.length];

    return {
        avatar: user.avatar,
        username: user.username,
        text: message.text,
        image: message.image,
        imageTitle: message.imageTitle,
    }
}

export default class App extends React.Component<{}, State> {
    constructor() {
        super();
        this.state = {
            nextMessageIndex: 0,
            messages: [],
        };
    }

    componentDidMount() {
        this.loadNextMessage();
    }

    loadNextMessage = () => {
        const { nextMessageIndex, messages } = this.state;
        if (nextMessageIndex >= topicMessages.length) {
            // if we're out of messages, refresh the page with a new topic
            return this.loadNextTopic();
        } else {
            // post a new message
            const newMessage = topicMessages[nextMessageIndex];
            const formattedMessage = formatMessage(newMessage, nextMessageIndex);
            this.setState({
                messages: messages.concat(formattedMessage),
                nextMessageIndex: nextMessageIndex + 1,
            });

            setTimeout(this.loadNextMessage, getDurationForMessage(newMessage));
        }
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

    loadMemes = () => {
        // const meme = getRandomMeme();
        // const memeMessage = formatMessage(meme)
        // this.setState({
        //     messages: state.messages.concat(memeMessage)m
        // })
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

    render() {
        return (
            <Chatroom
                messages={this.state.messages}
                topic={topic ? topic.title : 'Who knows??'}
            />
        );
    }
}
