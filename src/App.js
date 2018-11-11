// @flow
import type { Step, Message, TopicMessage, Phase, Topic } from './types';
import React from 'react';
import qs from 'query-string';
import users, { participantAvatar } from './users';
import phases from './phases';
import getHackingStep, { HACK_CODE } from './hacking';
import getSubliminalStep from './shadows';
import getCatsStep from './cats';
import getNewInteractionStep from './interaction';
import {
    randInt,
    sample,
    getDurationForMessage,
    addMessageDefaults,
} from './utils';
import Chatroom from './Chatroom';

type State = {
    messages: Array<Message>,
    step: Step,
    nextTopicMessageIndex: number,
    messageInputText: string,
    messageInputError: ?string,
}

const ERROR_DURATION = 5000;
const CLEAR_DURATION = 60000;

const phaseId = qs.parse(window.location.search).phase || 'good';
const phase: Phase = phases.find(({id}) => id === phaseId) || phases[0];
const topicId = qs.parse(window.location.search).topic;
const topic: ?Topic = phase.topics.find(({id}) => id === topicId) || phase.topics[0];
const topicMessages: Array<TopicMessage> = topic ? topic.messages : [];
let topicMessageIndex: number = 0;

const userOffset = randInt(users.length);
function formatTopicMessage (message: TopicMessage, idx: number): Message {
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


function loadNextTopic() {
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

function getDefaultNextStep(): Step {
    const {
        memeRate,
        subliminalRate,
        catsRate,
    } = phase;

    let rand = Math.random();

    // rand -= memeRate;
    // if (rand < 0) {
    //     // return a meme step
    // }

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
    // _promptTimeout: ?TimeoutID;
    // _crazyModeInterval: ?IntervalID;

    constructor() {
        super();
        this.state = {
            messages: [],
            step: getDefaultNextStep(),
            nextTopicMessageIndex: 0,
            // pendingResponses: [],
            // prompt: null,
            messageInputText: '',
            messageInputError: null,
            // crazyModeStartedAt: null,
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
        }, waitTime);
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
            username: 'Anonymous Citizen',
        }, {
            messageInputText: '',
            messageInputError: null,
        });

        if (this._stepTimeout) clearTimeout(this._stepTimeout);
        const responseStep = currentStep.responseNextStep || getNewInteractionStep();
        this.setState({step: responseStep});
        setTimeout(this.handleStep, 750);
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

    render() {
        return (
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
        );
    }
}
