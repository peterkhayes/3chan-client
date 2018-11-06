// @flow
/* eslint-disable no-use-before-define */

import type { Filter } from './phases/filters';

export type Phase = {|
    id: string,
    topics: Array<Topic>,
    filter?: Filter,
    memeRate: number,
    subliminalRate: number,
    russianRate: number,
    catsRate: number,
|}

export type Topic = {|
    id: string,
    title: string,
    messages: Array<Message>,
|};

export type Message = {|
    userId: ?number,
    text: string,
    image: ?string,
    imageTitle: ?string,
    // TODO more fields
|};

// The props needed to render a message
export type MessageProps = {
    avatar: string,
    username: string,
    isMod: boolean,
    text: string,
    image: ?string,
    imageTitle: ?string,
};
