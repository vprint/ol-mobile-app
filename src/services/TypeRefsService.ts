import { SITE_TYPE_REFS_PARAMS } from '../utils/params/typeRefsSettings';

export function getTypeRef(value: string): string {
  const typeRef = SITE_TYPE_REFS_PARAMS[value];
  return typeRef;
}
