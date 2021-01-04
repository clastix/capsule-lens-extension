import { K8sApi } from "@k8slens/extensions";
import { Tenant } from "../kubeobjects/tenant";

export class TenantsApi extends K8sApi.KubeApi<Tenant> {
}

export const tenantsApi = new TenantsApi({
  objectConstructor: Tenant
});

export class TenantsStore extends K8sApi.KubeObjectStore<Tenant> {
  api = tenantsApi
}

export const tenantsStore = new TenantsStore();
K8sApi.apiManager.registerStore(tenantsStore);