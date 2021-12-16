/* eslint-disable prettier/prettier */
import IMG_1 from '../assets/images/light-1.png';

import Setting_IMG_1 from '../assets/images/setting-1.png';

export const LightList = [
  {
    title: 'まめ',
    subtitle: '',
    index: 1,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'ごま',
    subtitle: '',
    index: 2,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'わかめ',
    subtitle: '(海藻)',
    index: 3,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'やさい',
    subtitle: '',
    index: 4,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'さかな',
    subtitle: '（魚・肉・卵）',
    index: 5,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'しいたけ',
    subtitle: '(きのこ)',
    index: 6,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'いも',
    subtitle: '',
    index: 7,
    image: IMG_1,
    value: 0,
  },
  {
    title: 'こくもつ',
    subtitle: '',
    index: 8,
    image: IMG_1,
    value: 0,
  },
];

export const SettingList = [
  {
    title: 'このアプリの使い方',
    option: false,
    image: Setting_IMG_1,
  },
  {
    title: 'まごわやさしいカウンターについて',
    option: false,
    image: Setting_IMG_1,
  },
  {
    title: 'まごわやさしいカウンターを使う (有料)',
    option: false,
    image: Setting_IMG_1,
  },
  {
    title: 'ヘルプ・不具合報告',
    option: false,
    image: Setting_IMG_1,
  },
  {
    title: 'プライバシーポリシー',
    option: false,
    image: Setting_IMG_1,
  },
  {
    title: '月間の合計数も上記に表示',
    option: true,
    image: Setting_IMG_1,
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
