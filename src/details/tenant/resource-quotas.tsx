import { Component } from '@k8slens/extensions';
import React from 'react';
import { ResourceQuota } from '../../tenant';
import { DrawerTitleToggle } from './drawer-title-toggle';
import { Group } from './groups';
import { Labels } from './labels';

export type Props = {
  values?: ResourceQuota[];
};

export const ResourceQuotas: React.FC<Props> = props => {
  if (!props.values)
    return null;

  return (
    <DrawerTitleToggle title='Resource Quotas'>
      {props.values.map((rq, i) => (
        <Group key={i}>
          <Labels name='Scopes' values={rq.scopes || []} />
          <Component.DrawerItem name='Hard'>
            {Object.entries(rq.hard || {}).map(([key, value]) => (
              <Component.DrawerItem key={key} name={key}>
                {value}
              </Component.DrawerItem>
            ))}
          </Component.DrawerItem>
        </Group>
      ))}
    </DrawerTitleToggle>
  );
};
