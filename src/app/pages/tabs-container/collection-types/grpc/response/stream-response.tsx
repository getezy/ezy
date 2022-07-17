import { Collapse, styled } from '@nextui-org/react';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../../../components';
import { CollectionType, Tab as ITab } from '../../../../../storage';

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

export interface StreamResponseProps {
  tab: ITab<CollectionType>;
}

const ListWrapper = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  margin: 0,

  overflow: 'auto',

  backgroundColor: '$backgroundContrast',
});

const ListItem = styled('li', {
  display: 'flex',

  margin: 0,

  '&:hover': {
    backgroundColor: '$accents1',
  },
});

export const StreamResponse: React.FC<StreamResponseProps> = ({ tab }) => (
  <StyledContainer>
    <Tabs activeKey={tab.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.response.id} key={tab.response.id}>
        <ListWrapper>
          <ListItem>
            <Collapse title="test" css={{ flex: 1, overflow: 'auto' }}>
              <CodeEditor
                height="200px"
                maxWidth="100%"
                width="100%"
                readOnly
                value={tab.requestContainer.request.value}
              />
            </Collapse>
          </ListItem>
        </ListWrapper>
      </Tab>
    </Tabs>
  </StyledContainer>
);
