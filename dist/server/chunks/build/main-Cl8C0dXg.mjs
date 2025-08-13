import { n as useToast, b as _sfc_main$8, D as __nuxt_component_2, q as navigateTo } from './server.mjs';
import { _ as _sfc_main$1 } from './Separator-DJAuEy5-.mjs';
import { defineComponent, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as authClient } from './auth-rsizPj0D.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'better-auth/vue';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "main",
  __ssrInlineRender: true,
  setup(__props) {
    const toast = useToast();
    const signOut = async () => {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            navigateTo("/login");
          },
          onError: (ctx) => {
            toast.add({
              color: "success",
              title: "Error",
              description: ctx.error.message || ctx.error.statusText
            });
          }
        }
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtButton = _sfc_main$8;
      const _component_NuxtSeparator = _sfc_main$1;
      const _component_NuxtPage = __nuxt_component_2;
      _push(`<main${ssrRenderAttrs(_attrs)}><header class="p-4 flex items-center gap-2 justify-between"><p class="text-primary font-semibold text-xl"> Eileen Katherine Murray <span class="text-xs text-muted">ADMIN</span></p>`);
      _push(ssrRenderComponent(_component_NuxtButton, {
        label: "Log out",
        "loading-auto": "",
        onClick: signOut
      }, null, _parent));
      _push(`</header>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, null, null, _parent));
      _push(`<div class="p-4">`);
      _push(ssrRenderComponent(_component_NuxtPage, null, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(_component_NuxtSeparator, null, null, _parent));
      _push(`<footer class="p-4"><div class="flex items-center gap-2 justify-between text-xs"><p>© 2025 Eileen Katherine Murray</p><p class="text-muted">Made by <b>Unix</b></p></div></footer></main>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/main.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=main-Cl8C0dXg.mjs.map
