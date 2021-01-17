import { ResourceQuota } from '@k8slens/extensions/dist/src/renderer/api/endpoints';
import { Tenant } from './tenant';

export const controlledByTenant = (rq: ResourceQuota) =>
  rq.getOwnerRefs().some(ref => ref.kind === Tenant.kind);

export const titleCase = (input: string) =>
  input
    // add spaces before capital letters
    .replace(/\p{Lu}\p{L}*/ug, ' $&')
    // capitalize first letters
    .replace(/(^| )\p{Ll}/ug, c => c.toUpperCase())
    // handle special cases
    .replace(/cpu|api/ig, c => c.toUpperCase());
