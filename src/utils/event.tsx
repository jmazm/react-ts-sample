export const getPoint = (e: any) => {
    e = e || window.event;
    return e.touches && e.touches[0] ? e.touches[0] : e;
};
  