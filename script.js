function generateMeta() {
  const content = document.getElementById("contentInput").value.trim();
  const keyword = document.getElementById("keywordInput").value.trim().toLowerCase();
  const output = document.getElementById("metaOutput");
  const charCount = document.getElementById("charCount");
  const keywordStatus = document.getElementById("keywordStatus");
  const outputContainer = document.getElementById("metaOutputContainer");

  if (!content) {
    alert("Please paste your blog content.");
    return;
  }

  // Break content into sentences
  const sentences = content.match(/[^.!?]+[.!?]*/g) || [];
  let meta = "";

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i].trim();
    if (sentence.length > 40 && sentence.length <= 155) {
      meta = sentence;
      break;
    }
  }

  if (!meta) {
    meta = content.substring(0, 155);
  }

  // Add keyword if not present
  if (keyword && !meta.toLowerCase().includes(keyword)) {
    if (meta.length + keyword.length + 2 <= 155) {
      meta = `${keyword.charAt(0).toUpperCase() + keyword.slice(1)}: ${meta}`;
    }
  }

  output.innerText = meta;
  charCount.innerText = `${meta.length} / 155 characters`;
  keywordStatus.innerText = keyword
    ? meta.toLowerCase().includes(keyword) 
      ? "✅ Keyword included" 
      : "❌ Keyword not found"
    : "";

  outputContainer.classList.remove("hidden");
}

function clearFields() {
  document.getElementById("contentInput").value = "";
  document.getElementById("keywordInput").value = "";
  document.getElementById("metaOutput").innerText = "";
  document.getElementById("charCount").innerText = "0 / 155 characters";
  document.getElementById("keywordStatus").innerText = "";
  document.getElementById("metaOutputContainer").classList.add("hidden");
}

function copyMeta() {
  const meta = document.getElementById("metaOutput").innerText;
  navigator.clipboard.writeText(meta).then(() => {
    const msg = document.getElementById("copyMsg");
    msg.classList.remove("hidden");
    setTimeout(() => msg.classList.add("hidden"), 2000);
  });
}

function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
}
