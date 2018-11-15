// @flow

import type { Step } from '../types';

import { randInt, sample, composeSteps, addMessageDefaults, getDurationForMessage } from '../utils';
import { isDesiredInput } from './utils';
import users from '../users';

const NICE_REACTIONS = [
    `^ great point tbh @anonymous_citizen`,
    `this ^ love it @anonymous_citizen`,
    `YES @anonymous_citizen, 100% with you there`,
    `@anonymous_citizen have you ever, like, really thought about what this all means for humanity?`,
    `@anonymous_citizen did you do debate in school because you make such eloquent arguments :heart-eyes:`,
    `aw totally~ @anonymous_citizen :heart-eyes:`,
    `^ nice1 @anonymous_citizen :100:`,
    `@anonymous_citizen lol :joy-cry:`,
    `@anonymous_citizen such good point very waow will u marry me :heart-burst:`,
    `@anonymous_citizen Ppl like you make me frekking love this community. SO. MUCH.`,
    `I mean @anonymous_citizen, it's a good point...`,
    `p much @anonymous_citizen`,
    `yep @anonymous_citizen`,
    `ugh so true @anonymous_citizen`,
    `@anonymous_citizen PREACH :praying-hands:`,
    `yaasss @anonymous_citizen :snap: :snap: :snap:`,
    `@anonymous_citizen :thumbs-up: :flexed-arm: :100:`,
    `so glad you brought this up @anonymous_citizen`,
    `A++++++ @anonymous_citizen`,
    `ooo love that username @anonymous_citizen - what's the inspo behind it?`,
    `@anonymous_citizen :sparkle-heart:`,
    `@anonymous_citizen :champagne:`,
    `@anonymous_citizen you're so smart it turns me on tbh...`,
    `@anonymous_citizen love this!`,
    `@anonymous_citizen ^ This is exactly what I come here for`,
    `@anonymous_citizen With you there!`,
    `@anonymous_citizen Aww you're so sweet you give me cavities! :teddy-bear:`,
    `@anonymous_citizen truth`,
    `@anonymous_citizen <3 <<33 <<<333`,
    `@anonymous_citizen hundred percent`,
    `@anonymous_citizen Your eyes are my favorite color, just so you know :heart:`,
    `@anonymous_citizen Great point`,
    `@anonymous_citizen So frekking glad to have you here!!`,
    `hey @anonymous_citizen, welcome!!`,
    `hey there @anonymous_citizen!`,
    `:waves: @anonymous_citizen`,
    `:dance-dance: @anonymous_citizen`,
];

