import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SimpleColors, Spacer, styled, Text, Tooltip } from '@nextui-org/react';
import React from 'react';

export interface InfoLabelProps {
  label: string;
  description: string;

  color?: SimpleColors;
}

const InfoLabelWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
});

const StyledIcon = styled(FontAwesomeIcon, {
  color: '$accents6',
  '&:hover': {
    color: '$warning',
  },
});

export const InfoLabel: React.FC<InfoLabelProps> = ({ label, description, color }) => (
  <InfoLabelWrapper>
    <Text color={color}>{label}</Text>
    <Spacer x={0.3} />
    <Tooltip content={description} placement="right" css={{ zIndex: '$max' }}>
      <StyledIcon icon={faCircleInfo} />
    </Tooltip>
  </InfoLabelWrapper>
);
