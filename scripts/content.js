const apiKey = "AIzaSyDel30Yj7Gqi7V8hIypFi1TLhF7uaZIsIk";

const createPlayAllButton = (channelId) => {
  const targetHref =
    "https://www.youtube.com/playlist?list=UU" + channelId.slice(2);

  const actionRows = document.getElementsByTagName(
    "yt-flexible-actions-view-model"
  );
  if (actionRows.length) {
    const actionRow = actionRows[0];

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
    playAllButtonDiv.animate([{ opacity: 1 }], {
      duration: 150,
      fill: "forwards",
      easing: "ease-in",
    });

    button.appendChild(textDiv);
    buttonViewModel.appendChild(button);
    playAllButtonDiv.appendChild(buttonViewModel);
    actionRow.appendChild(playAllButtonDiv);

    button.onclick = () => {
      window.open(targetHref);
    };
  }
};

const start = async () => {
  const href = window.location.href;
  const aPos = href.indexOf("@");
  if (aPos !== -1) {
    const handle = href.slice(aPos + 1);
    const requestUrl = `https://www.googleapis.com/youtube/v3/channels?key=${apiKey}&forHandle=${handle}&part=id`;
    console.log(requestUrl);

    try {
      const response = await fetch(requestUrl);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);
      const result = json.items;
      if (result?.length) {
        const channelId = result[0].id;
        createPlayAllButton(channelId);
      }
    } catch (error) {
      console.error(error.message);
    }
  }
};

const observeUrlChange = () => {
  let oldHref = document.location.href;
  const body = document.querySelector("body");
  const observer = new MutationObserver((mutations) => {
    if (oldHref !== document.location.href) {
      oldHref = document.location.href;
      // Give time for the new page to load
      setTimeout(start, 200);
    }
  });
  observer.observe(body, { childList: true, subtree: true });
};

window.onload = observeUrlChange;
start();
