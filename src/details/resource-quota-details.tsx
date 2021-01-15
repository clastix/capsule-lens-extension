import { Component } from '@k8slens/extensions';
import { ResourceQuota } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import React from 'react';
import { controlledByTenant } from '../utils';
import './resource-quota-details.scss';

export type Props = Component.KubeObjectDetailsProps<ResourceQuota>

export const ResourceQuotaDetails: React.FC<Props> = props => {
  const { object: resourceQuota } = props;
  if (!resourceQuota) return null;
  if (!controlledByTenant(resourceQuota)) return null;

  return (
    <div className='ResourceQuotaDetails custom'>
      <Component.DrawerItem name='Tenant Budget'>
        TODO
      </Component.DrawerItem>
    </div>
  );
};
