/* eslint-disable prettier/prettier */
import IMG_1 from '../assets/images/light-1.png';
import IMG_2 from '../assets/images/light-2.png';
import IMG_3 from '../assets/images/light-3.png';
import IMG_4 from '../assets/images/light-4.png';
import IMG_5 from '../assets/images/light-5.png';
import IMG_6 from '../assets/images/light-6.png';
import IMG_7 from '../assets/images/light-7.png';
import IMG_8 from '../assets/images/light-8.png';

import Setting_IMG_1 from '../assets/images/setting-1.png';
import Setting_IMG_2 from '../assets/images/setting-2.png';
import Setting_IMG_3 from '../assets/images/setting-3.png';
import Setting_IMG_4 from '../assets/images/setting-4.png';
import Setting_IMG_5 from '../assets/images/setting-5.png';

export const LightList = [
  {
    title: '豆、豆腐',
    index: 1,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'ごま、ナッツ',
    index: 2,
    image: IMG_2,
    value: 0,
  },
  {
    title: 'わかめ(海藻)',
    index: 3,
    image: IMG_3,
    value: 0,
  },
  {
    title: '野菜',
    index: 4,
    image: IMG_4,
    value: 0,
  },
  {
    title: '魚',
    index: 5,
    image: IMG_5,
    value: 0,
  },
  {
    title: '椎茸(きのこ)',
    index: 6,
    image: IMG_6,
    value: 0,
  },
  {
    title: '芋、こんにゃく',
    index: 7,
    image: IMG_7,
    value: 0,
  },
  {
    title: '穀物',
    index: 8,
    image: IMG_8,
    value: 0,
  },
];

export const SettingList = [
  {
    title: 'START YOUR DAY RIGHT',
    option: false,
    image: Setting_IMG_1,
  },
  {
    title: 'POWER VEGETABLES',
    option: false,
    image: Setting_IMG_2,
  },
  {
    title: 'STAY FIT, EAT HEALTHY',
    option: false,
    image: Setting_IMG_3,
  },
  {
    title: 'STAY FIT, EAT HEALTHY',
    option: false,
    image: Setting_IMG_4,
  },
  {
    title: 'STAY FIT, EAT HEALTHY',
    option: false,
    image: Setting_IMG_5,
  },
  {
    title: 'STAY FIT, EAT HEALTHY',
    option: true,
    image: Setting_IMG_5,
  },
];

export const zoomOut = {
  0: {
    opacity: 1,
    scale: 1,
  },
  0.5: {
    opacity: 1,
    scale: 0.3,
  },
  1: {
    opacity: 0,
    scale: 0,
  },
};
