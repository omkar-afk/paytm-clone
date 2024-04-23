// atoms.js
import { atom } from 'recoil';

export const to = atom({
  key: 'to',
  default: {
    toId:'',
    fname:'',
    lname:''
  },
});

