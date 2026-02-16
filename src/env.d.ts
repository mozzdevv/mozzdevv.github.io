/// <reference path="../.astro/types.d.ts" />
/// <reference types="astro/client" />

declare module "@lucide/astro/icons/*" {
  const component: any;
  export default component;
}
