import { styled } from '@nextui-org/react';
import React from 'react';

const StyledSVG = styled('svg', {});

export const Logo: React.FC = () => (
  <StyledSVG
    width="136"
    height="119"
    viewBox="0 0 136 119"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.95"
      d="M52.5 113.091L41.2204 113.091C38.2049 113.091 33.9106 108.969 33.9106 108.969L7.13101 63.6674C5.62306 61.1168 5.62307 57.9742 7.13059 55.4235L33.9102 10.1219C35.4182 7.5713 38.2049 6.00002 41.2204 6.00002L68 6.00002M68 113.091L94.7796 113.091C97.7951 113.091 100.582 111.52 102.09 108.969L128.869 63.6674C130.377 61.1168 130.377 57.9742 128.869 55.4235L102.089 10.1219C100.582 7.5713 97.7951 6.00001 94.7796 6.00001L83.5 6.00003"
      stroke="#ACC917"
      strokeWidth="8"
    />
  </StyledSVG>
);
