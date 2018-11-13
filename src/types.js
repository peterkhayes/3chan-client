// @flow
/* eslint-disable no-use-before-define */

import type { Filter } from './phases/filters';

export type Phase = {
    id: string,
    topics: Array<Topic>,
    placeholderText: string,
    filter?: Filter,
    getInteractionStep?: () => Step,
    speedModifier?: number,
    clickbaitRate: number,
    subliminalRate: number,
    catsRate: number,
}

export type Topic = {
    id: string,
    title: string,
    messages: Array<TopicMessage>,
};

export type TopicMessage = {
    userId: ?number,
    text: string,
    image?: ?string,
    imageTitle?: ?string,
};

export type Message = {
    avatar: string,
    username: string,
    isMod: boolean,
    text: string,
    image: ?string,
    imageTitle: ?string,
    requestUserInput: boolean,
};

export type Step = {|
    message: Message,
    waitTime: number,
    invertColors?: boolean,
    inputDisabled?: boolean,
    responseNextStep?: Step,
    noResponseNextStep?: Step,
|}
