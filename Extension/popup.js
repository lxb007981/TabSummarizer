async function sendPostRequest(queryText, url = 'http://localhost:5000') {
  const queryContent = "This is the query content " + queryText; // Replace with your own query content

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ query: queryContent })
    });

    const data = await response.text();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
  const tab = tabs[0];
  const tabId = tab.id;
  chrome.scripting.executeScript({
    target: { tabId: tabId },
    func: function () {
      const text = document.body.innerText;
      chrome.runtime.sendMessage({ rawText: text });
    }
  });
});

chrome.runtime.onMessage.addListener(async function (message, sender, sendResponse) {
  if (message.rawText) {
    document.getElementById("text").innerText = "Loading..."
    const summary = await sendPostRequest(message.rawText);
    if (summary) {
      document.getElementById("text").innerText = summary

    }
    else{
      document.getElementById("text").innerText = "Error loading summary"
    }
  }
});

