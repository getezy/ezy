import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClone,
  faExclamationTriangle,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled, Text } from '@nextui-org/react';
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
import { GrpcStreamMessage, GrpcStreamMessageType, GrpcTab } from '../../../../../storage';

export interface StreamResponseProps {
  tab: GrpcTab<GrpcMethodType.SERVER_STREAMING>;
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

const IconWrapper = styled('div');

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

const StreamIcons = {
  [GrpcStreamMessageType.CLIENT_MESSAGE]: (
    <IconWrapper css={{ color: '$warning' }}>
      <FontAwesomeIcon size="xs" icon={faArrowRight} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.SERVER_MESSAGE]: (
    <IconWrapper css={{ color: '$secondary' }}>
      <FontAwesomeIcon size="xs" icon={faArrowLeft} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.STARTED]: (
    <IconWrapper css={{ color: '$primary' }}>
      <FontAwesomeIcon size="xs" icon={faPlay} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.ENDED]: (
    <IconWrapper css={{ color: '$success' }}>
      <FontAwesomeIcon size="xs" icon={faCheck} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.CANCELED]: (
    <IconWrapper css={{ color: '$error' }}>
      <FontAwesomeIcon size="xs" icon={faStop} />
    </IconWrapper>
  ),
  [GrpcStreamMessageType.ERROR]: (
    <IconWrapper css={{ color: '$error' }}>
      <FontAwesomeIcon size="xs" icon={faExclamationTriangle} />
    </IconWrapper>
  ),
};

const StreamText = {
  [GrpcStreamMessageType.CLIENT_MESSAGE]: <Text size={14}>Client message</Text>,
  [GrpcStreamMessageType.SERVER_MESSAGE]: <Text size={14}>Server message</Text>,
  [GrpcStreamMessageType.STARTED]: <Text size={14}>Stream started</Text>,
  [GrpcStreamMessageType.ENDED]: <Text size={14}>Stream ended</Text>,
  [GrpcStreamMessageType.CANCELED]: <Text size={14}>Stream canceled</Text>,
  [GrpcStreamMessageType.ERROR]: <Text size={14}>Server error</Text>,
};

export const ReponseNode: React.FC<TreeNodeRendererProps<GrpcStreamMessage>> = ({
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
      {StreamText[data.type]}
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
        <CodeEditor maxHeight="250px" maxWidth="100%" width="100%" readOnly value={data.value} />
      )}
    </TreeNode>
  );
};

export const StreamResponse: React.FC<StreamResponseProps> = ({ tab }) => (
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
