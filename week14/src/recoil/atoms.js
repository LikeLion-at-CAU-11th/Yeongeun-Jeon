import {atom} from 'recoil';

export const userNameAtom = atom({
    key: 'userName',
    default: '전영은'
})

export const emailAtom = atom({
    key: 'email',
    default: 'junyewdd@gmail.com'
})

export const dateAtom = atom({
    key: 'date',
    default: '2003-07-17'
})

export const isSubmittedAtom = atom({
    key: 'isSubmitted',
    default: false
})