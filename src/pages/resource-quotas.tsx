import { Renderer } from '@k8slens/extensions';
import React from 'react';
import { Tenant } from '../tenant';
import { controlledByTenant } from '../utils';
import './resource-quotas.scss';

const {apiManager, resourceQuotaApi} = Renderer.K8sApi;
type ResourceQuota = Renderer.K8sApi.ResourceQuota;
type ResourceQuotasStore = Renderer.K8sApi.ResourceQuotasStore;

const enum sortBy {
  name = 'name',
  namespace = 'namespace',
  controlledBy = 'controlled-by',
  age = 'age'
}

const resourceQuotasStore: ResourceQuotasStore =  (apiManager.getStore(resourceQuotaApi) as ResourceQuotasStore);

const getTenantName = (resourceQuota: ResourceQuota) =>
  resourceQuota
    .getOwnerRefs()
    .find(ref => ref.kind === Tenant.kind)!
    .name;

export const CustomResourceQuotaPage: React.FC<{ extension: Renderer.LensExtension }> = () => (
  <Renderer.Component.KubeObjectListLayout
    className='ResourceQuotas custom'
    store={resourceQuotasStore}
    items={resourceQuotasStore.items.filter(controlledByTenant)}
    isSelectable={false}
    sortingCallbacks={{
      [sortBy.name]: (resourceQuota: ResourceQuota) => resourceQuota.getName(),
      [sortBy.namespace]: (resourceQuota: ResourceQuota) => resourceQuota.getNs(),
      [sortBy.controlledBy]: getTenantName,
      [sortBy.age]: (resourceQuota: ResourceQuota) => resourceQuota.metadata.creationTimestamp
    }}
    searchFilters={[
      (resourceQuota: ResourceQuota) => resourceQuota.getSearchFields()
    ]}
    renderHeaderTitle='Resource Quotas'
    renderTableHeader={[
      { title: 'Name', className: 'name', sortBy: sortBy.name },
      { title: 'Namespace', className: 'namespace', sortBy: sortBy.namespace },
      { title: 'Controlled By', className: 'controlled-by', sortBy: sortBy.controlledBy },
      { title: 'Age', className: 'age', sortBy: sortBy.age }
    ]}
    renderTableContents={(resourceQuota: ResourceQuota) => [
      resourceQuota.getName(),
      resourceQuota.getNs(),
      getTenantName(resourceQuota),
      resourceQuota.getAge()
    ]}
  />
);
