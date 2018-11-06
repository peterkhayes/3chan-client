// @flow
/* eslint-disable no-use-before-define */

export type Phase = {
    id: string,
    topics: Array<Topic>,
    memeRate: number,
    subliminalRate: number,
    russianRate: number,
    catsRate: number,
}

export type Topic = {
    id: string,
    title: string,
    messages: Array<Message>,
};

export type Message = {
    userId: ?number,
    text: string,
    image: ?string,
    imageTitle: ?string,
    // TODO more fields
};

// The props needed to render a message
export type MessageProps = {
    avatar: string,
    username: string,
    isMod: boolean,
    text: string,
    image: ?string,
    imageTitle: ?string,
};
