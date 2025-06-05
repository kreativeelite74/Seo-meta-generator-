function generateMeta() {
  const content = document.getElementById("contentInput").value;
  const keyword = document.getElementById("keywordInput").value.trim().toLowerCase();

  if (!content.trim()) {
    alert("Please paste your content.");
    return;
  }

  const sentences = content.match(/[^.!?]+[.!?]+/g) || [];
  let bestSentence = "";

  // Score each sentence
  sentences.forEach(sentence => {
    const cleanSentence = sentence.trim();
    if (
      cleanSentence.length >= 80 &&
      cleanSentence.length <= 155 &&
      (!bestSentence || cleanSentence.toLowerCase().includes(keyword))
    ) {
      bestSentence = cleanSentence;
    }
  });

  // If nothing good found, fallback
  if (!bestSentence) {
    bestSentence = content.trim().substring(0, 155);
  }

  document.getElementById("metaOutput").innerText = bestSentence;
  document.getElementById("charCount").innerText = `${bestSentence.length} / 155 characters`;
  document.getElementById("metaOutputContainer").classList.remove("hidden");

  // Keyword check
  const status = document.getElementById("keywordStatus");
  if (keyword && bestSentence.toLowerCase().includes(keyword)) {
    status.innerText = `✅ Keyword "${keyword}" found in meta description.`;
    status.style.color = "green";
  } else if (keyword) {
    status.innerText = `⚠️ Keyword "${keyword}" not found in meta description.`;
    status.style.color = "red";
  } else {
    status.innerText = "";
  }
}

// Copy to clipboard
function copyMeta() {
  const text = document.getElementById("metaOutput").innerText;
  navigator.clipboard.writeText(text).then(() => {
    const msg = document.getElementById("copyMsg");
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 2000);
  });
}

// Clear fields
function clearFields() {
  document.getElementById("contentInput").value = "";
  document.getElementById("keywordInput").value = "";
  document.getElementById("metaOutput").innerText = "";
  document.getElementById("charCount").innerText = "0 / 155 characters";
  document.getElementById("keywordStatus").innerText = "";
  document.getElementById("metaOutputContainer").classList.add("hidden");
}

// Dark mode toggle
function toggleDarkMode() {
  document.body.classList.toggle("dark");
}
