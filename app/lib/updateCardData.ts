 export const notifyCartUpdate = () => {
  window.dispatchEvent(new Event("cartUpdated"));
};