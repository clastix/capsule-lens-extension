import { Component } from '@k8slens/extensions';
import { IResourceQuotaValues, ResourceQuota } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import React from 'react';
import { controlledByTenant } from '../utils';
import './resource-quota-details.scss';

export type Props = Component.KubeObjectDetailsProps<ResourceQuota>

export const ResourceQuotaDetails: React.FC<Props> = props => {
  const { object: resourceQuota } = props;
  if (!resourceQuota) return null;
  if (!controlledByTenant(resourceQuota)) return null;

  const annotations = resourceQuota.getAnnotations();
  const quotas = parseAnnotations(annotations);

  return (
    <div className='ResourceQuotaDetails custom'>
      <Quotas name='Tenant budget' quotas={quotas} />
    </div>
  );
};

//

type Quotas = {
  used: IResourceQuotaValues;
  hard: IResourceQuotaValues;
}

const Quotas: React.FC<{ name: string, quotas: Quotas }> = props => (
  <Component.DrawerItem name={props.name} className='quota-list'>
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
          <Component.LineProgress
            max={max}
            value={current}
            tooltip={<p>Set: {hard}. Usage: {`${usage}%`}</p>}
          />
        </div>
      );
    })}
  </Component.DrawerItem>
);

//

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

const parseAnnotations = (annotations: string[]) => {
  const quotas: Quotas = { used: {}, hard: {} };
  for (const ann of annotations) {
    if (ann.startsWith('quota.capsule.clastix.io/')) {
      const [key, value] = ann.slice(25).split('=');
      const [scope, name] = key.split('-') as ['used' | 'hard', string];
      quotas[scope][name] = value;
    }
  }
  return quotas;
};
