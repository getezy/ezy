import { Badge, Container, styled, Text } from '@nextui-org/react';
import React from 'react';

import { CodeEditor, Kbd, Tab, Tabs } from '@components';
import { GrpcMethodType, GrpcStatus } from '@core/types';
import { ShortcutsGroup, useShortcuts } from '@hooks';
import { GrpcTab } from '@storage';

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

export interface UnaryCallResponseProps {
  tab: GrpcTab<GrpcMethodType.UNARY>;
}

export const UnaryCallResponse: React.FC<UnaryCallResponseProps> = ({ tab }) => {
  const { getShortcuts } = useShortcuts();

  const shortcuts = getShortcuts(ShortcutsGroup.RESPONSE);

  const responseStatus = (
    <Badge
      size="md"
      variant="flat"
      isSquared
      color={tab.data.response.code !== GrpcStatus.OK ? 'error' : 'success'}
    >
      {tab.data.response.code !== GrpcStatus.OK ? 'ERROR' : 'OK'}
    </Badge>
  );

  const responseTimings = (
    <Badge size="md" variant="flat" isSquared>
      {tab.data.response.timestamp || 0} ms
    </Badge>
  );

  const rightNode = tab.data.response.value && (
    <Container
      gap={0}
      display="flex"
      wrap="nowrap"
      css={{ userSelect: 'none', marginLeft: 5, marginRight: 5 }}
    >
      {responseStatus}
      {responseTimings}
    </Container>
  );

  return (
    <StyledContainer>
      <Tabs
        activeKey={tab.data.response.id}
        activeBar={{ color: 'secondary', position: 'bottom' }}
        rightNode={rightNode}
      >
        <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
          {tab.data.response.value ? (
            <CodeEditor
              height="100%"
              maxWidth="100%"
              width="100%"
              value={tab.data.response.value}
              readOnly
            />
          ) : (
            <Container display="flex" direction="column" justify="center" alignItems="center">
              {shortcuts.map((shortcut) => (
                <>
                  <Text size="$sm" css={{ color: '$accents8' }}>
                    {shortcut.description}
                  </Text>
                  <Kbd key={shortcut.key} size="sm">
                    {shortcut.key}
                  </Kbd>
                </>
              ))}
            </Container>
          )}
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};
