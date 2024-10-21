export const getHandle = () => {
  const href = window.location.href;
  const startPos = href.indexOf("/@");
  if (startPos !== -1) {
    const endPos = href.indexOf("/", startPos + 1);
    if (endPos !== -1) {
      return href.substring(startPos + 2, endPos);
    } else {
      return href.substring(startPos + 2);
    }
  }
};