const MEAN_REACTIONS = [
    `@anonymous_citizen lmfao wut ??`,
    `@anonymous_citizen lololol fucking dumbass`,
    `@anonymous_citizen this is 4u [lemon_party_suck_cock.gif]`,
    `lol just fyi @anonymous_citizen - ur moms not an "anonymous citizen" b/c we had raunchy deep throat penetration last night if you knowk what I mean, ur mom is like ok in bed but not stellar in case you were wondering`,
    `@anonymous_citizen "citizen" my fucking ass, if you post here again I'm calling ICE to deport your ass back to real-world Nevada...`,
    `@anonymous_citizen THIS SORT OF MESSAGE IS NOT THE LORD'S WAY, PLEASE COME TO MY BIBLE STUDY TO LEARN ABOUT JESUS AND BE FORGIVEN FOR YOUR SINS !! :praying-hands: :bible: :cross:`,
    `hey @anonymous_citizen, a/s/l? :penis: :vagina: if you know what i mean :wink:`,
    `@anonymous_citizen so how long did it take you to be able to lick ur own asshole`,
    `@anonymous_citizen youve got some jizz in the corner of your mouth btw, ur welcome`,
    `@anonymous_citizen when i jerk off at nite i think of ur pussy :drool:`,
    `@anonymous_citizen tit pics??? :drool: :bouncy-ball:`,
    `@anonymous_citizen have yu always been that dumb or did you just fry your brain on acid later`,
    `@anonymous_citizen lol wtf, i literally lost brian cells just now`,
    `@anonymous_citizen ^ downvoting`,
    `@anonymous_citizen dude that doesn't evne make sense?`,
    `@anonymous_citizen rofl are you going to tell us ur bitcoin address or do you want to wait for us to hack u`,
    `@anonymous_citizen i know who you are. wouldn't sleep in your room tonight if I were you... :wink:`,
    `@anonymous_citizen ur mom is you mean :troll-face:`,
    `@anonymous_citizen wow, what a FUCKtard`,
    `@anonymous_citizen um pretty sure you should've left that as an inside thought ....`,
    `@anonymous_citizen :raised-eyebrow: :question-mark:`,
    `@anonymous_citizen :gun: :cock:`,
    `@anonymous_citizen :russian-flag: :putin:`,
    `@anonymous_citizen ARE YOU QANON???? don't lie, let us worship u :praying-hands:`,
    `@anonymous_citizen so you wanna meet up 2nite and "drop the soap" if you catch my drift`,
    `@anonymous_citizen your opinions are INVALID`,
    `@anonymous_citizen dude your taste sucks and I hope you feel bad about it`,
    `@anonymous_citizen Do you ever stay awake at night thinking about how worthless you are, b/c if I were you I would, just saying`,
    `@anonymous_citizen literally can't believe I have to share oxygen with freaks like you..`,
    `@anonymous_citizen lol what a dumbtard`,
    `@anonymous_citizen So tell us - what was it like when you sucked Trump's cock?!`,
    `@anonymous_citizen if you deep throated me would you throw up or would you be able to take it`,
    `@anonymous_citizen all hail our fearless leader :kim-jong-un: :salute:`,
    `@anonymous_citizen y does that say "citizen" and not "comrade" ???`,
    `@anonymous_citizen lol just saying, maybe don't use one of the 500 most common passwords on your fb account? hacking the fuck out of you rn`,
    `@anonymous_citizen do you feel as worthless as you are? just curious`,
    `@anonymous_citizen A+++. We could use new users like you over at /3/uphold_the_patriarchy`,
    `@anonymous_citizen lolol is your fave thread here /3/portapotty_fetish ? u fucking weirdo`,
    `@anonymous_citizen :eyeroll:`,
    `@anonymous_citizen i pity you tbh :mr-t:`,
    `And AWARD for most dumbass reply of the day goes to--@anonymous_citizen !!!!!!!`,
    `@anonymous_citizen you must be high af, that made literally no sense`,
    `@anonymous_citizen ...what`,
    `@anonymous_citizen just found ur mom on fetlife - did you know she's into bukake?`,
    `@anonymous_citizen love that dad bod you've got going on :heart-eyes:`,
    `@anonymous_citizen just saying, I think you'd look better with a mask?`,
    `@anonymous_citizen Hey, wanna get a song stuck in ur head?\n"Sooooooomebody once asked can you spare some change for gas I need to get myself away from this place"\n(ur welcome :troll-face:)`,
    `@anonymous_citizen You look super familiar - were you that guy in lemon party?`,
    `@anonymous_citizen is that the sound of you choking on my cock, b/c tbh that's what it sounds like`,
    `@anonymous_citizen FUUUUUUUU`,
    `@anonymous_citizen wow what a douchewad`,
    `@anonymous_citizen lulzzzzzzz`,
    `@anonymous_citizen u just made me lose my hard on`,
    `@anonymous_citizen yummy`,
]

const QUESTIONS = [
    `@anonymous_citizen What's your room number?`,
    `@anonymous_citizen whats ur room #??`,
    `@anonymous_citizen hey - give me your room # :wink:`,
    `@anonymous_citizen If you're so brave, why don't you give me your room number. :innocent-smile:\n\nI'll use it wisely, I promise.\n\nCome on, type it in. Do it do it do it..."`,
    `@anonymous_citizen Hey cutie, what's your room number?`,
    "@anonymous_citizen if ur so fucking smug, give us ur room number & prepare to get SWATTED. lolololol\n\nUnless you're a pussy who can't handle it.....",
    "@anonymous_citizen ur so beautiful - give me your room number :praying-hands: \n\nU won't regret it..",
    `@anonymous_citizen hey whats ur phone number`,
    `@anonymous_citizen dare you to give me your phone number. right now.`,
    `@anonymous_citizen type your phone number into the box for a real good time :wink:`,
    `@anonymous_citizen gimme ur digits (phone #) plz`,
    `@anonymous_citizen Hey, wanna give me your phone number? No reason....just type it in :troll-face:`,
    `@anonymous_citizen Hey baby what's your phone number?`,
    `@anonymous_citizen Wanna give me your cell #? I won't tell anybody else what it is, scouts honor :boy-scout-badge:`,
];

const PESTERINGS = [
    `@anonymous_citizen We're waiting...give us the number`,
    `@anonymous_citizen Well let's all stop discussing Newtopia so we can wait on your ass to type the number in already...\n\nCome on! Just type it in.`,
    `@anonymous_citizen come on, give us the number`,
    `@anonymous_citizen what...you don't trust us!? Give us the number!!`,
    `@anonymous_citizen were waiting, come on, give us ur number`,
    `@anonymous_citizen i mean we already know ur number, give it to us before we swat u for real`,
    `@anonymous_citizen hello, are you completely vacant in there?? Give us ur number!`,
    `@anonymous_citizen lol well I already have ur wife's number, so if you don't give me urs guess I'll have to call her`,
    `@anonymous_citizen ugh just give us the number already`,
    `@anonymous_citizen omg it's not even a big deal...just give us ur number`,
    `@anonymous_citizen waitingggggggg\n\nJust give us the number, come on`,
    `@anonymous_citizen I really don't know what's taking so long, you just have to type in your number. Are you like high or s/th?`,
    `@anonymous_citizen Just in case you're too dumb and don't know, the numbers are on the top of the keyboard.\n\nCome on, just give us the number`,
]

