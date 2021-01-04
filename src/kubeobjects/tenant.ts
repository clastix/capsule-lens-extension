import { K8sApi } from "@k8slens/extensions";

export class Tenant extends K8sApi.KubeObject {
  static kind = "Tenant"
  static namespaced = false
  static apiBase = "/apis/capsule.clastix.io/v1alpha1/tenants"

  kind: string
  apiVersion: string
  metadata: {
    name: string;
    selfLink: string;
    uid: string;
    resourceVersion: string;
    creationTimestamp: string;
    annotations: {
      [key: string]: string;
    };
  }
  spec: {
    ingressClasses: {
      allowed: string[],
      allowedRegex: string
    },
    limitRanges: {
      limits: {
        default?: { cpu: string, memory: string },
        defaultRequest?: { cpu: string, memory: string },
        max: { cpu: string, memory: string },
        min: { cpu: string, memory: string },
        type: string
      }[]
    }[],
    namespaceQuota: number,
    owner: {
      kind: string,
      name: string
    },
    resourceQuotas: {
      hard: {
        [key: string]: string;
      },
      scopes: string[]
    }[],
    storageClasses: {
      allowed: string[],
      allowedRegex: string
    },
    nodeSelector: {
      [key: string]: string;
    }
  }
  status: {
    size: number
  }
}
