import { apiKey } from "../secret/apiKey";
import { createPlayAllButton } from "./utils/createPlayAllButton";
import { debounce } from "./utils/debounce";
import { getHandle } from "./utils/getHandle";

const start = async () => {
  const handle = getHandle();
  if (handle) {
    const requestUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&forHandle=${handle}&part=id`;

    try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      const result = json.items;
      if (result?.length) {
        const channelId = result[0].id;
        createPlayAllButton(channelId);
      }
    } catch (error) {
      // console.error(error.message);
    }
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
