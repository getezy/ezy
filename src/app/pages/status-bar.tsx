import { Container } from '@nextui-org/react';
import React from 'react';

import { HorizontalLayoutIcon, VerticalLayoutIcon } from '../components';
import { Alignment, useSettingsStore } from '../storage';

export const StatusBar: React.FC = () => {
  const { alignment, updateAlignment } = useSettingsStore((store) => store);

  const handleAlignmentChange = (newAlignment: Alignment) => {
    updateAlignment(newAlignment);
  };

  return (
    <Container
      gap={1}
      fluid={false}
      responsive={false}
      display="flex"
      alignItems="center"
      css={{ borderTop: 'solid 1px $neutralBorder', height: 20 }}
    >
      <Container gap={0} responsive={false} display="flex" justify="flex-end">
        {alignment === Alignment.VERTICAL ? (
          <VerticalLayoutIcon onClick={() => handleAlignmentChange(Alignment.HORIZONTAL)} />
        ) : (
          <HorizontalLayoutIcon onClick={() => handleAlignmentChange(Alignment.VERTICAL)} />
        )}
      </Container>
    </Container>
  );
};
