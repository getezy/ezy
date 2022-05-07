import { faFill } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Button, Container, Input, Modal, ModalProps, Spacer, Text } from '@nextui-org/react';
import React from 'react';
import { useForm } from 'react-hook-form';

import { Circle, ColorPicker } from '../../../components';

export const CreateWorkspaceModal: React.FC<ModalProps> = ({ onClose, ...props }) => {
  const [colorPickerVisible, setColorPickerVisible] = React.useState(false);
  const [color, setColor] = React.useState('#FF8A65');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log('okay', data, errors);

  return (
    <Modal {...props} onClose={onClose} css={{ backgroundColor: '$accents1' }}>
      <Modal.Header>
        <Text>New Workspace</Text>
      </Modal.Header>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
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
              bordered
              size="sm"
              animated={false}
              label="Name"
              clearable
              css={{ flex: 1 }}
              color={errors.name ? 'error' : 'default'}
              {...register('name', { required: true })}
            />
            <Spacer />
            <div style={{ display: 'flex', flexWrap: 'nowrap', alignItems: 'baseline' }}>
              <Circle color={color} />
              <Spacer x={0.25} />
              <ColorPicker
                trigger={<Button auto light size="sm" icon={<FontAwesomeIcon icon={faFill} />} />}
                isOpen={colorPickerVisible}
                onOpenChange={(isVisible) => setColorPickerVisible(isVisible)}
                color={color}
                onColorChange={(newColor) => setColor(newColor.hex)}
              />
            </div>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button auto bordered size="sm" color="error" onClick={onClose}>
            Cancel
          </Button>
          <Button auto bordered size="sm" color="gradient" type="submit">
            Create
          </Button>
        </Modal.Footer>
      </form>
    </Modal>
  );
};
