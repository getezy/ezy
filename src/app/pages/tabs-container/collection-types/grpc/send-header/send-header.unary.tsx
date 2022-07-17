import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Loading, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { CollectionType, useCollectionsStore, useTabsStore } from '../../../../../storage';
import { SendButton } from './send-button.styled';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const UnarySendHeader: React.FC<SendHeaderProps> = ({ tab }) => {
  const { updateTab } = useTabsStore((store) => store);
  const collections = useCollectionsStore((store) => store.collections);

  const [isLoading, setIsLoading] = React.useState(false);

  const handleSendButtonClick = async () => {
    if (tab.type === CollectionType.GRPC) {
      try {
        setIsLoading(true);
        const collection = collections.find((item) => item.id === tab.info.collectionId);
        const service = collection?.children?.find((item) => item.id === tab.info.serviceId);
        const method = service?.methods?.find((item) => item.id === tab.info.methodId);

        if (collection && service && method && tab.url && tab.url.length > 0) {
          if (method.type === GrpcMethodType.UNARY) {
            const result = await window.clients.grpc.unary.invoke(
              collection.options,
              { serviceName: service.name, methodName: method.name, address: tab.url },
              JSON.parse(tab.requestContainer.request.value || '{}'),
              JSON.parse(tab.requestContainer.metadata.value || '{}')
            );

            updateTab({
              ...tab,
              response: {
                ...tab.response,
                value: JSON.stringify(result, null, 2),
              },
            });
          }
        }
      } catch (error) {
        console.log('error: ', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <SendHeader tab={tab}>
      <Spacer x={0.5} />
      <SendButton
        size="sm"
        bordered
        borderWeight="light"
        color="gradient"
        iconRight={<FontAwesomeIcon icon={faPaperPlane} />}
        onClick={handleSendButtonClick}
      >
        {isLoading ? <Loading type="gradient" color="currentColor" size="xs" /> : 'Send'}
      </SendButton>
    </SendHeader>
  );
};
