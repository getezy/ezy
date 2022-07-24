import { faStop } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Loading, Spacer } from '@nextui-org/react';
import React from 'react';

import { GrpcMethodType } from '../../../../../../core/protobuf/interfaces';
import { useCollectionsStore, useTabsStore } from '../../../../../storage';
import { SendHeader, SendHeaderProps } from './send-header.basic';

export const StreamSendHeader: React.FC<SendHeaderProps<GrpcMethodType.SERVER_STREAMING>> = ({
  tab,
}) => {
  const { updateTab } = useTabsStore((store) => store);
  const collections = useCollectionsStore((store) => store.collections);

  const [isLoading, setIsLoading] = React.useState(false);
  const [callId, setCallId] = React.useState<string | null>(null);

  const handleSendButtonClick = async () => {
    try {
      setIsLoading(true);
      const collection = collections.find((item) => item.id === tab.info.collectionId);
      const service = collection?.children?.find((item) => item.id === tab.info.serviceId);
      const method = service?.methods?.find((item) => item.id === tab.info.methodId);

      if (collection && service && method && tab.data.url && tab.data.url.length > 0) {
        if (method.type === GrpcMethodType.SERVER_STREAMING) {
          const id = await window.clients.grpc.serverStreaming.invoke(
            collection.options,
            { serviceName: service.name, methodName: method.name, address: tab.data.url },
            JSON.parse(tab.data.requestTabs.request.value || '{}'),
            JSON.parse(tab.data.requestTabs.metadata.value || '{}'),
            (data) => {
              updateTab({
                ...tab,
                data: {
                  ...tab.data,
                  response: {
                    ...tab.data.response,
                    value: JSON.stringify(data, null, 2),
                  },
                },
              });
            },
            (error) => {
              console.log('stream error: ', error);
              setIsLoading(false);
            },
            () => {
              console.log('stream ended');
              setIsLoading(false);
            }
          );

          setCallId(id);
        }
      }
    } catch (error) {
      console.log('error: ', error);
      setIsLoading(false);
    }
  };

  const handleCancelButtonClick = async () => {
    if (callId) {
      await window.clients.grpc.serverStreaming.cancel(callId);
      setCallId(null);
      setIsLoading(false);
    }
  };

  return (
    <SendHeader tab={tab}>
      {isLoading && (
        <>
          <Spacer x={0.5} />
          <Button
            size="sm"
            color="error"
            bordered
            borderWeight="light"
            css={{ minWidth: 10 }}
            icon={<FontAwesomeIcon icon={faStop} />}
            onClick={handleCancelButtonClick}
          />
        </>
      )}
      <Spacer x={0.5} />
      <Button
        size="sm"
        bordered
        borderWeight="light"
        color="gradient"
        disabled={isLoading}
        css={{ minWidth: 60 }}
        onClick={handleSendButtonClick}
      >
        {isLoading ? <Loading type="gradient" color="currentColor" size="xs" /> : 'Invoke'}
      </Button>
    </SendHeader>
  );
};
