chrome.contextMenus.create({
  id: 'web-extension-chatgpt-context-menu',
  title: 'Ask ChatGPT',
  contexts: ['selection'],
});


chrome.contextMenus.onClicked.addListener((info) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0]?.id ?? 0, info.selectionText );
  });
});
