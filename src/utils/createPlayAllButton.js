import { waitForElement } from "./waitForElement";

export const createPlayAllButton = async (channelId) => {
  const actionRow = await waitForElement("yt-flexible-actions-view-model");
  // console.log(actionRow);
  if (
    actionRow &&
    [...actionRow.children].every(
      (child) => child.dataset.injectedByPABFYT !== "true"
    )
  ) {
    // LOL!
    const playAllButtonDiv = document.createElement("div");
    playAllButtonDiv.dataset.injectedByPABFYT = "true";
    // console.log(playAllButtonDiv);
    playAllButtonDiv.className = "yt-flexible-actions-view-model-wiz__action";
    const buttonViewModel = document.createElement("button-view-model");
    buttonViewModel.className = "yt-spec-button-view-model";
    const button = document.createElement("button");
    button.className =
      "yt-spec-button-shape-next yt-spec-button-shape-next--outline yt-spec-button-shape-next--mono yt-spec-button-shape-next--size-m";
    const textDiv = document.createElement("div");
    textDiv.className = "yt-spec-button-shape-next__button-text-content";
    // @ts-ignore
    textDiv.innerHTML = chrome.i18n.getMessage("playAllButtonLabel");

    playAllButtonDiv.style.opacity = "0";
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
