import { Renderer } from '@k8slens/extensions';
import React from 'react';
import { Link } from 'react-router-dom';
import { DrawerTitleToggle } from './drawer-title-toggle';

const { Component, Navigation } = Renderer;
const {apiManager, namespacesApi} = Renderer.K8sApi;
type NamespaceStore = Renderer.K8sApi.NamespaceStore;
const nsStore: NamespaceStore = (apiManager.getStore(namespacesApi) as NamespaceStore);

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

  return (
    <DrawerTitleToggle title='Namespaces'>
      <Component.Table className='namespaces'>
        <Component.TableHead>
          <Component.TableCell className='name'>Name</Component.TableCell>
          <Component.TableCell className='labels'>Labels</Component.TableCell>
          <Component.TableCell className='age'>Age</Component.TableCell>
          <Component.TableCell className='status'>Status</Component.TableCell>
        </Component.TableHead>
        {rows}
      </Component.Table>
    </DrawerTitleToggle>
  );
};
