import { Component } from '@k8slens/extensions';
import React from 'react';
import { Tenant } from '../../tenant';
import { AdditionalRoleBindings } from './additional-role-bindings';
import { AllowList } from './allow-list';
import { Labels } from './labels';
import { LimitRanges } from './limit-ranges';
import { Metadata } from './metadata';
import { NamespacesTable } from './namespaces-table';
import { NetworkPolicies } from './network-policies';
import { ResourceQuotas } from './resource-quotas';
import './style.scss';

export type Props = Component.KubeObjectDetailsProps<Tenant>

export const TenantDetails: React.FC<Props> = props => {
  const { object: tenant } = props;
  if (!tenant) return null;

  const { spec, status } = tenant;

  return (
    <div className='TenantDetails custom'>
      <Component.KubeObjectMeta object={tenant} />
      <Labels name='Node Selector' dict={spec.nodeSelector} />
      <Component.DrawerItem name='Namespace'>
        <Component.DrawerItem name='Quota'>{spec.namespaceQuota}</Component.DrawerItem>
        <Component.DrawerItem name='Count'>{status?.size}</Component.DrawerItem>
      </Component.DrawerItem>
      <Component.DrawerItem name='Owner'>
        <Component.DrawerItem name='Name'>{spec.owner.name}</Component.DrawerItem>
        <Component.DrawerItem name='Kind'>{spec.owner.kind}</Component.DrawerItem>
      </Component.DrawerItem>
      <AllowList name='External Service IPs' value={spec.externalServiceIPs} />
      <AllowList name='Container Registries' value={spec.containerRegistries} />
      <AllowList name='Ingress Classes' value={spec.ingressClasses} />
      <AllowList name='Ingress Hostnames' value={spec.ingressHostnames} />
      <AllowList name='Storage Classes' value={spec.storageClasses} />
      <Metadata name='Namespaces Metadata' value={spec.namespacesMetadata} />
      <Metadata name='Services Metadata' value={spec.servicesMetadata} />
      <ResourceQuotas values={spec.resourceQuotas} />
      <AdditionalRoleBindings values={spec.additionalRoleBindings} />
      <LimitRanges values={spec.limitRanges} />
      <NetworkPolicies values={spec.networkPolicies} />
      <NamespacesTable values={status?.namespaces} />
    </div>
  );
};
