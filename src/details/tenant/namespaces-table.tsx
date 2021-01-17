import { Component, K8sApi, Navigation } from '@k8slens/extensions';
import { Namespace } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import React from 'react';
import { Link } from 'react-router-dom';

const nsStore: K8sApi.KubeObjectStore<Namespace> =
  K8sApi.apiManager.getStore(K8sApi.namespacesApi);

export type Props = {
  values?: string[];
};

export const NamespacesTable: React.FC<Props> = props => {
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
        <Component.TableCell className='name'>
          <Link to={Navigation.getDetailsUrl(ns.selfLink)}>{name}</Link>
        </Component.TableCell>
        <Component.TableCell className='labels'>
          {labels}
        </Component.TableCell>
        <Component.TableCell className='age'>
          {age}
        </Component.TableCell>
        <Component.TableCell className='status'>
          <span className={status.toLowerCase()}>{status}</span>
        </Component.TableCell>
      </Component.TableRow>
    );
  });

  return <>
    <Component.DrawerTitle title='Namespaces' />
    <Component.Table className='namespaces'>
      <Component.TableHead>
        <Component.TableCell className='name'>Name</Component.TableCell>
        <Component.TableCell className='labels'>Labels</Component.TableCell>
        <Component.TableCell className='age'>Age</Component.TableCell>
        <Component.TableCell className='status'>Status</Component.TableCell>
      </Component.TableHead>
      {rows}
    </Component.Table>
  </>;
};
