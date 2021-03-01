import { Component } from '@k8slens/extensions';
import React from 'react';
import * as tnt from '../../tenant';
import { DrawerTitleToggle } from './drawer-title-toggle';
import { Group, VGroup, VGroupItem } from './groups';
import { Labels } from './labels';

export type Props = {
  values?: tnt.NetworkPolicy[];
};

export const NetworkPolicies: React.FC<Props> = props => {
  if (!props.values)
    return null;

  return (
    <DrawerTitleToggle title='Network Policies'>
      {renderPolicies(props.values)}
    </DrawerTitleToggle>
  );
};

//

const renderPolicies = (policies: tnt.NetworkPolicy[]) => (
  policies.map((np, i) => (
    <VGroup key={i}>
      <VGroupItem title='Policy Types'>
        <Labels values={np.policyTypes} />
      </VGroupItem>
      <VGroupItem title='Pod Selector'>
        {renderSelector(np.podSelector)}
      </VGroupItem>
      {renderEgress(np.egress)}
      {renderIngress(np.ingress)}
    </VGroup>
  ))
);

const renderEgress = (egress?: tnt.NetworkPolicyEgress[]) => (
  egress && (
    <VGroupItem title='Egress'>
      {egress.map((item, i) => (
        <Group key={i}>
          <Component.DrawerItem name='Ports'>
            {renderPorts(item.ports)}
          </Component.DrawerItem>
          <Component.DrawerItem name='To'>
            {renderDetails(item.to)}
          </Component.DrawerItem>
        </Group>
      ))}
    </VGroupItem>
  )
);

const renderIngress = (ingress?: tnt.NetworkPolicyIngress[]) => (
  ingress && (
    <VGroupItem title='Ingress'>
      {ingress.map((item, i) => (
        <Group key={i}>
          <Component.DrawerItem name='Ports'>
            {renderPorts(item.ports)}
          </Component.DrawerItem>
          <Component.DrawerItem name='From'>
            {renderDetails(item.from)}
          </Component.DrawerItem>
        </Group>
      ))}
    </VGroupItem>
  )
);

const renderDetails = (items?: tnt.NetworkPolicyDetails[]) => (
  items && items.map((details, i) => (
    <VGroup key={i}>
      {details.ipBlock && (
        <VGroupItem title='IP Block'>
          <Component.DrawerItem name='CIDR'>
            {details.ipBlock.cidr}
          </Component.DrawerItem>
          <Labels name='Except' values={details.ipBlock.except} />
        </VGroupItem>
      )}
      {details.namespaceSelector && (
        <VGroupItem title='Namespace Selector'>
          {renderSelector(details.namespaceSelector)}
        </VGroupItem>
      )}
      {details.podSelector && (
        <VGroupItem title='Pod Selector'>
          {renderSelector(details.podSelector)}
        </VGroupItem>
      )}
    </VGroup>
  ))
);

const renderPorts = (ports?: tnt.NetworkPolicyPort[]) => (
  ports && ports.map((port, i) => (
    <Group key={i}>
      <Component.DrawerItem name='Port'>
        {port.port}
      </Component.DrawerItem>
      <Component.DrawerItem name='Protocol'>
        {port.protocol}
      </Component.DrawerItem>
    </Group>
  ))
);

const renderSelector = (selector?: tnt.Selector) => (
  selector && <>
    <Component.DrawerItem name='Match Expressions'>
      {selector.matchExpressions?.map((expr, i) => (
        <Group key={i}>
          <Component.DrawerItem name='Key'>
            {expr.key}
          </Component.DrawerItem>
          <Component.DrawerItem name='Operator'>
            {expr.operator}
          </Component.DrawerItem>
          <Labels name='Values' values={expr.values} />
        </Group>
      ))}
    </Component.DrawerItem>
    <Labels name='Match Labels' dict={selector.matchLabels} />
  </>
);
