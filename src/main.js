import { createPlayAllButton } from "./utils/createPlayAllButton";
import { debounce } from "./utils/debounce";
import { getChannelId } from "./utils/getChannelId";
import { isOnYouTube } from "./utils/isOnYouTube";

const start = async () => {
  if (!isOnYouTube()) {
    return;
  }
  const channelId = getChannelId();
  if (channelId) {
    createPlayAllButton(channelId);
  }
};

// YouTube doesn't do normal navigation like push/popState.
const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver(() => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      // Leave time for the new page to load and stablize (untile I find a better solution).
      setTimeout(start, 500);
    }
  });
  if (body) {
    observer.observe(body, { childList: true, subtree: true });
  }
};

window.onload = observeUrlChange;
window.onresize = debounce(start, 300);

start();
