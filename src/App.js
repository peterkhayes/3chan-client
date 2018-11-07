// @flow
import type { MessageProps, Phase, Topic, Message } from './types';
import React from 'react';
import qs from 'query-string';
import users from './users';
import phases from './phases';
import putins from './putin';
import { shadowAvatar, longShadowTexts, mediumShadowTexts, shortShadowTexts } from './shadows';
import catUrls from './cats';

import Chatroom from './Chatroom';

type State = {
    nextMessageIndex: number,
    messages: Array<MessageProps>,
    messageInputText: string,
    messageInputError: ?string,
    crazyModeStartedAt: ?number,
}

const ERROR_DURATION = 5000;
const CLEAR_DURATION = 60000;
const MIN_DURATION = 1000;
const DURATION_PER_CHAR = 35;
const DURATION_FOR_IMAGE = 3000;
const CRAZY_MODE_CODE = "shield your quiet womb";
const CRAZY_MODE_DURATION = 4000;

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
    return randInt(timeout * 0.5, timeout * 1.5);
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
    _errorTimeout: ?TimeoutID;
    _clearMessageTimeout: ?TimeoutID;
    _crazyModeInterval: ?IntervalID;

    constructor() {
        super();
        this.state = {
            nextMessageIndex: 0,
            messages: [],
            messageInputText: '',
            messageInputError: null,
            crazyModeStartedAt: null,
        };
    }

    componentDidMount() {
        this.loadNextTopicMessage();
        this.loadNextSubliminalMessage();
        this.loadNextCat();
    }

    addMessage = (message: MessageProps, otherState?: $Shape<State>) => {
        this.setState({
            ...otherState,
            messages: this.state.messages.concat(message)
        });
    }

    setError = (error: string) => {
        if (this._errorTimeout) clearTimeout(this._errorTimeout);
        this.setState({messageInputError: error});
        this._errorTimeout = setTimeout(() => {
            this.setState({messageInputError: null});
        }, ERROR_DURATION);
    }

    loadNextTopicMessage = () => {
        if (topicMessages.length === 0) return;
        const { nextMessageIndex } = this.state;
        
        if (this.state.crazyModeStartedAt != null) {
            setTimeout(this.loadNextTopicMessage, CRAZY_MODE_DURATION + 4000);
        } else if (nextMessageIndex >= topicMessages.length) {
            // if we're out of messages, refresh the page with a new topic
            return this.loadNextTopic();
        } else {
            // otherwise format and post a new message
            const newMessage = topicMessages[nextMessageIndex];
            const formattedMessage = formatMessage(newMessage, nextMessageIndex);
            this.addMessage(formattedMessage, {
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

                this.addMessage({
                    username: 'An Associate',
                    avatar: shadowAvatar,
                    text,
                    isMod: false,
                    image: null,
                    imageTitle: null,
                });

                this.loadNextSubliminalMessage();
            }, fuzzTimeout(phase.subliminalRate))
        }
    }

    loadNextCat = () => {
        if (phase.catsRate > 0) {
            // TODO: longer timeout when .gif, somehow?
            setTimeout(() => {
                const image = sample(catUrls);
                const user = sample(users);

                this.addMessage({
                    username: user.username,
                    avatar: user.avatar,
                    text: '',
                    isMod: false,
                    image: image,
                    imageTitle: null,
                })

                this.loadNextCat();
            }, fuzzTimeout(phase.catsRate))
        }
    }

    setMessageInputText = (messageInputText: string) => {
        if (this._clearMessageTimeout) clearTimeout(this._clearMessageTimeout);
        this.setState({messageInputText})
        this._clearMessageTimeout = setTimeout(() => {
            this.setState({messageInputText: ''});
        }, CLEAR_DURATION);
    };

    submitMessage = (messageText: string) => {
        if (messageText.toLowerCase() === CRAZY_MODE_CODE) {
            clearInterval(this._crazyModeInterval);
            this.setState({
                crazyModeStartedAt: Date.now(),
                messageInputText: "",
                messageInputError: "",
            });
            
            let putinIdx = randInt(putins.length);
            this._crazyModeInterval = setInterval(() => {
                if (Date.now() - this.state.crazyModeStartedAt <= CRAZY_MODE_DURATION) {
                    const putin = putins[++putinIdx % putins.length]
                    this.addMessage({
                        text: "PUTIN",
                        username: putin.username,
                        avatar: shadowAvatar,
                        image: putin.image,
                        isMod: false,
                        imageTitle: null,
                    });
                } else {
                    this.setState({crazyModeStartedAt: null});
                    clearInterval(this._crazyModeInterval)
                    
                    setTimeout(() => {
                        const user = sample(users);
                        this.addMessage({
                            text: "Woah. Guys, what the hell just happened?",
                            username: user.username,
                            avatar: user.avatar,
                            image: null,
                            isMod: false,
                            imageTitle: null,
                        });

                        setTimeout(() => {
                            const user2 = sample(users);
                            this.addMessage({
                                text: "Yeah, that was super weird. Lol maybe we got hacked by the Russians?",
                                username: user2.username,
                                avatar: user2.avatar,
                                image: null,
                                isMod: false,
                                imageTitle: null,
                            });

                            setTimeout(() => {
                                const user3 = sample(users);
                                this.addMessage({
                                    text: "Lol nahhhh. ANYWAYS......",
                                    username: user3.username,
                                    avatar: user3.avatar,
                                    image: null,
                                    isMod: false,
                                    imageTitle: null,
                                });
                            }, 1000);
                        }, 2000);
                    }, 1000);
                }
            }, 400);
            return;
        }

        if (phase.filter) {
            const error = phase.filter(messageText);
            if (error) {
                this.setError(error)
                return;
            }
        }

        const user = sample(users);
        const message: MessageProps = {
            text: messageText,
            username: user.username,
            avatar: user.avatar,
            image: null,
            isMod: false,
            imageTitle: null,
        };
        this.addMessage(message, {
            messageInputText: '',
            messageInputError: null,
        });
    }

    render() {
        return (
            <Chatroom
                messages={this.state.messages}
                topic={topic ? topic.title : 'Who knows??'}
                invertColors={Date.now() - this.state.crazyModeStartedAt < 250}
                messageInputText={this.state.messageInputText}
                messageInputError={this.state.messageInputError}
                messageInputPlaceholder={phase.placeholderText.replace(
                    "{{topic}}",
                    topic ? topic.title.toLowerCase() : 'whatever'
                )}
                setMessageInputText={this.setMessageInputText}
                submitMessage={this.submitMessage}
            />
        );
    }
}
