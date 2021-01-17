import { Component } from '@k8slens/extensions';
import React from 'react';
import { LimitRange } from '../../tenant';
import { titleCase } from '../../utils';

export type Props = {
  values?: LimitRange[];
};

export const LimitRanges: React.FC<Props> = props => {
  if (!props.values)
    return null;

  return (
    <Component.DrawerItem name='Limit Ranges'>
      <Component.DrawerParamToggler label={props.values.length}>
        {props.values.map(({ limits }, i) => (
          <div key={i} className='group'>
            {limits.map(({ type, ...rest }) => (
              <div key={type} className='group'>
                <Component.DrawerItem name='Type'>
                  {type}
                </Component.DrawerItem>
                {Object.entries(rest).map(([scope, limits]) => (
                  <Component.DrawerItem key={scope} name={titleCase(scope)}>
                    {Object.entries(limits).map(([name, value]) => (
                      <Component.DrawerItem key={name} name={titleCase(name)}>
                        {value as string}
                      </Component.DrawerItem>
                    ))}
                  </Component.DrawerItem>
                ))}
              </div>
            ))}
          </div>
        ))}
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};
