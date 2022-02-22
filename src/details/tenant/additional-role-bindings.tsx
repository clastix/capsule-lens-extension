import { Renderer } from '@k8slens/extensions';
const { Component } = Renderer;
import React from 'react';
import * as tnt from '../../tenant';
import { titleCase } from '../../utils';
import { DrawerTitleToggle } from './drawer-title-toggle';
import { Group } from './groups';
export type Props = {
  values?: tnt.AdditionalRoleBinding[];
};

export const AdditionalRoleBindings: React.FC<Props> = props => {
  if (!props.values)
    return null;

  return (
    <DrawerTitleToggle title='Additional Role Bindings'>
      {props.values.map((binding, i) => (
        <Group key={i}>
          <Component.DrawerItem name='Cluster Role Name'>
            {binding.clusterRoleName}
          </Component.DrawerItem>
          <Component.DrawerItem name='Subjects'>
            {binding.subjects.map((subject, i) => (
              <Group key={i}>
                {Object.entries(subject).map(([key, value]) => (
                  <Component.DrawerItem key={key} name={titleCase(key)}>
                    {value}
                  </Component.DrawerItem>
                ))}
              </Group>
            ))}
          </Component.DrawerItem>
        </Group>
      ))}
    </DrawerTitleToggle>
  );
};
