import { K8sApi } from '@k8slens/extensions';

export class Tenant extends K8sApi.KubeObject {
  static kind = 'Tenant'
  static namespaced = false
  static apiBase = '/apis/capsule.clastix.io/v1alpha1/tenants'

  kind!: string;
  apiVersion!: string;
  metadata!: TenantMetadata;
  spec!: TenantSpec;
  status!: TenantStatus;
}

//

export type TenantMetadata = {
  name: string;
  selfLink: string;
  uid: string;
  resourceVersion: string;
  creationTimestamp: string;
  annotations: Record<string, string>;
};

export type TenantSpec = {
  additionalRoleBindings?: AdditionalRoleBinding[];
  containerRegistries?: AllowList;
  externalServiceIPs?: { allowed: string[] };
  ingressClasses?: AllowList;
  ingressHostnames?: AllowList;
  limitRanges?: LimitRange[];
  namespaceQuota?: number;
  namespacesMetadata?: Metadata;
  networkPolicies?: NetworkPolicy[];
  nodeSelector?: Record<string, string>;
  owner: Owner;
  resourceQuotas?: ResourceQuota[];
  servicesMetadata?: Metadata;
  storageClasses?: AllowList;
};

export type TenantStatus = {
  size: number;
  namespaces?: string[];
};

//

export type AdditionalRoleBinding = {
  clusterRoleName: string;
  subjects: {
    apiGroup?: string;
    kind: string;
    name: string;
    namespace?: string;
  }[];
};

export type AllowList = {
  allowed?: string[];
  allowedRegex?: string;
};

export type LimitRange = {
  limits: {
    default?: Record<string, string | number>;
    defaultRequest?: Record<string, string | number>;
    max?: Record<string, string | number>;
    maxLimitRequestRatio?: Record<string, string | number>;
    min?: Record<string, string | number>;
    type: string;
  }[];
};

export type Metadata = {
  additionalAnnotations?: Record<string, string>;
  additionalLabels?: Record<string, string>;
};

export type NetworkPolicyDetails = {
  ipBlock?: {
    cidr: string;
    except?: string[];
  };
  namespaceSelector?: Selector;
  podSelector?: Selector;
};

export type NetworkPolicyPort = {
  port?: string | number;
  protocol?: string;
};

export type NetworkPolicyEgress = {
  ports?: NetworkPolicyPort[];
  to?: NetworkPolicyDetails[];
};

export type NetworkPolicyIngress = {
  ports?: NetworkPolicyPort[];
  from?: NetworkPolicyDetails[];
};

export type NetworkPolicy = {
  egress?: NetworkPolicyEgress[];
  ingress?: NetworkPolicyIngress[];
  podSelector: Selector;
  policyTypes?: string[];
};

export type Owner = {
  kind: 'User' | 'Group';
  name: string;
};

export type ResourceQuota = {
  hard?: Record<string, string | number>;
  scopeSelector?: {
    matchExpressions?: {
      operator: string;
      scopeName: string;
      values?: string[];
    }[];
    matchLabels?: Record<string, string>;
  };
  scopes?: string[];
};

export type Selector = {
  matchExpressions?: {
    key: string;
    operator: string;
    values?: string[];
  }[];
  matchLabels?: Record<string, string>;
};
