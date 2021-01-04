import { Component, LensRendererExtension } from "@k8slens/extensions";
import React from "react";
import { tenantsStore } from "../stores/tenants";
import { Tenant } from "../kubeobjects/tenant"

const enum sortBy {
  name = "name",
  namespaceQuota = "namespacequota",
  ownerName = "ownername",
  ownerKind = "ownerkind",
  age = "age",
}

export class TenantPage extends React.Component<{ extension: LensRendererExtension }> {
  render() {
    return (
      <Component.KubeObjectListLayout
        className="Tenants" store={tenantsStore}
        sortingCallbacks={{
          [sortBy.name]: (tenant: Tenant) => tenant.getName(),
          [sortBy.namespaceQuota]: (tenant: Tenant) => tenant.spec.namespaceQuota,
          [sortBy.ownerName]: (tenant: Tenant) => tenant.spec.owner.name,
          [sortBy.ownerKind]: (tenant: Tenant) => tenant.spec.owner.kind,
          [sortBy.age]: (tenant: Tenant) => tenant.metadata.creationTimestamp,
        }}
        searchFilters={[
          (tenant: Tenant) => tenant.getSearchFields(),
        ]}
        renderHeaderTitle="Tenants"
        renderTableHeader={[
          { title: "Name", className: "name", sortBy: sortBy.name },
          { title: "Namespace Quota", className: "namespace-quota", sortBy: sortBy.namespaceQuota },
          { title: "Namespace Count", className: "namespace-count" },
          { title: "Owner Name", className: "owner-name", sortBy: sortBy.ownerName },
          { title: "Owner Kind", className: "owner-kind", sortBy: sortBy.ownerKind },
          { title: "Age", className: "age", sortBy: sortBy.name },
        ]}
        renderTableContents={(tenant: Tenant) => [
          tenant.getName(),
          tenant.spec.namespaceQuota,
          '???',
          tenant.spec.owner.name,
          tenant.spec.owner.kind,
          tenant.getAge()
        ]}
      />
    )
  }
}
