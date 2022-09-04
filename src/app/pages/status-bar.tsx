import { Badge, Container } from '@nextui-org/react';
import React from 'react';

import packageJson from '../../../package.json';
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
      responsive={false}
      display="flex"
      wrap="nowrap"
      direction="row"
      alignItems="center"
      css={{ borderTop: 'solid 1px $neutralBorder', height: 20 }}
    >
      <Container gap={0} responsive={false} display="flex" justify="flex-start" alignItems="center">
        <Badge
          size="xs"
          variant="flat"
          isSquared
          css={{ height: 18, fontSize: 9, userSelect: 'none' }}
        >
          {packageJson.version}
        </Badge>
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
