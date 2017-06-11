import React from 'react';
import { css } from 'glamor'
import glamorous from 'glamorous';

// Inspired by https://codepen.io/anon/pen/alGny

const barAnimations = [
  css.keyframes({
    '0%': {height: '66%'},
    '50%': {height: '100%'},
    '100%': {height: '66%'}
  }),
  css.keyframes({
    '0%': {height: '100%'},
    '50%': {height: '66%'},
    '100%': {height: '100%'}
  }),
  css.keyframes({
    '0%': {height: '75%'},
    '40%': {height: '66%'},
    '60%': {height: '100%'},
    '100%': {height: '66%'}
  })
];

const Wrapper = glamorous.div({
  display: 'flex',
  height: 25,
  '& div': {
    alignSelf: 'flex-end',
    marginRight: 2,
    width: 4,
    height: '66%',
    background: '#a0a0a0'
  },
  '& :nth-child(1)': {
    animation: `${barAnimations[0]} 1s infinite`
  },
  '& :nth-child(2)': {
    animation: `${barAnimations[1]} 1s infinite`
  },
  '& :nth-child(3)': {
    animation: `${barAnimations[2]} 1s infinite`
  },
  '& :nth-child(4)': {
    marginRight: 0,
    animation: `${barAnimations[0]} 1s infinite`
  },
});

const EqualizerBars = () => (
  <Wrapper> 
    <div />
    <div />
    <div />
    <div />
  </Wrapper>
);

export default EqualizerBars;

