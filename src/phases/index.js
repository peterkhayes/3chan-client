// @flow
import type { Topic, Phase } from '../types';

import {
    composeFilters,
    noProfanity,
    hasLength,
    hasProfanity,
} from './filters';

import ketoGoodChats from './keto_good';
import ketoBadChats from './keto_bad';


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

const cats: Topic = {
    title: 'Cats',
    id: 'cats',
    messages: [],
}

const goodPhase: Phase = {
    id: 'good',
    topics: [ketoGood],
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
    topics: [ketoBad],
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

// function postCat() {
    /* doPosting */
//     const delay = catsRate * (Math.random() + 0.5);
//     setTimeout(postCat, delay);
// }

