import React from 'react';
import glamorous from 'glamorous';
import {colors} from '../lib/common';
import aerobaticLogo from '../icons/aerobatic.svg';

const Wrapper = glamorous.div({
  backgroundColor: colors.midGray,
  padding: 15,
  textAlign: 'left',
  marginTop: 40,
  color: colors.lightGray,
  '& h4': {
    color: colors.white,
    marginTop: 0
  },
  '& .content': {
    display: 'flex',
    alignItems: 'flex-start',
    '& .logo': {
      '& img': {
        width: 100,
        height: 'auto'
      },
      marginRight: 20
    },
    '& a': {
      color: colors.white
    }
  },
  '@media(max-width: 600px)': {
    '& .content': {
      display: 'block',
      '& span': {
        display: 'block',
        marginTop: 10
      }
    },
    '& .logo': {
      display: 'block',
      margin: 0,
      textAlign: 'center'
    }
  }
});

const AerobaticInfo = () => (
  <Wrapper>
    <h4>SPONSORED BY AEROBATIC</h4>
    <div className="content">
      <a href="https://www.aerobatic.com" className="logo" target="_blank" rel="noopener noreferrer"><img src={aerobaticLogo} alt="Aerobatic" /></a>
      <span>The KEXP + Spotify player is a free service from Aerobatic &mdash; a
        platform for web developers to host modern websites and web applications
        (this one for example). Stop messing around with DevOps and start building
        great online experiences. Vist <a href="https://www.aerobatic.com" target="_blank" rel="noopener noreferrer">www.aerobatic.com</a> for more info.</span>
    </div>
  </Wrapper>
);

export default AerobaticInfo;