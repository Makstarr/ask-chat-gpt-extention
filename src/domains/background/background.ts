import { ChatGPTProvider, getChatGPTAccessToken } from 'src/helpers/chatgpt';
import { Provider } from 'src/helpers/types';

chrome.contextMenus.create({
  id: 'web-extension-chatgpt-context-menu',
  title: 'Ask ChatGPT',
  contexts: ['selection'],
});

chrome.contextMenus.onClicked.addListener((info) => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0]?.id ?? 0, info.selectionText);
  });
});

async function generateAnswers(
  port: chrome.runtime.Port,
  token: string,
  question: string,
  type: string
) {
  const provider: Provider = new ChatGPTProvider(token);

  const controller = new AbortController();
  port.onDisconnect.addListener(() => {
    controller.abort();
    cleanup?.();
  });

  const { cleanup } = await provider.generateAnswer({
    prompt: question,
    signal: controller.signal,
    onEvent(event) {
      if (event.type === 'done') {
        port.postMessage({ type, event: 'DONE' });
        return;
      }
      if (event.type === 'answer') {
        port.postMessage({ type, ...event.data });
      }
    },
  });
}

chrome.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (msg) => {
    console.debug('received msg', msg);
    try {
      const token = await getChatGPTAccessToken();
      if (msg.question) {
        await generateAnswers(port, token, msg.question, msg.type);
      } else {
        port.postMessage({ type: msg.type, success: true });
      }
    } catch (err: any) {
      console.error(err);
      port.postMessage({ type: msg.type, status: err.message });
    }
  });
});

chrome.runtime.onMessage.addListener(async (message) => {
  if (message.type === 'OPEN_OPTIONS_PAGE') {
    chrome.runtime.openOptionsPage();
  }
});
