import React from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';
import './input.scss';

export const Input = ({ placeholder, onChange, value, label, name }) => {
  return (
    <SemanticInput
      type='number'
      min='1'
      max='9'
      size='small'
      placeholder={placeholder}
      onChange={({ currentTarget: { value }}) => onChange(value, name)}
      value={value}
      label={{ basic: true, content: label }}
      labelPosition='left'
    />
  )
}
