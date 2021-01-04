import { Component, LensRendererExtension } from "@k8slens/extensions";
import { ClusterPageMenuRegistration, KubeObjectDetailRegistration, PageRegistration } from "@k8slens/extensions/dist/src/extensions/registries";
import React from "react";
import { ResourceQuotaPage } from "./components/resource-quotas";
import { ResourceQuotaDetails } from "./components/resource-quota-details";
import { TenantDetails } from "./components/tenant-details";
import { TenantPage } from "./components/tenants";
import { ResourceQuota } from "./kubeobjects/resource-quota";
import { Tenant } from "./kubeobjects/tenant";

const enum id {
  capsule = "capsule",
  tenants = "tenants",
  resourceBudget = "resourcebudget"
}

export const Icon = (props: Component.IconProps) =>
  <Component.Icon {...props} material="lens" tooltip="Capsule"/>

export default class CrdSampleExtension extends LensRendererExtension {
  clusterPages: PageRegistration[] = [
    {
      id: id.tenants,
      components: {
        Page: () => <TenantPage extension={this} />
      }
    },
    {
      id: id.resourceBudget,
      components: {
        Page: () => <ResourceQuotaPage extension={this} />
      }
    },
  ];

  clusterPageMenus: ClusterPageMenuRegistration[] = [
    {
      id: id.capsule,
      title: "Capsule",
      components: { Icon }
    },
    {
      parentId: id.capsule,
      target: { pageId: id.tenants },
      title: "Tenants",
      components: { Icon }
    },
    {
      parentId: id.capsule,
      target: { pageId: id.resourceBudget },
      title: "Resource Budget",
      components: { Icon }
    },
  ];

  kubeObjectDetailItems: KubeObjectDetailRegistration[] = [
    {
      kind: Tenant.kind,
      apiVersions: ["capsule.clastix.io/v1alpha1"],
      components: {
        Details: TenantDetails
      }
    },
    {
      kind: ResourceQuota.kind,
      apiVersions: ["v1"],
      components: {
        Details: ResourceQuotaDetails
      }
    },
  ];
}
