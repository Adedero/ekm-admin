import { a as __nuxt_component_0, b as _sfc_main$8, q as navigateTo } from './server.mjs';
import { _ as __nuxt_component_0$1 } from './fetch-error-alert-D_0ZzbCd.mjs';
import { a as _sfc_main$2, b as _sfc_main$1$1, _ as _sfc_main$3 } from './Input-DX79Bd9Q.mjs';
import { _ as __nuxt_component_3 } from './nuxt-password-tIVuGjXJ.mjs';
import { defineComponent, withCtx, createTextVNode, reactive, ref, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as authClient } from './auth-rsizPj0D.mjs';
import { R as RegisterSchema } from '../_/schemas.mjs';
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
import './Alert-Cb6EZWGR.mjs';
import 'better-auth/vue';
import 'zod';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "register-form",
  __ssrInlineRender: true,
  setup(__props) {
    const state = reactive({
      name: "",
      email: "",
      password: "",
      confirmPassword: ""
    });
    function reset() {
      state.name = "";
      state.email = "";
      state.password = "";
      state.confirmPassword = "";
    }
    const error = ref(null);
    async function onSubmit(event) {
      error.value = null;
      const { name, email, password } = event.data;
      await authClient.signUp.email(
        { name, email, password },
        {
          onError(ctx) {
            error.value = new Error(ctx.error.message || ctx.error.statusText);
          },
          async onSuccess() {
            reset();
            navigateTo({
              name: "email-verification",
              query: { email: btoa(email) }
            });
          }
        }
      );
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_FetchErrorAlert = __nuxt_component_0$1;
      const _component_NuxtForm = _sfc_main$2;
      const _component_NuxtFormField = _sfc_main$1$1;
      const _component_NuxtInput = _sfc_main$3;
      const _component_NuxtPassword = __nuxt_component_3;
      const _component_NuxtButton = _sfc_main$8;
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      if (unref(error)) {
        _push(`<div class="mb-3">`);
        _push(ssrRenderComponent(_component_FetchErrorAlert, {
          message: unref(error).message
        }, null, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(ssrRenderComponent(_component_NuxtForm, {
        schema: unref(RegisterSchema),
        state: unref(state),
        class: "space-y-4",
        onSubmit
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Full Name",
              name: "name"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).name,
                    "onUpdate:modelValue": ($event) => unref(state).name = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).name,
                      "onUpdate:modelValue": ($event) => unref(state).name = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Email",
              name: "email"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtInput, {
                    modelValue: unref(state).email,
                    "onUpdate:modelValue": ($event) => unref(state).email = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtInput, {
                      modelValue: unref(state).email,
                      "onUpdate:modelValue": ($event) => unref(state).email = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Password",
              name: "password"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPassword, {
                    modelValue: unref(state).password,
                    "onUpdate:modelValue": ($event) => unref(state).password = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPassword, {
                      modelValue: unref(state).password,
                      "onUpdate:modelValue": ($event) => unref(state).password = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtFormField, {
              label: "Confirm Password",
              name: "confirmPassword"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtPassword, {
                    modelValue: unref(state).confirmPassword,
                    "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtPassword, {
                      modelValue: unref(state).confirmPassword,
                      "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                      size: "lg",
                      class: "w-full"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_NuxtButton, {
              type: "submit",
              class: "mt-2 w-full flex items-center justify-center",
              size: "lg",
              icon: "i-lucide-user-round-plus",
              "loading-auto": ""
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Submit `);
                } else {
                  return [
                    createTextVNode(" Submit ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtFormField, {
                label: "Full Name",
                name: "name"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtInput, {
                    modelValue: unref(state).name,
                    "onUpdate:modelValue": ($event) => unref(state).name = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_NuxtFormField, {
                label: "Email",
                name: "email"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtInput, {
                    modelValue: unref(state).email,
                    "onUpdate:modelValue": ($event) => unref(state).email = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_NuxtFormField, {
                label: "Password",
                name: "password"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPassword, {
                    modelValue: unref(state).password,
                    "onUpdate:modelValue": ($event) => unref(state).password = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_NuxtFormField, {
                label: "Confirm Password",
                name: "confirmPassword"
              }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtPassword, {
                    modelValue: unref(state).confirmPassword,
                    "onUpdate:modelValue": ($event) => unref(state).confirmPassword = $event,
                    size: "lg",
                    class: "w-full"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(_component_NuxtButton, {
                type: "submit",
                class: "mt-2 w-full flex items-center justify-center",
                size: "lg",
                icon: "i-lucide-user-round-plus",
                "loading-auto": ""
              }, {
                default: withCtx(() => [
                  createTextVNode(" Submit ")
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/register-form.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = Object.assign(_sfc_main$1, { __name: "RegisterForm" });
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_RegisterForm = __nuxt_component_1;
      _push(`<div${ssrRenderAttrs(_attrs)}><h1 class="text-lg font-semibold">Register</h1><div class="text-sm text-muted"> Already got an account? `);
      _push(ssrRenderComponent(_component_NuxtLink, {
        class: "text-primary font-semibold hover:underline",
        to: { name: "login" }
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Log in `);
          } else {
            return [
              createTextVNode(" Log in ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(` instead. </div><div class="my-5">`);
      _push(ssrRenderComponent(_component_RegisterForm, null, null, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=register-gliDHaCj.mjs.map
