// @flow
import type { MessageProps, Phase, Topic, Message } from './types';
import React from 'react';
import qs from 'query-string';
import users from './users';
import phases from './phases';
import { shadowAvatar, longShadowTexts, mediumShadowTexts, shortShadowTexts } from './shadows';
import catUrls from './cats';

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
const randomOffset = Math.random();

function randInt(a: number, b?: number): number {
    return b == null ? Math.floor(Math.random() * a) : a + randInt(b - a);
}

function sample<X>(arr: Array<X>): X {
    return arr[randInt(arr.length)];
}

function fuzzTimeout(timeout: number): number {
    return randInt(timeout * 0.5, timeout * 2);
}


// returns interval in ms
function getDurationForMessage (message: Message): number {
    return MIN_DURATION
        + DURATION_PER_CHAR * (message.text || '').length
        + DURATION_FOR_IMAGE * (Number(!!message.image));
}

const userOffset = randInt(users.length);
function formatMessage (message: Message, idx: number): MessageProps {
    const userIdx = message.userId != null
        ? message.userId
        : (idx * 157) % users.length;
    const user = users[(userOffset + userIdx) % users.length];
    let text = message.text || '';
    const isMod = text.startsWith('/* ') && text.endsWith(' */');
    if (isMod) {
        text = text.slice(3, text.length - 3);
    }

    return {
        avatar: user.avatar,
        username: user.username,
        isMod: isMod,
        text: text,
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
        this.loadNextTopicMessage();
        this.loadNextSubliminalMessage();
        this.loadNextCat();
    }

    loadNextTopicMessage = () => {
        if (topicMessages.length === 0) return;
        const { nextMessageIndex, messages } = this.state;
        if (nextMessageIndex >= topicMessages.length) {
            // if we're out of messages, refresh the page with a new topic
            return this.loadNextTopic();
        } else {
            // otherwise format and post a new message
            const newMessage = topicMessages[nextMessageIndex];
            const formattedMessage = formatMessage(newMessage, nextMessageIndex);
            this.setState({
                messages: messages.concat(formattedMessage),
                nextMessageIndex: nextMessageIndex + 1,
            });

            setTimeout(this.loadNextTopicMessage, getDurationForMessage(newMessage));
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

    loadNextSubliminalMessage = () => {
        if (phase.subliminalRate > 0) {
            setTimeout(() => {
                const rand = Math.random();

                const text =
                    rand > 0.9 ? sample(longShadowTexts) :
                    rand > 0.5 ? sample(mediumShadowTexts) :
                    sample(shortShadowTexts);

                const message = {
                    username: 'An Associate',
                    avatar: shadowAvatar,
                    text,
                    image: null,
                    imageTitle: null,
                }

                this.setState({ messages: this.state.messages.concat(message) });

                this.loadNextSubliminalMessage();
            }, fuzzTimeout(phase.subliminalRate))
        }
    }

    loadNextCat = () => {
        if (phase.catsRate > 0) {
            setTimeout(() => {
                const image = sample(catUrls);
                const user = sample(users);

                const message = {
                    username: user.username,
                    avatar: user.avatar,
                    text: '',
                    image: image,
                    imageTitle: null,
                }

                this.setState({ messages: this.state.messages.concat(message) });

                this.loadNextCat();
            }, fuzzTimeout(phase.catsRate))
        }
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
