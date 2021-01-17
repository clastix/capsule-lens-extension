import { Component } from '@k8slens/extensions';
import React from 'react';
import * as tnt from '../../tenant';
import { Labels } from './labels';

export type Props = {
  values?: tnt.NetworkPolicy[];
};

export const NetworkPolicies: React.FC<Props> = props => {
  if (!props.values)
    return null;

  return (
    <Component.DrawerItem name='Network Policies'>
      <Component.DrawerParamToggler label={props.values.length}>
        {props.values.map(np => <>
          <Labels name='Policy Types' values={np.policyTypes} />
          <Component.DrawerItem name='Pod Selector'>
            <JsonView json={np.podSelector} />
          </Component.DrawerItem>
          <Component.DrawerItem name='Egress'>
            <JsonView json={np.egress} />
          </Component.DrawerItem>
          <Component.DrawerItem name='Ingress'>
            <JsonView json={np.ingress} />
          </Component.DrawerItem>
        </>)}
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};

const JsonView: React.FC<{ json?: unknown }> = props =>
  <Component.Input multiLine theme='round-black' className='JsonView'
    value={JSON.stringify(props.json, null, 2)} />;
