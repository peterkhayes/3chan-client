// @flow
import type { Topic } from '../types';

import ketoGoodChats from './chats/keto_good';
import ketoBadChats from './chats/keto_bad';
import polyamoryGoodChats from './chats/polyamory_good';
import polyamoryBadChats from './chats/polyamory_bad';

export const ketoGood: Topic = {
    title: 'Ketogenic diets',
    id: 'keto_good',
    messages: ketoGoodChats,
};

export const ketoBad: Topic = {
    title: 'Ketogenic diets',
    id: 'keto_bad',
    messages: ketoBadChats,
};

export const polyamoryGood: Topic = {
    title: 'Polyamory',
    id: 'polyamory_good',
    messages: polyamoryGoodChats,
};

export const polyamoryBad: Topic = {
    title: 'Polyamory',
    id: 'polyamory_bad',
    messages: polyamoryBadChats,
};

export const cats: Topic = {
    title: 'Cats',
    id: 'cats',
    messages: [],
}