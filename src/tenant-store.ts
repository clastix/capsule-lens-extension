import { Renderer } from '@k8slens/extensions';
import { Tenant } from './tenant';

export class TenantsApi extends Renderer.K8sApi.KubeApi<Tenant> {
}

export const tenantsApi = new TenantsApi({
  objectConstructor: Tenant
});

export class TenantStore extends Renderer.K8sApi.KubeObjectStore<Tenant> {
  api = tenantsApi
}

export const tenantStore = new TenantStore();
Renderer.K8sApi.apiManager.registerStore(tenantStore);
