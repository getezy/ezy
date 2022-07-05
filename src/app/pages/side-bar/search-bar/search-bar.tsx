import { Input, styled } from '@nextui-org/react';
import React from 'react';

const SearchBarWrapper = styled('div', {});

export const SearchBar: React.FC = () => (
  <SearchBarWrapper>
    <Input
      bordered
      borderWeight="light"
      fullWidth
      animated={false}
      placeholder="Search..."
      clearable
      size="sm"
      css={{
        padding: 10,
      }}
    />
  </SearchBarWrapper>
);
