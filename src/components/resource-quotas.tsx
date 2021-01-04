import { Component, LensRendererExtension } from "@k8slens/extensions";
import { ResourceQuota } from "../kubeobjects/resource-quota";
import { resourceQuotasStore } from "../stores/resource-quotas";
import React from "react";

const enum sortBy {
  name = "name",
  namespace = "namespace",
  age = "age"
}

export class ResourceQuotaPage extends React.Component<{ extension: LensRendererExtension }> {
  render() {
    return (
      <Component.KubeObjectListLayout
        className="ResourceQuotas" store={resourceQuotasStore}
        sortingCallbacks={{
          [sortBy.name]: (resourceQuota: ResourceQuota) => resourceQuota.getName(),
          [sortBy.namespace]: (resourceQuota: ResourceQuota) => resourceQuota.getNs(),
          [sortBy.age]: (resourceQuota: ResourceQuota) => resourceQuota.metadata.creationTimestamp,
        }}
        searchFilters={[
          (resourceQuota: ResourceQuota) => resourceQuota.getSearchFields(),
        ]}
        renderHeaderTitle="Resource Quotas"
        renderTableHeader={[
          { title: "Name", className: "name", sortBy: sortBy.name },
          { title: "Namespace", className: "namespace", sortBy: sortBy.namespace },
          { title: "Age", className: "age", sortBy: sortBy.age },
        ]}
        renderTableContents={(resourceQuota: ResourceQuota) => [
          resourceQuota.getName(),
          resourceQuota.getNs(),
          resourceQuota.getAge()
        ]}
      />
    );
  }
}