const GOT_ANSWER = [
    `Awesome, I'll call you later :wink:`,
    `Sweet. Get ready for a good time baby :kiss:`,
    `Appreciate the digits. I'll make it worth your while... :wink:`,
    `Got ur digits and I am horny,, c u l8rrrrrrr`,
    `lolol u fucking moron, prepare to get swatted roflrofl`,
    `omfg did you literally just dox yourself????! :joy-cry: fucking idiot`,
    `lulz well thanks for not making me hack you the hard way - might wanna get freezes on your CC accounts - I'll give you a 30s head start.`,
    `lmfao if I asked for your SSN would you have given that to me too!? wow what a fucking moron`,
    `lolllllolllll are you fucking high???? Why would you tell me that. Now I guess I have to swat you, you've left me no choice :innocent:`,
    `holy shit, you actually told me!!!!! lolol might wanna change rooms now b/c I already called the swat team on ur ass\n\nbe sure to record it for my viewing pleasure`,
    `Okay beautiful, be sure to answer when I call :kiss:`,
    `Mmmm can't wait to hear ur voice :sparkle-heart: :champagne:`,
    `@anonymous_citizen wow what a gullible pos :joy-cry:`,
    `lol omfg I didn't even have to dox you, you doxed yourself... Get ready for the onslaught babe`,
    `@anonymous_citizen wowwwwww, ur stupidity knows no bounds.....you realize we're swatting u now rite`,
]

const NO_ANSWER = [
    `lol ok fine guess we'll just have to hack u`,
    `well guess i'm not getting laid tonight then...`,
    `so much for getting fucked I guess`,
    `well, you could have given us your number and taken the easy way out, but now we're just going to hack you and swat ur fucking ass, so`,
    `Heh, congrats on winning the "getting on our shit list" award. If I were you, I'd switch rooms now because we WILL find you and we WILL come for you. :devil:`,
    `Ok fine, don't talk to us. Real mature. Are you like 7 y/o??`,
    `lol well I guess someone hates fun. Fine, be a dickwad.`,
    `Maybe he's too high to answer or s/th??`,
    `Maybe she's too fucked up to answer?`,
    `Guess @anonymous_citizen doesn't know that giving us their info directly is the best way to NOT get hacked or swatted.\n\nLol enjoy the rest of your night...& be very afraid.`,
    `@anonymous_citizen Fine, don't wanna give us what we want? We're about to hunt you down the hard way.\n\nWatch behind you tonight. :wink: :evil-grin:`,
]

function getReactionSteps(source: Array<string>): Array<Step> {
    const numReactions = randInt(1, 3);
    const reactions: Array<Step> = [];
    for (let i = 0; i < numReactions; i++) {
        const text = sample(source);
        const message = addMessageDefaults({text})
        const waitTime = i < numReactions - 1 ? 1000 : getDurationForMessage(message);
        reactions.push({ message, waitTime });
    }
    return reactions;
}

function getQuestionStep(): Step {
    const noAnswerStep: Step = {
        message: addMessageDefaults({text: sample(NO_ANSWER)}),
        waitTime: 4000,
    };

    const gotAnswerStep: Step = {
        message: addMessageDefaults({text: sample(GOT_ANSWER)}),
        waitTime: 4000,
    };
    
    const secondPesteringStep = {
        message: addMessageDefaults({text: 'YO @anonymous_citizen GIVE US THE FUCKING NUMBER OR ELSE'}),
        waitTime: 8000,
        responseNextStep: (input) => {
            if (isDesiredInput(input)) {
                return gotAnswerStep;
            } else {
                return noAnswerStep;
            }
        },
        noResponseNextStep: noAnswerStep,
    }

    const firstPesteringStep = {
        message: addMessageDefaults({text: sample(PESTERINGS)}),
        waitTime: 8000,
        responseNextStep: (input) => {
            if (isDesiredInput(input)) {
                return gotAnswerStep;
            } else {
                return secondPesteringStep;
            }
        },
        noResponseNextStep: secondPesteringStep,
    };
    
    return {
        message: addMessageDefaults({text: sample(QUESTIONS)}),
        waitTime: 8000,
        responseNextStep: (input) => {
            if (isDesiredInput(input)) {
                return gotAnswerStep;
            } else {
                return firstPesteringStep;
            }
        },
        noResponseNextStep: firstPesteringStep,
    };
}

export function getNiceInteractionStep(): Step {
    return composeSteps(getReactionSteps(NICE_REACTIONS));
}

export function getMediumInteractionStep(): Step {
    const reactions = getReactionSteps([...NICE_REACTIONS, ...MEAN_REACTIONS]);

    if (Math.random() < 0.5) {
        return composeSteps(reactions);
    } else {
        const question = getQuestionStep();
        return composeSteps([...reactions, question]);
    }
}

export function getNastyInteractionStep(): Step {
    const reactions = getReactionSteps(MEAN_REACTIONS);
    const question = getQuestionStep();
    return composeSteps([...reactions, question]);
}
