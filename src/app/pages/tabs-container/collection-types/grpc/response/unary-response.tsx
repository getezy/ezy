import { styled } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { CodeEditor, Tab, Tabs } from '../../../../../components';
import { CollectionType, GrpcResponse, Tab as ITab } from '../../../../../storage';

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

export interface UnaryResponseProps {
  tab: ITab<CollectionType>;
}

export const UnaryResponse: React.FC<UnaryResponseProps> = ({ tab }) => {
  const { value } = tab.data.response as GrpcResponse<GrpcMethodType.UNARY>;

  return (
    <StyledContainer>
      <Tabs activeKey={tab.data.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
        <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
          <CodeEditor height="100%" maxWidth="100%" width="100%" value={value} />
        </Tab>
      </Tabs>
    </StyledContainer>
  );
};
