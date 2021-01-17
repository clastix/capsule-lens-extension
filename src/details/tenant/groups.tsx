import React from 'react';

export const Group: React.FC = props => (
  <div className='group'>{props.children}</div>
);

export const VGroup: React.FC = props => (
  <div className='vgroup'>{props.children}</div>
);

export const VGroupItem: React.FC<{ title: string }> = props => <>
  <div className='title'>{props.title}</div>
  <div className='content'>{props.children}</div>
</>;
