export default function(context) {
  console.log("checkToken");
  context.store.dispatch("initAuth", context.req);
}
