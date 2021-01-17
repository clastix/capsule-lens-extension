import { Component } from '@k8slens/extensions';
import React from 'react';
import * as tnt from '../../tenant';
import { titleCase } from '../../utils';
import { Group } from './groups';

export type Props = {
  values?: tnt.AdditionalRoleBinding[];
};

export const AdditionalRoleBindings: React.FC<Props> = props => {
  if (!props.values)
    return null;

  return (
    <Component.DrawerItem name='Additional Role Bindings'>
      <Component.DrawerParamToggler label={props.values.length}>
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
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};
