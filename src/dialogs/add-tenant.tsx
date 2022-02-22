import { Renderer } from '@k8slens/extensions';
import { JsonApiErrorParsed } from '@k8slens/extensions/dist/src/common/k8s-api/json-api';
import { DialogProps } from '@k8slens/extensions/dist/src/renderer/components/dialog';
import { observable } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import { Tenant } from '../tenant';
import { tenantStore } from '../tenant-store';

const {Component} = Renderer;

interface Props extends DialogProps {
  onSuccess?(ns: Tenant): void;
  onError?(error: unknown): void;
}

@observer
export class AddTenantDialog extends React.Component<Props> {
  @observable static isOpen = false;
  @observable name = '';
  @observable ownerKind = '' as 'User' | 'Group';
  @observable ownerName = '';

  static open() {
    AddTenantDialog.isOpen = true;
  }

  static close() {
    AddTenantDialog.isOpen = false;
  }

  reset = () => {
    this.name = '';
    this.ownerKind = 'User';
    this.ownerName = '';
  };

  addTenant = async () => {
    const { name, ownerKind, ownerName } = this;
    const { onSuccess, onError } = this.props;

    try {
      const owner = { kind: ownerKind, name: ownerName };
      const spec = { owner };
      const created = await tenantStore.create({ name }, { spec });

      onSuccess?.(created);
      AddTenantDialog.close();
    } catch (err) {
      Component.Notifications.error((err as JsonApiErrorParsed));
      onError?.(err);
    }
  };

  render() {
    const header = <h5>Create Tenant</h5>;

    return (
      <Component.Dialog
        {...this.props}
        className='AddTenantDialog'
        isOpen={AddTenantDialog.isOpen}
        onOpen={this.reset}
        close={AddTenantDialog.close}
      >
        <Component.Wizard header={header} done={AddTenantDialog.close}>
          <Component.WizardStep
            contentClass='flex gaps column'
            nextLabel='Create'
            next={this.addTenant}
          >
            <b>Tenant Name</b>
            <Component.Input required autoFocus
              value={this.name}
              onChange={value => this.name = value}
            />
            <b>Owner Name</b>
            <Component.Input required
              value={this.ownerName}
              onChange={value => this.ownerName = value}
            />
            <b>Owner Kind</b>
            <Component.Select required
              options={['User', 'Group']}
              value={this.ownerKind}
              onChange={({ value }) => this.ownerKind = value}
            />
          </Component.WizardStep>
        </Component.Wizard>
      </Component.Dialog>
    );
  }
}
