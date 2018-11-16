// @flow
import type { Step } from '../types';
import shadowAvatar from '../shadows';
import { randInt, sample, composeSteps, addMessageDefaults } from '../utils';

import image_0 from './0.jpg';
import image_1 from './1.jpg';
import image_2 from './2.jpg';
import image_3 from './3.jpg';
import image_4 from './4.jpg';
import image_5 from './5.jpg';
import image_6 from './6.jpg';
import image_7 from './7.jpg';
import image_8 from './8.jpg';
import image_9 from './9.jpg';
import image_10 from './10.jpg';
import image_11 from './11.jpg';
import image_12 from './12.jpg';
import image_13 from './13.jpg';
import image_14 from './14.jpg';
import image_15 from './15.jpg';
import image_16 from './16.jpg';
import image_17 from './17.jpg';
import image_18 from './18.jpg';
import image_19 from './19.jpg';
import image_20 from './20.jpg';
import image_21 from './21.jpg';
import image_22 from './22.jpg';
import image_23 from './23.jpg';
import image_24 from './24.jpg';
import image_25 from './25.jpg';
import image_26 from './26.jpg';
import image_27 from './27.jpg';
import image_28 from './28.jpg';
import image_29 from './29.jpg';
import image_30 from './30.jpg';
import image_31 from './31.jpg';
import image_32 from './32.jpg';
import image_33 from './33.jpg';
import image_34 from './34.jpg';
import image_35 from './35.jpg';
import image_36 from './36.jpg';
import image_37 from './37.jpg';
import image_38 from './38.jpg';
import image_39 from './39.png';
import image_40 from './40.jpg';
import image_41 from './41.jpg';
import image_42 from './42.jpg';
import image_43 from './43.jpg';
import image_44 from './44.jpg';
import image_45 from './45.jpg';
import image_46 from './46.jpg';
import image_47 from './47.jpg';
import image_48 from './48.jpg';
import image_49 from './49.jpg';
import image_50 from './50.jpg';
import image_51 from './51.jpg';
import image_52 from './52.jpg';
import image_53 from './53.jpg';
import image_54 from './54.jpg';
import image_55 from './55.jpg';
import image_56 from './56.jpg';
import image_57 from './57.jpg';
import image_58 from './58.jpg';
import image_59 from './59.jpg';
import image_60 from './60.jpg';
import image_61 from './61.jpg';
import image_62 from './62.jpg';

const usernames = [
  'Алыйса Нейдр',
  'Сасквач',
  'Ад Нака',
  'Мадам Клава',
  'Бэнджа Джастр',
  'Лэкси Рос',
  'Аный Стэил',
  'Пётр Хэес',
  'Миша Стэайнр',
  'Миджу Хан',
  'Бэн Мосбарджр',
  'А Ботифал Ботифал Моп',
  'Андрия Пасвейтр',
  'Джидён Валд',
  'Майкл Дот Мэлд',
  'Фак Юр Филингс',
]

const images = [
  image_0,
  image_1,
  image_2,
  image_3,
  image_4,
  image_5,
  image_6,
  image_7,
  image_8,
  image_9,
  image_10,
  image_11,
  image_12,
  image_13,
  image_14,
  image_15,
  image_16,
  image_17,
  image_18,
  image_19,
  image_20,
  image_21,
  image_22,
  image_23,
  image_24,
  image_25,
  image_26,
  image_27,
  image_28,
  image_29,
  image_30,
  image_31,
  image_32,
  image_33,
  image_34,
  image_35,
  image_36,
  image_37,
  image_38,
  image_39,
  image_40,
  image_41,
  image_42,
  image_43,
  image_44,
  image_45,
  image_46,
  image_47,
  image_48,
  image_49,
  image_50,
  image_51,
  image_52,
  image_53,
  image_54,
  image_55,
  image_56,
  image_57,
  image_58,
  image_59,
  image_60,
  image_61,
  image_62,
];

export const HACK_CODE = "shield your quiet womb";
const WAIT_TIME = 200;
const HACK_DURATION = 50000;

export default function getHackingStep(): Step {
  const steps: Array<Step> = [];

  for (let i = 0; i * WAIT_TIME < HACK_DURATION; i++) {
    steps.push({
      message: addMessageDefaults({
        username: sample(usernames),
        avatar: shadowAvatar,
        text: new Array(10).fill('PUTIN').slice(0, randInt(10)).join(" "),
        image: sample(images),
      }),
      waitTime: WAIT_TIME,
      inputDisabled: true,
      invertColors: i % 4 === 0,
    });
  }

  steps[steps.length - 1].waitTime = 3000;

  steps.push({
    message: addMessageDefaults({
      text: "Woah. Guys, what the hell just happened?",
    }),
    waitTime: 2000,
  });

  steps.push({
    message: addMessageDefaults({
      text: "Yeah, that was super weird. Lol maybe we got hacked by the Russians?",
    }),
    waitTime: 2000,
  });

  steps.push({
    message: addMessageDefaults({
      text: "Lol nahhhh. ANYWAYS......",
    }),
    waitTime: 2000,
  })

  return composeSteps(steps);
}