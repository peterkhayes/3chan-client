// @flow
import type { Step, Message, TopicMessage, Phase, Topic } from './types';
import React from 'react';
import qs from 'query-string';
import users, {
    type User,
    participantAvatar,
    participantUsername,
} from './users';
import phases from './phases';
import getHackingStep, { HACK_CODE } from './hacking';
import getSubliminalStep from './shadows';
import getClickbaitStep from './clickbait';
import getCatsStep from './cats';
import {
    storeInput,
    getRoomNumbers,
    getPhoneNumbers,
    getSavedMessages,
} from './interaction/storage';
import {
    next,
    prev,
    randInt,
    sample,
    getDurationForMessage,
    addMessageDefaults,
} from './utils';
import Chatroom from './Chatroom';

type State = {
    messages: Array<Message>,
    step: Step,
    messageInputText: string,
    messageInputError: ?string,
}

const ERROR_DURATION = 5000;
const CLEAR_DURATION = 60000;

const phaseId = qs.parse(window.location.search).phase || 'good';
const phase: Phase = phases.find(({id}) => id === phaseId) || phases[0];
const speedModifier = phase.speedModifier == null ? 1 : phase.speedModifier;
const topicId = qs.parse(window.location.search).topic;
const topic: ?Topic = phase.topics.find(({id}) => id === topicId) || phase.topics[0];
const topicMessages: Array<TopicMessage> = topic ? topic.messages : [];
let topicMessageIndex: number = 0;

const userMap: {[userid: string]: User} = {};
function getTopicMessageUser(userId: ?string) {
    if (userId == null) {
        return sample(users);
    } else if (userMap[userId]) {
        return userMap[userId];
    } else {
        const user = sample(users);
        userMap[userId] = user;
        return user;
    }
}

function formatTopicMessage (message: TopicMessage, idx: number): Message {
    const user = getTopicMessageUser(message.userId);

    let text = message.text || '';
    const isMod = text.startsWith('/* ') && text.endsWith(' */');
    if (isMod) {
        text = text.slice(3, text.length - 3);
    }

    text = text.replace(/<username_(.+)>/, (match, userId) => {
        const user = getTopicMessageUser(userId);
        return `@${user.username}`;
    })


    return {
        avatar: user.avatar,
        username: user.username,
        isMod: isMod,
        text: text,
        image: message.image,
        imageTitle: message.imageTitle,
        requestUserInput: false,
    }
}

function getTopicMessageStep(): Step {
    const nextTopicMessage = topicMessages[topicMessageIndex];
    const message = formatTopicMessage(nextTopicMessage, topicMessageIndex);
    topicMessageIndex += 1;

    return {
        message,
        waitTime: getDurationForMessage(message),
    };
}

function setQuery(phaseId: string, topicId?: string) {
    window.location.search = qs.stringify({ phase: phaseId, topic: topicId });
}

function loadNextTopic() {
    const allTopics = phase.topics;
    let nextTopic = allTopics[0];
    const currentTopic = topic;
    for (let i = 0; i < allTopics.length; i++) {
        if (allTopics[i] === currentTopic) {
            nextTopic = allTopics[(i + 1) % allTopics.length];
        }
    }
    setQuery(phase.id, nextTopic.id);
}

function getDefaultNextStep(): Step {
    const {
        clickbaitRate,
        subliminalRate,
        catsRate,
    } = phase;

    let rand = Math.random();

    rand -= clickbaitRate;
    if (rand < 0) {
        return getClickbaitStep();
    }

    rand -= subliminalRate;
    if (rand < 0) {
        return getSubliminalStep();
    }

    rand -= catsRate;
    if (rand < 0) {
        return getCatsStep();
    }

    // Return next
    if (topicMessageIndex >= topicMessages.length) {
        // if we're out of messages, refresh the page with a new topic
        // $FlowFixMe - whatever, this refreshes the page
        return loadNextTopic();
    } else {
        return getTopicMessageStep();
    }
}


export default class App extends React.Component<{}, State> {
    _stepTimeout: ?TimeoutID;
    _errorTimeout: ?TimeoutID;
    _clearMessageTimeout: ?TimeoutID;

    constructor() {
        super();
        this.state = {
            messages: [],
            step: getDefaultNextStep(),
            messageInputText: '',
            messageInputError: null,
        };
    }

