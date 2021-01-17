import { Component } from '@k8slens/extensions';
import React from 'react';
import * as tnt from '../../tenant';
import { Labels } from './labels';

export type Props = {
  name: string;
  value?: tnt.Metadata;
};

export const Metadata: React.FC<Props> = props => {
  if (!props.value)
    return null;

  return (
    <Component.DrawerItem name={props.name}>
      <Labels
        name='Additional Annotations'
        dict={props.value.additionalAnnotations}
      />
      <Labels
        name='Additional Labels'
        dict={props.value.additionalLabels}
      />
    </Component.DrawerItem>
  );
};
