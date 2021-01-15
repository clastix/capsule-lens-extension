import { Component, K8sApi, Navigation } from '@k8slens/extensions';
import { Namespace } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import React from 'react';
import { Link } from 'react-router-dom';
import { Tenant, Metadata, AdditionalRoleBinding, AllowList, LimitRange, NetworkPolicy } from '../tenant';
import './tenant-details.scss';

export type Props = Component.KubeObjectDetailsProps<Tenant>

export const TenantDetails: React.FC<Props> = props => {
  const { object: tenant } = props;
  if (!tenant) return null;

  const { spec, status } = tenant;
  const resourceQuotas = spec.resourceQuotas
    ?.flatMap(rq => Object.entries(rq.hard || {}));

  return (
    <div className='CustomTenantDetails'>
      <Metrics />
      <Component.KubeObjectMeta object={tenant} />
      <Component.DrawerItem name='Namespace quota'>{spec.namespaceQuota}</Component.DrawerItem>
      <Component.DrawerItem name='Namespace count'>{status.size}</Component.DrawerItem>
      <Component.DrawerItem name='Owner name'>{spec.owner.name}</Component.DrawerItem>
      <Component.DrawerItem name='Owner kind'>{spec.owner.kind}</Component.DrawerItem>
      <Labels name='Node selector' dict={spec.nodeSelector} />
      <Labels name='Resource Quotas' pairs={resourceQuotas} />
      <AllowList name='External service IPs' value={spec.externalServiceIPs} />
      <AllowList name='Container registries' value={spec.containerRegistries} />
      <AllowList name='Ingress classes' value={spec.ingressClasses} />
      <AllowList name='Ingress hostnames' value={spec.ingressHostnames} />
      <AllowList name='Storage classes' value={spec.storageClasses} />
      <Metadata name='Namespaces metadata' value={spec.namespacesMetadata} />
      <Metadata name='Services metadata' value={spec.servicesMetadata} />
      <AdditionalRoleBindings values={spec.additionalRoleBindings} />
      <LimitRanges values={spec.limitRanges} />
      <NetworkPolicies values={spec.networkPolicies} />
      <NamespacesTable values={status.namespaces} />
    </div>
  );
};

//

const JsonView: React.FC<{ json?: unknown }> = props => (
  <Component.Input multiLine theme='round-black' className='JsonView'
    value={JSON.stringify(props.json, null, 2)} />
);

const Metrics: React.FC = () => (
  <div className='Metrics flex justify-center align-center'>
    Metrics Placeholder
  </div>
);

const Labels: React.FC<{
  name: string;
  values?: string[];
  pairs?: [string, unknown][];
  dict?: Record<string, unknown>;
}> = props => {
  if (!props.values && !props.pairs && !props.dict)
    return null;

  return (
    <Component.DrawerItem labelsOnly name={props.name}>
      {props.pairs && props.pairs.map(([key, value]) => (
        <Component.Badge key={key} label={`${key}=${value}`} />
      ))}
      {props.dict && Object.entries(props.dict).map(([key, value]) => (
        <Component.Badge key={key} label={`${key}=${value}`} />
      ))}
      {props.values && props.values.map(value => (
        <Component.Badge key={value} label={value} />
      ))}
    </Component.DrawerItem>
  );
};

const AllowList: React.FC<{ name: string, value?: AllowList }> = props => {
  if (!props.value)
    return null;

  return (
    <Component.DrawerItem name={props.name}>
      <Labels name='Allowed' values={props.value.allowed} />
      {props.value.allowedRegex && (
        <Component.DrawerItem name='Allowed regex'>
          <code>{props.value.allowedRegex}</code>
        </Component.DrawerItem>
      )}
    </Component.DrawerItem>
  );
};

const Metadata: React.FC<{ name: string, value?: Metadata }> = props => {
  if (!props.value)
    return null;

  return (
    <Component.DrawerItem name={props.name}>
      <Labels
        name='Additional annotations'
        dict={props.value.additionalAnnotations}
      />
      <Labels
        name='Additional labels'
        dict={props.value.additionalLabels}
      />
    </Component.DrawerItem>
  );
};

