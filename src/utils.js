// @flow
import type { Step, Message } from './types';
import users from './users';

const MIN_DURATION = 800;
const MAX_DURATION = 8000;
const DURATION_PER_CHAR = 25;
const DURATION_FOR_IMAGE = 2000;

export function next(current: number, len: number): number {
    return (current + 1) % len;
}

export function prev(current: number, len: number): number {
    return (current - 1 + len) % len;
}

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
    return Math.min(
        MAX_DURATION,
        MIN_DURATION
        + DURATION_PER_CHAR * (message.text || '').length
        + DURATION_FOR_IMAGE * (Number(!!message.image))
    );
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

export function composeSteps(steps: Array<Step>): Step {
    for (let i = 1; i < steps.length; i++) {
        steps[i - 1].noResponseNextStep = steps[i];
    }
    return steps[0];
}
