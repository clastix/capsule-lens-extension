import { K8sApi } from "@k8slens/extensions";
import { ResourceQuota } from "../kubeobjects/resource-quota";

export class ResourceQuotaApi extends K8sApi.KubeApi<ResourceQuota> {
}

export const resourceQuotaApi = new ResourceQuotaApi({
  objectConstructor: ResourceQuota
});

export class ResourceQuotasStore extends K8sApi.KubeObjectStore<ResourceQuota> {
  api = resourceQuotaApi
}

export const resourceQuotasStore = new ResourceQuotasStore();
K8sApi.apiManager.registerStore(resourceQuotasStore);
