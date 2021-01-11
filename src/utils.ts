import { ResourceQuota } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import { Tenant } from './tenant';

export const controlledByTenant = (rq: ResourceQuota) =>
  rq.getOwnerRefs().some(ref => ref.kind === Tenant.kind);
