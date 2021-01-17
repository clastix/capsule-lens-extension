import { ResourceQuota } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import { Tenant } from './tenant';

export const controlledByTenant = (rq: ResourceQuota) =>
  rq.getOwnerRefs().some(ref => ref.kind === Tenant.kind);

export const titleCase = (input: string) =>
  input
    // add spaces before capital letters
    .replace(/[A-Z]+/g, ' $&')
    // handle special cases and capitalize first letter
    .replace(/cpu|api|^[a-z]/g, s => s.toUpperCase());
