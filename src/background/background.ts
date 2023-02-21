chrome.contextMenus.create({
  id: 'react-boilerplate-extension',
  title: 'React Boilerplate context menu',
  contexts: ['selection'],
});


chrome.contextMenus.onClicked.addListener((info) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0]?.id ?? 0, info.selectionText );
  });
});
