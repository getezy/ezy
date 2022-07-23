import {
  faArrowLeft,
  faArrowRight,
  faCheck,
  faClone,
  faPlay,
  faStop,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Spacer, styled, Text } from '@nextui-org/react';
import React from 'react';
import { useCopyToClipboard } from 'react-use';

import { CodeEditor, Tab, Tabs, Tree, TreeNode, TreeNodeRenderer } from '../../../../../components';
import {
  CollectionType,
  GrpcStreamMessage,
  GrpcStreamMessageType,
  Tab as ITab,
} from '../../../../../storage';

export interface StreamResponseProps {
  tab: ITab<CollectionType>;
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
};

export const reponseNodeRenderer: TreeNodeRenderer<GrpcStreamMessage> = (
  data,
  { isOpen, onCollapseToggle }
) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [, copyToClipboard] = useCopyToClipboard();

  const handleCopyButtonClick = () => copyToClipboard(data.value);

  const content = (
    <ContentWrapper>
      {StreamIcons[data.type]}
      <Spacer />
      <Text>{data.id}</Text>
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
      commandsContent={commandsContent}
      isOpen={isOpen}
      onCollapseToggle={onCollapseToggle}
    >
      <div style={{ paddingTop: 10 }}>
        <CodeEditor maxHeight="250px" maxWidth="100%" width="100%" readOnly value={data.value} />
      </div>
    </TreeNode>
  );
};

export const StreamResponse: React.FC<StreamResponseProps> = ({ tab }) => (
  <StyledContainer>
    <Tabs activeKey={tab.data.response.id} activeBar={{ color: 'secondary', position: 'bottom' }}>
      <Tab title="Response" id={tab.data.response.id} key={tab.data.response.id}>
        <ListWrapper>
          <Tree<GrpcStreamMessage>
            data={[]}
            defaultCollapse={false}
            nodeRenderer={reponseNodeRenderer}
          />
        </ListWrapper>
      </Tab>
    </Tabs>
  </StyledContainer>
);
