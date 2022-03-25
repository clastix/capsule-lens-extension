import { Renderer } from '@k8slens/extensions';
import { IResourceQuotaValues } from '@k8slens/extensions/dist/src/common/k8s-api/endpoints';
import React from 'react';

export type Quotas = {
  used: IResourceQuotaValues,
  hard: IResourceQuotaValues;
};

export type Props = {
  name: string;
  quotas: Quotas;
};

export const Quotas: React.FC<Props> = props => (
  <Renderer.Component.DrawerItem name={props.name} className='quota-list'>
    {Object.keys(props.quotas.hard).map(name => {
      const used = props.quotas.used[name];
      const hard = props.quotas.hard[name];

      const current = parseValue(name, used);
      const max = parseValue(name, hard);
      const usage = max === 0 ? 100 : Math.ceil(current/max*100);

      return (
        <div key={name} className='param'>
          <span className='title'>{name}</span>
          <span className='value'>{used} / {hard}</span>
          <Renderer.Component.LineProgress
            max={max}
            value={current}
            tooltip={<p>Set: {hard}. Usage: {`${usage}%`}</p>}
          />
        </div>
      );
    })}
  </Renderer.Component.DrawerItem>
);

const parsePower = (re: RegExp, chars: string, value: string) => {
  const unit = re.exec(value);
  return unit ? chars.indexOf(unit[0]) + 1 : 0;
};

const parseValue = (name: string, value: string) => {
  const num = parseFloat(value);
  if (/memory|storage/.test(name))
    return num*1024**parsePower(/[KMGTPE]/, 'KMGTPE', value);
  if (/cpu/.test(name))
    return num/1000**parsePower(/[mun]/, 'mun', value);
  return num*1000**parsePower(/[kmgtq]/, 'kmgtq', value);
};
