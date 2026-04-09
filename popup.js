// Toggle Dark Mode
document.getElementById("modeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Get stats from current page
chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    function: () => {
      
      // Get selected text (if any)
      let selectedText = window.getSelection().toString();

      let text = selectedText.length > 0 
        ? selectedText 
        : document.body.innerText;

      // Clean text
      text = text.replace(/\s+/g, " ").trim();

      let words = text.length > 0 ? text.split(" ").length : 0;

      let paragraphs = document.querySelectorAll("p").length;

      let readingTime = Math.ceil(words / 200);

      return {
        words,
        paragraphs,
        readingTime,
        isSelected: selectedText.length > 0
      };
    }
  }, (results) => {
    let data = results[0].result;

    document.getElementById("words").innerText =
      "Words: " + data.words + (data.isSelected ? " (Selected)" : "");

    document.getElementById("paragraphs").innerText =
      "Paragraphs: " + data.paragraphs;

    document.getElementById("time").innerText =
      "Reading Time: " + data.readingTime + " min";
  });
});