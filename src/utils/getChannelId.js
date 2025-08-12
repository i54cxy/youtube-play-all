export const getChannelId = () => {
  const meta = document.head.querySelector("[property~='og:url'][content]");
  const ogurl =
    meta && meta instanceof HTMLMetaElement ? meta.content : undefined;
  if (ogurl) {
    const channelPos = ogurl.indexOf("/channel/");
    if (channelPos !== -1) {
      const channelId = ogurl.slice(channelPos + 9);
      if (channelId.length === 24) {
        return channelId;
      }
    }
  }
};
