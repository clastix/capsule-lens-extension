import { Component, K8sApi } from "@k8slens/extensions";
import React, { CSSProperties } from "react";
import { ResourceQuota } from "../kubeobjects/resource-quota";
import { Metrics } from "./metrics";

export interface Props extends Component.KubeObjectDetailsProps<ResourceQuota> {
}

export class ResourceQuotaDetails extends React.Component<Props> {
  render() {
    const { object: resourceQuota } = this.props;
    if (!resourceQuota) return null;

    return (
      <div className="ResourceQuotaDetails">
        <Metrics/>
        
        <Component.DrawerItem name="Created">
          {resourceQuota.getAge(true, false)} ago ({resourceQuota.metadata.creationTimestamp})
        </Component.DrawerItem>
        <Component.DrawerItem name="Name">
          {resourceQuota.getName()}
        </Component.DrawerItem>
      </div>
    );
  }
}
