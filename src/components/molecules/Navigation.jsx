import React from 'react'
import { Button } from 'semantic-ui-react';
import { Input } from '../atoms/Input/Input';

export const Navigation = ({ onChange, settings, onGenerate }) => {
  return (
    <div className="navigation">
      <Input onChange={onChange} value={settings.rows} name="rows" label="Rows" />
      <Input onChange={onChange} value={settings.columns} name="columns" label="Columns" />
      <Input onChange={onChange} value={settings.winPoints} name="winPoints" label="Wictory points" />
      <Button primary onClick={onGenerate}>Generate game</Button>
    </div>
  )
}
