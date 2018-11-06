// @flow
import type { Topic, Phase } from '../types';

import {
    composeFilters,
    noProfanity,
    hasLength,
    hasProfanity,
    catsOnly,
} from './filters';

import ketoGoodChats from './chats/keto_good';
import ketoBadChats from './chats/keto_bad';
import polyamoryGoodChats from './chats/polyamory_good';
import polyamoryBadChats from './chats/polyamory_bad';

const ketoGood: Topic = {
    title: 'Ketogenic diets',
    id: 'keto_good',
    messages: ketoGoodChats,
};

const ketoBad: Topic = {
    title: 'Ketogenic diets',
    id: 'keto_bad',
    messages: ketoBadChats,
};

const polyamoryGood: Topic = {
    title: 'Polyamory',
    id: 'polyamory_good',
    messages: polyamoryGoodChats,
};

const polyamoryBad: Topic = {
    title: 'Polyamory',
    id: 'polyamory_bad',
    messages: polyamoryBadChats,
};


const cats: Topic = {
    title: 'Cats',
    id: 'cats',
    messages: [],
}

const goodPhase: Phase = {
    id: 'good',
    topics: [ketoGood, polyamoryGood],
    placeholderText: `What's your opinion about {{topic}}? Remember to be kind and thoughtful!`,
    filter: composeFilters(
        noProfanity,
        hasLength(20),
    ),
    memeRate: 0,
    subliminalRate: 0,
    russianRate: 0,
    catsRate: 0,
};

const badPhase: Phase = {
    id: 'bad',
    topics: [ketoBad, polyamoryBad],
    placeholderText: `We're talking about {{topic}}. Fuck you.`,
    filter: composeFilters(
        hasProfanity,
    ),
    memeRate: 0,
    subliminalRate: 0,
    russianRate: 0,
    catsRate: 0,
};

const catsPhase: Phase = {
    id: 'cats',
    topics: [cats],
    placeholderText: "It's all over now. You can rest. Here are the cats.",
    filter: catsOnly,
    memeRate: 0,
    subliminalRate: 0,
    russianRate: 0,
    catsRate: 2000,
};

export default [
    goodPhase,
    badPhase,
    catsPhase,
];
