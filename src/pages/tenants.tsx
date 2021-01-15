import { Component, K8sApi, LensRendererExtension } from '@k8slens/extensions';
import { Namespace } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import React from 'react';
import { Tenant } from '../tenant';
import { tenantStore } from '../tenant-store';
import './tenants.scss';

const enum sortBy {
  name = 'name',
  namespaceQuota = 'namespacequota',
  namespaceCount = 'namespacecount',
  ownerName = 'ownername',
  ownerKind = 'ownerkind',
  age = 'age',
}

const nsStore: K8sApi.KubeObjectStore<Namespace> =
  K8sApi.apiManager.getStore(K8sApi.namespacesApi);

export const CustomTenantPage: React.FC<{ extension: LensRendererExtension }> = () => (
  <Component.KubeObjectListLayout
    className='Tenants custom'
    store={tenantStore}
    dependentStores={[nsStore]}
    isClusterScoped={true}
    sortingCallbacks={{
      [sortBy.name]: (tenant: Tenant) => tenant.getName(),
      [sortBy.namespaceQuota]: (tenant: Tenant) => tenant.spec.namespaceQuota || 0,
      [sortBy.namespaceCount]: (tenant: Tenant) => tenant.status.size,
      [sortBy.ownerName]: (tenant: Tenant) => tenant.spec.owner.name,
      [sortBy.ownerKind]: (tenant: Tenant) => tenant.spec.owner.kind,
      [sortBy.age]: (tenant: Tenant) => tenant.metadata.creationTimestamp
    }}
    searchFilters={[
      (tenant: Tenant) => tenant.getSearchFields()
    ]}
    renderHeaderTitle='Tenants'
    renderTableHeader={[
      { title: 'Name', className: 'name', sortBy: sortBy.name },
      { title: 'Namespace Quota', className: 'namespace-quota', sortBy: sortBy.namespaceQuota },
      { title: 'Namespace Count', className: 'namespace-count', sortBy: sortBy.namespaceCount },
      { title: 'Owner Name', className: 'owner-name', sortBy: sortBy.ownerName },
      { title: 'Owner Kind', className: 'owner-kind', sortBy: sortBy.ownerKind },
      { title: 'Node Selector', className: 'node-selector' },
      { title: 'Age', className: 'age', sortBy: sortBy.name }
    ]}
    renderTableContents={(tenant: Tenant) => [
      tenant.getName(),
      tenant.spec.namespaceQuota,
      tenant.status.size,
      tenant.spec.owner.name,
      tenant.spec.owner.kind,
      renderLabels(tenant.spec.nodeSelector),
      tenant.getAge()
    ]}
  />
);

const renderLabels = (labels?: Record<string, string>) =>
  labels && Object.entries(labels || {})
    .map(([key, value]) => `${key}=${value}`)
    .map(label => <Component.Badge key={label} label={label}/>);
