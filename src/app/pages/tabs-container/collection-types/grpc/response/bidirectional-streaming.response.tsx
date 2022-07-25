import { faClone } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled } from '@nextui-org/react';
import React from 'react';
import { useCopyToClipboard } from 'react-use';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import {
  CodeEditor,
  Tab,
  Tabs,
  Tree,
  TreeNode,
  TreeNodeRendererProps,
} from '../../../../../components';
import { GrpcStreamMessage, GrpcTab } from '../../../../../storage';
import { StreamIcons, StreamMessageTypeText } from './stream-icons';

export interface BidirectionalStreamingResponseProps {
  tab: GrpcTab<GrpcMethodType.BIDIRECTIONAL_STREAMING>;
}

const StyledContainer = styled('div', {
  display: 'flex',
  flex: 1,

  overflow: 'hidden',
});

const ListWrapper = styled('ul', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,

  margin: 0,

  overflow: 'auto',

  backgroundColor: '$backgroundContrast',
});

const ContentWrapper = styled('div', {
  display: 'flex',
  flexWrap: 'nowrap',
  alignItems: 'center',
  paddingLeft: 10,
  marginRight: 10,
  overflow: 'hidden',
  userSelect: 'none',
  flex: 1,
});

const ReponseNode: React.FC<TreeNodeRendererProps<GrpcStreamMessage>> = ({
  data,
  isOpen,
  onCollapseToggle,
}) => {
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyButtonClick = () => copyToClipboard(data.value || '');

  const content = (
    <ContentWrapper>
      {StreamIcons[data.type]}
      <Spacer />
      {StreamMessageTypeText[data.type]}
    </ContentWrapper>
  );

  const commandsContent = (
    <Button
      light
      size="xs"
      color="warning"
      css={{
        minWidth: 10,
        color: '$accents9',
        '&:hover': {
          color: '$warning',
          backgroundColor: '$accents0',
        },
      }}
      icon={<FontAwesomeIcon icon={faClone} />}
      onClick={handleCopyButtonClick}
    />
  );

  return (
    <TreeNode
      id={data.id}
      key={data.id}
      content={content}
      commandsContent={data.value && commandsContent}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
    >
      {data.value && (
        <CodeEditor
          maxHeight="250px"
          maxWidth="100%"
          width="100%"
          readOnly
          value={data.value}
          basicSetup={{ highlightActiveLine: false, highlightActiveLineGutter: false }}
        />
      )}
    </TreeNode>
  );
};

export const BidirectionalStreamingResponse: React.FC<BidirectionalStreamingResponseProps> = ({
  tab,
}) => (
  <StyledContainer>
    <Tabs activeKey={tab.data.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
        <ListWrapper>
          <Tree<GrpcStreamMessage> data={tab.data.response.messages} defaultIsOpen={false}>
            {tab.data.response.messages?.map((message) => (
              <ReponseNode id={message.id} key={message.id} data={message} />
            ))}
          </Tree>
        </ListWrapper>
      </Tab>
    </Tabs>
  </StyledContainer>
);
