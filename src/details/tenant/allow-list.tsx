import { Component } from '@k8slens/extensions';
import React from 'react';
import * as tnt from '../../tenant';
import { Labels } from './labels';

export type Props = {
  name: string;
  value?: tnt.AllowList;
};

export const AllowList: React.FC<Props> = props => {
  if (!props.value)
    return null;

  return (
    <Component.DrawerItem name={props.name}>
      <Labels name='Allowed' values={props.value.allowed || []} />
      {props.value.allowedRegex && (
        <Component.DrawerItem labelsOnly name='Allowed Regex'>
          <Component.Badge className='mono' label={props.value.allowedRegex} />
        </Component.DrawerItem>
      )}
    </Component.DrawerItem>
  );
};
