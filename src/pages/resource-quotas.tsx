import { Component, K8sApi, LensRendererExtension } from '@k8slens/extensions';
import { ResourceQuota } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import React from 'react';
import { controlledByTenant } from '../utils';
import './resource-quotas.scss';

const enum sortBy {
  name = 'name',
  namespace = 'namespace',
  age = 'age'
}

const resourceQuotasStore: K8sApi.KubeObjectStore<ResourceQuota> =
  K8sApi.apiManager.getStore(K8sApi.resourceQuotaApi);

export const CustomResourceQuotaPage: React.FC<{ extension: LensRendererExtension }> = () => (
  <Component.KubeObjectListLayout
    className='CustomResourceQuotaPage'
    store={resourceQuotasStore}
    filterItems={[
      items => items.filter(controlledByTenant)
    ]}
    sortingCallbacks={{
      [sortBy.name]: (resourceQuota: ResourceQuota) => resourceQuota.getName(),
      [sortBy.namespace]: (resourceQuota: ResourceQuota) => resourceQuota.getNs(),
      [sortBy.age]: (resourceQuota: ResourceQuota) => resourceQuota.metadata.creationTimestamp
    }}
    searchFilters={[
      (resourceQuota: ResourceQuota) => resourceQuota.getSearchFields()
    ]}
    renderHeaderTitle='Resource Quotas'
    renderTableHeader={[
      { title: 'Name', className: 'name', sortBy: sortBy.name },
      { title: 'Namespace', className: 'namespace', sortBy: sortBy.namespace },
      { title: 'Age', className: 'age', sortBy: sortBy.age }
    ]}
    renderTableContents={(resourceQuota: ResourceQuota) => [
      resourceQuota.getName(),
      resourceQuota.getNs(),
      resourceQuota.getAge()
    ]}
  />
);
