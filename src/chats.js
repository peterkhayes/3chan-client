// @flow

import ketoGoodChats from './chats/keto_good';
import ketoBadChats from './chats/keto_bad';

// Some sort of structure representing actually what messages got posted.

export type Chat = {
    userId: ?number,
    message: string,
    image: ?string,
    imageTitle: ?string,
    // TODO more fields
};

export type Topic = {
    title: string,
    id: string,
    chats: Array<Chat>,
};

export type Phase = {
    id: string,
    topics: Array<Topic>,
    memeRate: number,
    subliminalRate: number,
    russianRate: number,
    catsRate: number,
}

const ketoGood: Topic = {
    title: 'Ketogenic diets',
    id: 'keto_good',
    chats: ketoGoodChats,
};

const ketoBad: Topic = {
    title: 'Ketogenic diets',
    id: 'keto_bad',
    chats: ketoBadChats,
};

const goodPhase: Phase = {
    id: 'good',
    topics: [ketoGood],
    memeRate: 0,
    subliminalRate: 0,
    russianRate: 0,
    catsRate: 0,
};

const badPhase: Phase = {
    id: 'bad',
    topics: [ketoBad],
    memeRate: 0,
    subliminalRate: 0,
    russianRate: 0,
    catsRate: 0,
};

const catsPhase: Phase = {
    id: 'cats',
    topics: [],
    memeRate: 0,
    subliminalRate: 0,
    russianRate: 0,
    catsRate: 0,
};

export const phases = [ goodPhase, badPhase, catsPhase ];

// function postCat() {
    /* doPosting */
//     const delay = catsRate * (Math.random() + 0.5);
//     setTimeout(postCat, delay);
// }

