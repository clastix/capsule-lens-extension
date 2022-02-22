import { Renderer, Main } from '@k8slens/extensions';
import React from 'react';
import { controlledByTenant } from '../../utils';
import { Quotas } from './quotas';
import './style.scss';

export type Props = Renderer.Component.KubeObjectDetailsProps<Main.K8sApi.ResourceQuota>

export const ResourceQuotaDetails: React.FC<Props> = props => {
  const { object: resourceQuota } = props;
  if (!resourceQuota) return null;
  if (!controlledByTenant(resourceQuota)) return null;

  const annotations = resourceQuota.getAnnotations();
  const quotas = parseAnnotations(annotations);

  return (
    <div className='ResourceQuotaDetails custom'>
      <Quotas name='Tenant Budget' quotas={quotas} />
    </div>
  );
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
