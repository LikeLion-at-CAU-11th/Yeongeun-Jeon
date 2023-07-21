import {atom} from 'recoil';

export const userNameAtom = atom({
    key: 'userName',
    default: '홍길동'
})

export const emailAtom = atom({
    key: 'email',
    default: '000'
})

export const isSubmittedAtom = atom({
    key: 'isSubmitted',
    default: false
})