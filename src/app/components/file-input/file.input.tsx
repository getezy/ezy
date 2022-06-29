import { Input, styled } from '@nextui-org/react';
import React from 'react';

const StyledFileInput = styled(Input, {});

export const FileInput: React.FC = () => <StyledFileInput type="file" />;
