import { styled } from '@nextui-org/react';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../../../components';
import { CollectionType, Tab as ITab } from '../../../../../storage';

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

export interface UnaryResponseProps {
  tab: ITab<CollectionType>;
}

export const UnaryResponse: React.FC<UnaryResponseProps> = ({ tab }) => (
  <StyledContainer>
    <Tabs activeKey={tab.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.response.id} key={tab.response.id}>
        <CodeEditor height="100%" maxWidth="100%" width="100%" value={tab.response.value} />
      </Tab>
    </Tabs>
  </StyledContainer>
);