    componentDidMount() {
        setTimeout(this.handleStep, 0);
    }

    addMessage = (messageShape: $Shape<Message>, otherState?: $Shape<State>) => {
        const message = addMessageDefaults(messageShape);
        this.setState((state) => ({
            ...otherState,
            messages: state.messages.concat(message)
        }));
    }

    handleStep = () => {
        const { step } = this.state;
        console.log("handling step", step);
        const { message, waitTime, noResponseNextStep } = step;
        this.addMessage(message);
        this._stepTimeout = setTimeout(() => {
            this.setState({ step: noResponseNextStep || getDefaultNextStep() });
            this.handleStep();
        }, waitTime / speedModifier);
    };

    submitMessage = (messageText: string) => {
        if (messageText.toLowerCase() === HACK_CODE) {
            if (this._stepTimeout) clearTimeout(this._stepTimeout);
            this.setState({
                step: getHackingStep(),
                messageInputText: '',
            });
            setTimeout(this.handleStep, 0);
            return;
        }

        const currentStep = this.state.step;
        if (currentStep.inputDisabled) return;

        if (phase.filter && !currentStep.responseNextStep) {
            const error = phase.filter(messageText);
            if (error) {
                this.setError(error)
                return;
            }
        }

        this.addMessage({
            text: messageText,
            avatar: participantAvatar,
            username: participantUsername,
        }, {
            messageInputText: '',
            messageInputError: null,
        });
        storeInput(messageText);

        if (this._stepTimeout) clearTimeout(this._stepTimeout);
        let responseStep = currentStep.responseNextStep;
        if (responseStep == null && phase.getInteractionStep) {
            responseStep = phase.getInteractionStep();
        }
        this.setState({step: responseStep});
        // TODO: does this cause a race condition?
        setTimeout(this.handleStep, 1500);
    }

    setError = (error: string) => {
        if (this._errorTimeout) clearTimeout(this._errorTimeout);
        this.setState({ messageInputError: error });
        this._errorTimeout = setTimeout(() => {
            this.setState({ messageInputError: null });
        }, ERROR_DURATION);
    }

    setMessageInputText = (messageInputText: string) => {
        if (this.state.step.inputDisabled) return;
        if (this._clearMessageTimeout) clearTimeout(this._clearMessageTimeout);
        this.setState({messageInputText})
        this._clearMessageTimeout = setTimeout(() => {
            this.setState({messageInputText: ''});
        }, CLEAR_DURATION);
    };

    handleKeyPress = (e: SyntheticKeyboardEvent<HTMLElement>) => {
        if (e.shiftKey && e.ctrlKey) {
            const phaseIdx = phases.findIndex((phase) => phase.id === phaseId);
            const key = e.key.toLowerCase();
            if (key === 'j') {
                setQuery(phases[next(phaseIdx, phases.length)].id);
            } else if (key === 'k') {
                setQuery(phases[prev(phaseIdx, phases.length)].id);
            } else if (key === '{') {
                setQuery(
                    phaseId,
                    phase.topics[next(phaseIdx, phase.topics.length)].id
                );
            } else if (key === '}') {
                setQuery(
                    phaseId,
                    phase.topics[prev(phaseIdx, phase.topics.length)].id
                );
            } else if (key === 'r') {
                window.alert(`Room numbers:\n${getRoomNumbers().join("\n")}`);
            } else if (key === 'p') {
                window.alert(`Phone numbers:\n${getPhoneNumbers().join("\n")}`);
            } else if (key === 'm') {
                window.alert(`Messages:\n${getSavedMessages().join("\n")}`);
            }
        }
    };

    render() {
        return (
            <div onKeyDown={this.handleKeyPress}>
                <Chatroom
                    messages={this.state.messages}
                    topic={topic ? topic.title : 'Who knows??'}
                    invertColors={!!this.state.step.invertColors}
                    messageInputText={this.state.messageInputText}
                    messageInputError={this.state.messageInputError}
                    messageInputPlaceholder={phase.placeholderText.replace(
                        "{{topic}}",
                        topic ? topic.title.toLowerCase() : 'whatever'
                    )}
                    setMessageInputText={this.setMessageInputText}
                    submitMessage={this.submitMessage}
                />
            </div>
        );
    }
}
