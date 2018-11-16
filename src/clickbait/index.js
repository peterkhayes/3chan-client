// @flow
import type { Step } from '../types';
import clickbait from './content';
import {
    sample,
    randInt,
    addMessageDefaults,
} from '../utils';


const comments = [
  "Hey everyone check this out, I found it really interesting!",
  "My aunt sent me this, I think you might like it!",
  "This is totally me guys",
  "Haha omg I died",
  "This is so cool!!",
  "Wow, just wow",
  "Inspiring :heart:",
  "You will totally love this, I did",
]

let idx = randInt(clickbait.length - 1);

export default function getClickbaitStep(): Step {
    const content = clickbait[idx];
    idx = (idx + 1) % clickbait.length;

    const message = addMessageDefaults({
      text: sample(comments),
      image: content.image,
      imageTitle: content.text,
    });

    return {
        message,
        waitTime: 2000,
    };
}