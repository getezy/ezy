import { Container, Text } from '@nextui-org/react';
import React from 'react';

import { HorizontalLayoutIcon, VerticalLayoutIcon } from '@components';
import { Alignment } from '@core';
import { useSettingsStore } from '@new-storage';

export const StatusBar: React.FC = () => {
  const { alignment, setAlignment } = useSettingsStore((store) => store);

  const handleAlignmentChange = async (newAlignment: Alignment) => {
    await setAlignment(newAlignment);
  };

  return (
    <Container
      gap={1}
      responsive={false}
      display="flex"
      wrap="nowrap"
      direction="row"
      alignItems="center"
      css={{ borderTop: 'solid 0.1px $neutralBorder', height: 20 }}
    >
      <Container gap={0} responsive={false} display="flex" justify="flex-start" alignItems="center">
        <Text b size={9} css={{ userSelect: 'none', color: '$accents7' }}>
          {APP_VERSION}
        </Text>
      </Container>
      <Container gap={0} responsive={false} display="flex" justify="flex-end" alignItems="center">
        {alignment === Alignment.VERTICAL ? (
          <VerticalLayoutIcon onClick={() => handleAlignmentChange(Alignment.HORIZONTAL)} />
        ) : (
          <HorizontalLayoutIcon onClick={() => handleAlignmentChange(Alignment.VERTICAL)} />
        )}
      </Container>
    </Container>
  );
};
