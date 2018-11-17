// @flow
import type { Topic } from '../types';

import bearConspiracyChats from './chats/bear_conspiracy.js';
import budsmGoodChats from './chats/budsm_good.js';
import budsmBadChats from './chats/budsm_bad.js';
import cryptoBadChats from './chats/crypto_bad.js';
import cryptoGoodChats from './chats/crypto_good.js';
import educationGoodChats from './chats/education_good.js';
import furriesChats from './chats/furries.js';
import healthcareBadChats from './chats/healthcare_bad.js';
import healthcareGoodChats from './chats/healthcare_good.js';
import heyBadChats from './chats/hey_bad.js';
import heyGoodChats from './chats/hey_good.js';
import ketoBadChats from './chats/keto_bad.js';
import ketoGoodChats from './chats/keto_good.js';
import polyamoryBadChats from './chats/polyamory_bad.js';
import polyamoryGoodChats from './chats/polyamory_good.js';
import portapottyBadChats from './chats/portapotty_bad.js';
import portapottyGoodChats from './chats/portapotty_good.js';
import quantifiedSelfBadChats from './chats/quantified_self_bad.js';
import quantifiedSelfGoodChats from './chats/quantified_self_good.js';
import sportsBadChats from './chats/sports_bad.js';
import sportsGoodChats from './chats/sports_good.js';
import vanLifeBadChats from './chats/van_life_bad.js';
import vanLifeGoodChats from './chats/van_life_good.js';

export const bearConspiracy: Topic = {
    id: 'bear_conspiracy',
    title: 'The Madame Clavae Bear Conspiracy: All Bow To R',
    messages: bearConspiracyChats,
};

export const budsmGood: Topic = {
    id: 'budsm_good',
    title: 'BDSM <> BuDdhiSM',
    messages: budsmGoodChats,
};

export const budsmBad: Topic = {
    id: 'budsm_bad',
    title: 'BDSM <> BuDdhiSM',
    messages: budsmBadChats,
};

export const cryptoBad: Topic = {
    id: 'crypto_bad',
    title: 'Cryptocurrencies',
    messages: cryptoBadChats,
};

export const cryptoGood: Topic = {
    id: 'crypto_good',
    title: 'Cryptocurrencies',
    messages: cryptoGoodChats,
};

export const educationGood: Topic = {
    id: 'education_good',
    title: 'Education',
    messages: educationGoodChats,
};

export const furries: Topic = {
    id: 'furries',
    title: 'Furries',
    messages: furriesChats,
};

export const healthcareBad: Topic = {
    id: 'healthcare_bad',
    title: 'Healthcare',
    messages: healthcareBadChats,
};

export const healthcareGood: Topic = {
    id: 'healthcare_good',
    title: 'Healthcare',
    messages: healthcareGoodChats,
};

export const heyBad: Topic = {
    id: 'hey_bad',
    title: 'Introductions',
    messages: heyBadChats,
};

export const heyGood: Topic = {
    id: 'hey_good',
    title: 'Introductions',
    messages: heyGoodChats,
};

export const ketoBad: Topic = {
    id: 'keto_bad',
    title: 'Ketogenic Diets',
    messages: ketoBadChats,
};

export const ketoGood: Topic = {
    id: 'keto_good',
    title: 'Ketogenic Diets',
    messages: ketoGoodChats,
};

export const polyamoryBad: Topic = {
    id: 'polyamory_bad',
    title: 'Polyamory',
    messages: polyamoryBadChats,
};

export const polyamoryGood: Topic = {
    id: 'polyamory_good',
    title: 'Polyamory',
    messages: polyamoryGoodChats,
};

export const portapottyBad: Topic = {
    id: 'portapotty_bad',
    title: 'Portapotty Fetishism',
    messages: portapottyBadChats,
};

export const portapottyGood: Topic = {
    id: 'portapotty_good',
    title: 'Portapotty Fetishism',
    messages: portapottyGoodChats,
};

export const quantifiedSelfBad: Topic = {
    id: 'quantified_self_bad',
    title: 'Quantified Self',
    messages: quantifiedSelfBadChats,
};

export const quantifiedSelfGood: Topic = {
    id: 'quantified_self_good',
    title: 'Quantified Self',
    messages: quantifiedSelfGoodChats,
};

export const sportsBad: Topic = {
    id: 'sports_bad',
    title: 'Sports',
    messages: sportsBadChats,
};

export const sportsGood: Topic = {
    id: 'sports_good',
    title: 'Sports',
    messages: sportsGoodChats,
};

export const vanLifeBad: Topic = {
    id: 'van_life_bad',
    title: 'Van Life',
    messages: vanLifeBadChats,
};

export const vanLifeGood: Topic = {
    id: 'van_life_good',
    title: 'Van Life',
    messages: vanLifeGoodChats,
};

export const cats: Topic = {
    title: 'Cats',
    id: 'cats',
    messages: [],
}