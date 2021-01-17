import { Component } from '@k8slens/extensions';
import React from 'react';
import * as tnt from '../../tenant';
import { titleCase } from '../../utils';

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
          <div key={i} className='group'>
            <Component.DrawerItem name='Cluster Role Name'>
              {binding.clusterRoleName}
            </Component.DrawerItem>
            <Component.DrawerItem name='Subjects'>
              {binding.subjects.map((subject, i) => (
                <div key={i} className='group'>
                  {Object.entries(subject).map(([key, value]) => (
                    <Component.DrawerItem key={key} name={titleCase(key)}>
                      {value}
                    </Component.DrawerItem>
                  ))}
                </div>
              ))}
            </Component.DrawerItem>
          </div>
        ))}
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};
