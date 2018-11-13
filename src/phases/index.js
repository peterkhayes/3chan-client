// @flow
import type { Topic, Phase } from '../types';

import {
    composeFilters,
    noProfanity,
    lengthMinimum,
    hasProfanity,
    catsOnly,
    readingLevelMinimum,
} from './filters';
import {
    getNiceInteractionStep,
    getMediumInteractionStep,
    getNastyInteractionStep,
} from '../interaction';
import * as topics from './topics';

const goodPhase: Phase = {
    id: 'good',
    topics: [topics.ketoGood, topics.polyamoryGood],
    placeholderText: `What's your opinion about {{topic}}? Remember to be kind and thoughtful!`,
    filter: composeFilters(
        noProfanity,
        lengthMinimum(20),
        readingLevelMinimum(5),
    ),
    getInteractionStep: getNiceInteractionStep,
    clickbaitRate: 0,
    subliminalRate: 0,
    catsRate: 0,
};

const mediumPhase: Phase = {
    id: 'medium',
    topics: [topics.ketoBad, topics.polyamoryBad],
    placeholderText: `We're all circlejerking about {{topic}} rn lol`,
    filter: composeFilters(), // TODO: any filters here?
    getInteractionStep: getMediumInteractionStep,
    clickbaitRate: 0.05,
    subliminalRate: 0.02,
    catsRate: 0,
}

const badPhase: Phase = {
    id: 'bad',
    topics: [topics.ketoBad, topics.polyamoryBad],
    placeholderText: `Your opinion on {{topic}} sucks and so do you`,
    filter: composeFilters(
        hasProfanity,
    ),
    getInteractionStep: getNastyInteractionStep,
    clickbaitRate: 0.2,
    subliminalRate: 0.1,
    catsRate: 0,
};

const catsPhase: Phase = {
    id: 'cats',
    topics: [topics.cats],
    placeholderText: "It's all over now. You can rest. Here are the cats.",
    filter: catsOnly,
    clickbaitRate: 0,
    subliminalRate: 0,
    catsRate: 1,
};

export default [
    goodPhase,
    mediumPhase,
    badPhase,
    catsPhase,
];
