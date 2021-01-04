import { Component } from "@k8slens/extensions";
import React from "react";
import { Tenant } from "../kubeobjects/tenant";
import { Metrics } from "./metrics";

export interface Props extends Component.KubeObjectDetailsProps<Tenant> {
}

export class TenantDetails extends React.Component<Props> {
  render() {
    const { object: tenant } = this.props;
    if (!tenant) return null;

    const resourceQuotas = tenant.spec.resourceQuotas
      .flatMap(rq => Object.entries(rq.hard))

    return (
      <div className="TenantDetails">
        <Metrics/>
        
        <Component.DrawerItem name="Created">
          {tenant.getAge(true, false)} ago ({tenant.metadata.creationTimestamp})
        </Component.DrawerItem>
        <Component.DrawerItem name="Name">
          {tenant.getName()}
        </Component.DrawerItem>
        <Component.DrawerItem name="Annotations">
          {tenant.getAnnotations().map(ann => <Component.Badge>{ann}</Component.Badge>)}
        </Component.DrawerItem>
        <Component.DrawerItem name="Namespace quota">
          {tenant.spec.namespaceQuota}
        </Component.DrawerItem>
        <Component.DrawerItem name="Namespace count">
          ???
        </Component.DrawerItem>
        <Component.DrawerItem name="Owner name">
          {tenant.spec.owner.name}
        </Component.DrawerItem>
        <Component.DrawerItem name="Owner kind">
          {tenant.spec.owner.kind}
        </Component.DrawerItem>
        <Component.DrawerItem name="Node selector">
          <Component.Input 
            multiLine
            theme="round-black"
            value={JSON.stringify(tenant.spec.nodeSelector, null, 2)}
          />
        </Component.DrawerItem>
        <Component.DrawerItem name="Resource Quotas">
          <Component.DrawerParamToggler label={resourceQuotas.length}>
            {resourceQuotas.map(([name, value]) => (
              <>
                {name}: {value}
                <Component.LineProgress max={100} value={50} />
              </>
            ))}
          </Component.DrawerParamToggler>
        </Component.DrawerItem>

        <Component.DrawerTitle title="Namespaces" />
        <Component.Table>
          <Component.TableHead>
            <Component.TableCell>Name</Component.TableCell>
            <Component.TableCell>Labels</Component.TableCell>
            <Component.TableCell>Age</Component.TableCell>
            <Component.TableCell>Status</Component.TableCell>
          </Component.TableHead>
          <Component.TableRow>
            <Component.TableCell>foo</Component.TableCell>
            <Component.TableCell>foo.bar/foo=bar</Component.TableCell>
            <Component.TableCell>1h</Component.TableCell>
            <Component.TableCell>
              <span style={{ color: 'var(--colorOk)' }}>Active</span>
            </Component.TableCell>
          </Component.TableRow>
          <Component.TableRow>
            <Component.TableCell>bar</Component.TableCell>
            <Component.TableCell>foo.bar/foo=bar</Component.TableCell>
            <Component.TableCell></Component.TableCell>
            <Component.TableCell>
              <span style={{ color: 'var(--colorError)' }}>Inactive</span>
            </Component.TableCell>
          </Component.TableRow>
        </Component.Table>
      </div>
    )
  }
}
