import { _ as __nuxt_component_0 } from './fetch-error-alert-D_0ZzbCd.mjs';
import { r as useRoute, n as useToast, a as __nuxt_component_0$1, b as _sfc_main$8 } from './server.mjs';
import { _ as _sfc_main$1 } from './Alert-Cb6EZWGR.mjs';
import { defineComponent, ref, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useAsyncState } from '@vueuse/core';
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
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'better-auth/vue';

function maskEmail(email, asterisks = 5) {
  if (!email) {
    return "";
  }
  const [user, domain] = email.split("@");
  if (!user || !domain) {
    return email;
  }
  const visible = user.slice(0, 3);
  return `${visible}${"*".repeat(asterisks)}@${domain}`;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "email-verification",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const toast = useToast();
    const email = route.query.email?.toString();
    const decodedEmail = ref(atob(email ?? ""));
    const { state, executeImmediate: sendEmail } = useAsyncState(async function() {
      return await authClient.sendVerificationEmail(
        {
          email: decodedEmail.value,
          callbackURL: "/token-validation"
        },
        {
          onSuccess: () => {
            toast.add({
              color: "success",
              title: "Success",
              description: "Email sent successfully"
            });
          }
        }
      );
    }, null);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FetchErrorAlert = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$1;
      const _component_NuxtButton = _sfc_main$8;
      const _component_NuxtAlert = _sfc_main$1;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-lg font-semibold">Verify Your Email</h1><div class="text-sm text-muted">You must verify your email address</div><div class="my-5">`);
      if (unref(state)?.error) {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, {
          message: unref(state)?.error?.message ?? unref(state)?.error?.statusText,
          "show-retry": "",
          onRetry: ($event) => unref(sendEmail)()
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<div><div>`);
        if (unref(decodedEmail)) {
          _push(`<p class="flex items-center gap-1 flex-wrap"> Email: <b>${ssrInterpolate(("maskEmail" in _ctx ? _ctx.maskEmail : unref(maskEmail))(unref(decodedEmail)))}</b>`);
          _push(ssrRenderComponent(_component_NuxtLink, { to: { name: "login" } }, {
            default: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(ssrRenderComponent(_component_NuxtButton, {
                  color: "warning",
                  icon: "i-lucide-circle-alert",
                  label: "Not my email",
                  size: "sm",
                  variant: "link",
                  class: "ml-1"
                }, null, _parent2, _scopeId));
              } else {
                return [
                  createVNode(_component_NuxtButton, {
                    color: "warning",
                    icon: "i-lucide-circle-alert",
                    label: "Not my email",
                    size: "sm",
                    variant: "link",
                    class: "ml-1"
                  })
                ];
              }
            }),
            _: 1
          }, _parent));
          _push(`</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(_component_NuxtAlert, {
          variant: "subtle",
          description: "A verification link has been sent to your email. Click on it to\n              verify your account.",
          icon: "lucide-circle-alert",
          class: "mt-4"
        }, null, _parent));
        _push(`</div><div class="mt-4 flex items-center gap-3 justify-between"><p class="text-muted text-sm">Didn&#39;t receive the email?</p>`);
        _push(ssrRenderComponent(_component_NuxtButton, {
          "loading-auto": "",
          label: "Resend",
          onClick: ($event) => unref(sendEmail)()
        }, null, _parent));
        _push(`</div></div>`);
      }
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/email-verification.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=email-verification-BWgXQbF2.mjs.map
