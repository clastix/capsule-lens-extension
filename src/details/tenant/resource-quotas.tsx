import { Renderer } from '@k8slens/extensions';
const { Component } = Renderer;
import React from 'react';
import * as tnt from '../../tenant';
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
          {renderSelector(rq.scopeSelector)}
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

const renderSelector = (selector?: tnt.ResourceQuota['scopeSelector']) => (
  selector && (
    <Component.DrawerItem name='Scope Selector'>
      <Component.DrawerItem name='Match Expressions'>
        {selector.matchExpressions?.map((expr, i) => (
          <Group key={i}>
            <Component.DrawerItem name='Operator'>
              {expr.operator}
            </Component.DrawerItem>
            <Component.DrawerItem name='Scope Name'>
              {expr.scopeName}
            </Component.DrawerItem>
            <Labels name='Values' values={expr.values} />
          </Group>
        ))}
      </Component.DrawerItem>
      <Labels name='Match Labels' dict={selector.matchLabels} />
    </Component.DrawerItem>
  )
);
