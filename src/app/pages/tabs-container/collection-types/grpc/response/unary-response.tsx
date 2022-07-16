import { styled } from '@nextui-org/react';
import React from 'react';

import { CodeEditor, Tab, Tabs } from '../../../../../components';
import { CollectionType, Tab as ITab } from '../../../../../storage';

const StyledContainer = styled('div', {
  borderLeft: 'solid 1px $border',
  width: '100%',
});

export interface UnaryResponseProps {
  tab: ITab<CollectionType>;
}

export const UnaryResponse: React.FC<UnaryResponseProps> = ({ tab }) => (
  // for horizontal alignment height: 100%
  <StyledContainer>
    <Tabs activeKey={tab.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.response.id} key={tab.response.id}>
        <CodeEditor
          readOnly
          maxWidth="100%"
          height="calc(100vh - 152px)"
          value={tab.response.value}
        />
      </Tab>
    </Tabs>
  </StyledContainer>
);
