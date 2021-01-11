import { K8sApi } from '@k8slens/extensions';
import { Tenant } from './tenant';

export class TenantsApi extends K8sApi.KubeApi<Tenant> {
}

export const tenantsApi = new TenantsApi({
  objectConstructor: Tenant
});

export class TenantStore extends K8sApi.KubeObjectStore<Tenant> {
  api = tenantsApi
}

export const tenantStore = new TenantStore();
K8sApi.apiManager.registerStore(tenantStore);
