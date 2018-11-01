// @flow

// Some sort of structure representing actually what messages got posted.

const catsPhase: Phase = {
    name: 'cats',
    topics: [],
    memeRate: 0,
    subliminalRate: 0,
    russianRate: 0,
    catsRate: 0,
};

// function postCat() {
    /* doPosting */
//     const delay = catsRate * (Math.random() + 0.5);
//     setTimeout(postCat, delay);
// }

export type Phase = {
    name: string,
    topics: Array<Topic>,
    memeRate: number,
    subliminalRate: number,
    russianRate: number,
    catsRate: number,
}

export type Topic = {
    title: string,
    chats: Array<Chat>,
};

export type Chat = {
    userId: ?number,
    message: string,
    image: ?string,
    imageTitle: ?string,
    // TODO more fields
};