const AdditionalRoleBindings: React.FC<{ values?: AdditionalRoleBinding[] }> = props => {
  if (!props.values)
    return null;

  return (
    <Component.DrawerItem name='Additional role bindings'>
      <Component.DrawerParamToggler label={props.values.length}>
        {props.values.map(binding => {
          const subjects = binding.subjects
            .flatMap(subject => Object.entries(subject));

          return <>
            <Component.DrawerItem name='Cluster role name'>
              {binding.clusterRoleName}
            </Component.DrawerItem>
            <Component.DrawerItem name='Subjects'>
              {subjects.map(([key, value]) => (
                <Component.DrawerItem key={key} name={key}>
                  {value}
                </Component.DrawerItem>
              ))}
            </Component.DrawerItem>
          </>;
        })}
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};

const LimitRanges: React.FC<{ values?: LimitRange[] }> = props => {
  if (!props.values)
    return null;

  const limits = props.values
    .flatMap(limitRange => limitRange.limits);

  const tables = limits.map(({ type, ...rest }) => {
    const rows = Object.entries(rest)
      .map(([key, values]) => [key, Object.entries(values)] as const);

    const tableHead = rows[0][1].map(([key], i) => (
      <Component.TableCell key={i}>{key}</Component.TableCell>
    ));

    const tableRows = rows.map(([key, values]) => (
      <Component.TableRow key={key}>
        <Component.TableCell>{key}:</Component.TableCell>
        {values.map(([, value], i) => (
          <Component.TableCell key={i}>{value as string}</Component.TableCell>
        ))}
      </Component.TableRow>
    ));

    return (
      <Component.Table key={type} className='LimitRanges'>
        <Component.TableHead>
          <Component.TableCell>{type}</Component.TableCell>
          {tableHead}
        </Component.TableHead>
        {tableRows}
      </Component.Table>
    );
  });

  return (
    <Component.DrawerItem name='Limit ranges'>
      <Component.DrawerParamToggler label={props.values.length}>
        {tables}
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};

const NetworkPolicies: React.FC<{ values?: NetworkPolicy[] }> = props => {
  if (!props.values)
    return null;

  return (
    <Component.DrawerItem name='Network policies'>
      <Component.DrawerParamToggler label={props.values.length}>
        {props.values.map(np => <>
          <Labels name='Policy types' values={np.policyTypes} />
          <Component.DrawerItem name='Pod selector'>
            <JsonView json={np.podSelector} />
          </Component.DrawerItem>
          <Component.DrawerItem name='Egress'>
            <JsonView json={np.egress} />
          </Component.DrawerItem>
          <Component.DrawerItem name='Ingress'>
            <JsonView json={np.ingress} />
          </Component.DrawerItem>
        </>)}
      </Component.DrawerParamToggler>
    </Component.DrawerItem>
  );
};

const NamespacesTable: React.FC<{ values?: string[] }> = props => {
  const nsStore: K8sApi.KubeObjectStore<Namespace> =
    K8sApi.apiManager.getStore(K8sApi.namespacesApi);

  if (!props.values || !nsStore.isLoaded)
    return null;

  const rows = props.values.map(name => {
    const ns = nsStore.getByName(name);
    const age = ns.getAge();
    const status = ns.getStatus();
    const labels = ns.getLabels().map(label => (
      <Component.Badge key={label} label={label} />
    ));

    return (
      <Component.TableRow nowrap key={ns.getId()}>
        <Component.TableCell>
          <Link to={Navigation.getDetailsUrl(ns.selfLink)}>{name}</Link>
        </Component.TableCell>
        <Component.TableCell>{labels}</Component.TableCell>
        <Component.TableCell>{age}</Component.TableCell>
        <Component.TableCell>
          <span className={status}>{status}</span>
        </Component.TableCell>
      </Component.TableRow>
    );
  });

  return <>
    <Component.DrawerTitle title='Namespaces' />
    <Component.Table className='Namespaces'>
      <Component.TableHead>
        <Component.TableCell>Name</Component.TableCell>
        <Component.TableCell>Labels</Component.TableCell>
        <Component.TableCell>Age</Component.TableCell>
        <Component.TableCell>Status</Component.TableCell>
      </Component.TableHead>
      {rows}
    </Component.Table>
  </>;
};
