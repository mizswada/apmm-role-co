export default defineNuxtRouteMiddleware((to, from) => {
  return navigateTo("/auth/login-v2/");
});
