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
  '&::-webkit-scrollbar': {
    height: 2,
  },
  '&::-webkit-scrollbar-track': {
    backgroundColor: '$accents1',
  },
  '&::-webkit-scrollbar-thumb': {
    boxShadow: 'inset 0 0 6px',
    color: '$accents5',
  },
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
        <Container
          fluid
          gap={0}
          css={{
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}
        >
          <Input
            autoFocus
            bordered
            borderWeight="light"
            size="sm"
            animated={false}
            label="Name"
            clearable
            css={{ flex: 1 }}
            color={errors.name ? 'error' : 'default'}
            {...register('name', { required: true })}
          />
        </Container>
        <Spacer />
        <FileInput />
        <Spacer />
        <div style={{ display: 'flex' }}>
          <Text weight="normal" size={14} css={{ userSelect: 'none', paddingLeft: 4 }}>
            Include directories
          </Text>
          <Spacer />
          <Button auto size="xs" color="success" icon={<FontAwesomeIcon icon={faSquarePlus} />}>
            Add path
          </Button>
        </div>
        <Spacer />
        <Container gap={0}>
          <Table fixed bordered borderWeight="light" selectionMode="single" color="primary">
            <Table.Header>
              <Table.Column>Path</Table.Column>
            </Table.Header>
            <Table.Body>
              <Table.Row>
                <Table.Cell key="1" css={{ display: 'flex', alignItems: 'center' }}>
                  <PathComponeent small>
                    Users/notmedia/some/work/folder/path/to/proto/service/main.proto
                  </PathComponeent>
                  <Spacer y={0} />
                  <Button
                    size="xs"
                    color="error"
                    icon={<FontAwesomeIcon icon={faTrash} />}
                    css={{ marginLeft: 'auto', minWidth: 10 }}
                  />
                </Table.Cell>
              </Table.Row>
            </Table.Body>
          </Table>
        </Container>
      </Container>
    </form>
  );
};
