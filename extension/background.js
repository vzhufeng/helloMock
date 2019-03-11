function openPage() {
  chrome.tabs.create({
    url: 'chrome-extension://' + chrome.runtime.id + '/example.html'
  });
}

chrome.browserAction.onClicked.addListener(openPage);