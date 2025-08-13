import { _ as _sfc_main$1 } from './Alert-Cb6EZWGR.mjs';
import { r as useRoute, q as navigateTo } from './server.mjs';
import { defineComponent, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import 'reka-ui';
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
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "token-validation",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const error = route.query.error?.toString();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtAlert = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-lg font-semibold">Token Validation</h1><div class="my-5">`);
      if (unref(error)) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtAlert, {
          color: "error",
          variant: "subtle",
          icon: "lucide-circle-x",
          title: "Validation Failed",
          description: "Invalid or expired token. Please, try again later.",
          orientation: "horizontal",
          actions: [
            {
              label: "Retry",
              icon: "lucide-refresh-cw",
              onClick: () => {
                ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))({ name: "login" });
              },
              color: "error",
              class: "py-2"
            }
          ]
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_NuxtAlert, {
          color: "success",
          variant: "subtle",
          icon: "lucide-check-circle",
          title: "Validation Successful",
          description: "Your account has been verified successfully.",
          orientation: "horizontal",
          actions: [
            {
              label: "Continue",
              color: "success",
              trailingIcon: "lucide-circle-arrow-right",
              onClick: () => {
                ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))({ name: "login" });
              },
              class: "py-2"
            }
          ]
        }, null, _parent));
        _push(`</div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/token-validation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=token-validation-DowhGRES.mjs.map
