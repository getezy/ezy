import { faSquarePlus, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Spacer, styled, Table, Text } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { FileInput } from '../../../components';
import { Collection, CollectionType } from '../../../storage';

export interface CollectionFormProps {
  id?: string;

  onSubmit: (payload: Collection<CollectionType>) => void;
}

const PathComponeent = styled(Text, {
  overflowX: 'auto',
  overflowY: 'hidden',
  flex: 1,
});

export const CollectionForm: React.FC<CollectionFormProps> = ({ onSubmit = () => {}, id }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Collection<CollectionType>>();

  return (
    <form id={id} onSubmit={handleSubmit(onSubmit)}>
      <Container gap={0} css={{ display: 'flex', flexDirection: 'column' }}>
        <Input
          autoFocus
          bordered
          borderWeight="light"
          size="sm"
          animated={false}
          label="Name"
          clearable
          color={errors.name ? 'error' : 'default'}
          {...register('name', { required: true })}
        />
        <Spacer />
        <FileInput
          bordered
          borderWeight="light"
          buttonColor="gradient"
          size="sm"
          animated={false}
          label="Protobuf path"
          accept=".proto"
          readOnly
        />
        <Spacer />
        <div style={{ display: 'flex' }}>
          <Text weight="normal" size={14} css={{ userSelect: 'none', paddingLeft: 4 }}>
            Include directories
          </Text>
          <Spacer />
          <Button
            auto
            bordered
            borderWeight="light"
            size="xs"
            color="success"
            icon={<FontAwesomeIcon icon={faSquarePlus} />}
          >
            Add path
          </Button>
        </div>
        <Spacer y={0.3} />
        <Table fixed bordered borderWeight="light" selectionMode="single" color="primary">
          <Table.Header>
            <Table.Column>Path</Table.Column>
          </Table.Header>
          <Table.Body>
            <Table.Row>
              <Table.Cell key="1" css={{ display: 'flex', alignItems: 'center' }}>
                <PathComponeent small>
                  /Users/notmedia/some/work/folder/path/to/proto/service
                </PathComponeent>
                <Spacer y={0} />
                <Button
                  size="xs"
                  bordered
                  borderWeight="light"
                  color="error"
                  icon={<FontAwesomeIcon icon={faTrash} />}
                  css={{ marginLeft: 'auto', minWidth: 10 }}
                />
              </Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Container>
    </form>
  );
};
