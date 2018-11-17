// @flow
import type { Phase } from '../types';

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
    getNastyInteractionStep,
} from '../interaction';
import { 
    getDurationForMessage,
} from '../utils';

import {
    bearConspiracy,
    budsmGood,
    budsmBad,
    cryptoBad,
    cryptoGood,
    educationGood,
    furries,
    healthcareBad,
    healthcareGood,
    heyBad,
    heyGood,
    ketoBad,
    ketoGood,
    polyamoryBad,
    polyamoryGood,
    portapottyBad,
    portapottyGood,
    quantifiedSelfBad,
    quantifiedSelfGood,
    sportsBad,
    sportsGood,
    vanLifeBad,
    vanLifeGood,
    cats,
} from './topics';

const goodPhase: Phase = {
    id: 'good',
    topics: [
        heyGood,
        ketoGood,
        polyamoryGood,
        healthcareGood,
        budsmGood,
        cryptoGood,
        educationGood,
        furries,
        portapottyGood,
        quantifiedSelfGood,
        sportsGood,
        vanLifeGood,
    ],
    placeholderText: `What's your opinion about {{topic}}? Remember to be kind and thoughtful!`,
    filter: composeFilters(
        noProfanity,
        lengthMinimum(20),
        readingLevelMinimum(5),
    ),
    speedModifier: 1,
    getInteractionStep: getNiceInteractionStep,
    clickbaitRate: 0,
    subliminalRate: 0,
    catsRate: 0,
};

const mediumPhase: Phase = {
    id: 'medium',
    topics: [
        heyBad,
        ketoBad,
        polyamoryBad,
        healthcareBad,
        bearConspiracy,
        budsmBad,
        cryptoBad,
        furries,
        portapottyBad,
        quantifiedSelfBad,
        sportsBad,
        vanLifeBad,
    ],
    placeholderText: `We're all circlejerking about {{topic}} rn lol`,
    filter: composeFilters(), // TODO: any filters here?
    speedModifier: 1,
    getInteractionStep: getNastyInteractionStep,
    clickbaitRate: 0,
    subliminalRate: 0.03,
    catsRate: 0,
}

const badPhase: Phase = {
    id: 'bad',
    topics: [
        heyBad,
        ketoBad,
        polyamoryBad,
        healthcareBad,
        bearConspiracy,
        budsmBad,
        cryptoBad,
        furries,
        portapottyBad,
        quantifiedSelfBad,
        sportsBad,
        vanLifeBad,
    ],
    placeholderText: `Your opinion on {{topic}} sucks and so do you`,
    filter: composeFilters(
        hasProfanity,
    ),
    speedModifier: 1,
    getInteractionStep: getNastyInteractionStep,
    clickbaitRate: 0.4,
    subliminalRate: 0.08,
    catsRate: 0,
};

const catsPhase: Phase = {
    id: 'cats',
    topics: [cats],
    placeholderText: "It's all over now. You can rest. Here are the cats.",
    filter: catsOnly,
    clickbaitRate: 0,
    subliminalRate: 0,
    catsRate: 1,
};

const phases = [
    goodPhase,
    mediumPhase,
    badPhase,
    catsPhase,
];

for (const phase of phases) {
    let duration = 0;
    for (const topic of phase.topics) {
        for (const message of topic.messages) {
            if (message) {
                duration += Math.floor(getDurationForMessage(message) / 1000);
            }
        }
    }

    const minutes = Math.floor(duration / 60);
    const seconds = `0${duration % 60}`.slice(-2);
    console.log("Duration for phase", phase.id, `${minutes}:${seconds}`);
}

export default phases;