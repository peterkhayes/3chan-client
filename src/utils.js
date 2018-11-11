// @flow
import type { Message } from './types';
import users from './users';

const MIN_DURATION = 1000;
const DURATION_PER_CHAR = 35;
const DURATION_FOR_IMAGE = 3000;

export function randInt(a: number, b?: number): number {
    return b == null ? Math.floor(Math.random() * a) : a + randInt(b - a);
}

export function sample<X>(arr: Array<X>): X {
    return arr[randInt(arr.length)];
}

export function fuzzTimeout(timeout: number): number {
    return randInt(timeout * 0.5, timeout * 1.5);
}

// returns interval in ms
export function getDurationForMessage (message: {text: string, image: ?string}): number {
    return MIN_DURATION
        + DURATION_PER_CHAR * (message.text || '').length
        + DURATION_FOR_IMAGE * (Number(!!message.image));
}

export function addMessageDefaults(props: $Shape<Message>): Message {
    const user = sample(users);
    return {
        avatar: user.avatar,
        username: user.username,
        isMod: false,
        text: '',
        image: null,
        imageTitle: null,
        requestUserInput: false,
        ...props,
    };
}
