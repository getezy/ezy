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
    <Tabs activeKey={tab.data.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
        <CodeEditor height="100%" maxWidth="100%" width="100%" value={tab.data.response.value} />
      </Tab>
    </Tabs>
  </StyledContainer>
);
