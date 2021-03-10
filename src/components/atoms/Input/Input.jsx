import React from 'react';
import { Input as SemanticInput } from 'semantic-ui-react';
import './input.scss';

export const Input = ({ placeholder, onChange, value, label, name, min }) => {
  return (
    <SemanticInput
      type='number'
      min={min}
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
