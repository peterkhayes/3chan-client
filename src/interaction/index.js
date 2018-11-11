// @flow

import type { Step } from '../types';

import { sample, addMessageDefaults } from '../utils';
import users from '../users';

export default function getNewInteractionStep(): Step {
    const user = sample(users);
    return {
        message: addMessageDefaults({
            text: "What's your room number, baby?",
            avatar: user.avatar,
            username: user.username,
        }),
        waitTime: 10000,
        responseNextStep: {
            message: addMessageDefaults({
                text: "Nice. Nice.",
                avatar: user.avatar,
                username: user.username,
            }),
            waitTime: 2000,
        },
        noResponseNextStep: {
            message: addMessageDefaults({
                text: "Guess I'm not getting laid tonight.",
                avatar: user.avatar,
                username: user.username,
            }),
            waitTime: 3000,
        },
    };
}
