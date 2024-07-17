const apiKey = "AIzaSyDel30Yj7Gqi7V8hIypFi1TLhF7uaZIsIk";

const waitForElement = (selector) => {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector));
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        observer.disconnect();
        resolve(document.querySelector(selector));
      }
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });
  });
};

const createPlayAllButton = async (channelId) => {
  const actionRow = await waitForElement("yt-flexible-actions-view-model");
  // console.log(actionRow);
  if (actionRow) {
    // LOL!
    const playAllButtonDiv = document.createElement("div");
    playAllButtonDiv.className = "yt-flexible-actions-view-model-wiz__action";
    const buttonViewModel = document.createElement("button-view-model");
    buttonViewModel.className = "yt-spec-button-view-model";
    const button = document.createElement("button");
    button.className =
      "yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m";
    const textDiv = document.createElement("div");
    textDiv.className = "yt-spec-button-shape-next__button-text-content";
    textDiv.innerHTML = "Play all";

    playAllButtonDiv.style.opacity = 0;
    playAllButtonDiv.style["animation-fill-mode"] = "forwards";

    const targetHref =
      "https://www.youtube.com/playlist?list=UU" + channelId.slice(2);
    button.onclick = () => {
      window.open(targetHref);
    };

    button.appendChild(textDiv);
    buttonViewModel.appendChild(button);
    playAllButtonDiv.appendChild(buttonViewModel);
    actionRow.appendChild(playAllButtonDiv);

    playAllButtonDiv.animate([{ opacity: 1 }], {
      duration: 100,
      fill: "forwards",
      easing: "ease-in",
    });
  }
};

const getHandle = () => {
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

const start = async () => {
  const handle = getHandle();
  if (handle) {
    const requestUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&forHandle=${handle}&part=id`;
    // console.log(requestUrl);

    try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      // console.log(json);
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
  const observer = new MutationObserver((mutations) => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      // Leave time for the new page to load and stablize (untile I find a better solution).
      setTimeout(start, 500);
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;
start();
