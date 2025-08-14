export default defineNuxtRouteMiddleware((to) => {
  const blockedRouteNames = [
    "register",
    "email-verification",
    "token-validation",
  ];

  if (to.name && blockedRouteNames.includes(to.name.toString())) {
    return navigateTo("/");
  }
});
