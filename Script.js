function generateMeta() {
  const input = document.getElementById("contentInput").value.trim();
  const keyword = document.getElementById("keywordInput").value.trim().toLowerCase();
  const output = document.getElementById("metaOutput");
  const charCount = document.getElementById("charCount");
  const keywordStatus = document.getElementById("keywordStatus");
  const outputContainer = document.getElementById("metaOutputContainer");
  const copyMsg = document.getElementById("copyMsg");

  if (input.length < 50) {
    output.textContent = "Please enter at least 50 characters.";
    charCount.textContent = "0 / 155 characters";
    keywordStatus.textContent = "";
    outputContainer.classList.remove("hidden");
    return;
  }

  let meta = input.substring(0, 155).replace(/\s+/g, " ").trim();
  if (input.length > 155) meta += "...";

  // Highlight keyword if present
  let displayMeta = meta;
  if (keyword && meta.toLowerCase().includes(keyword)) {
    const regex = new RegExp(`(${keyword})`, "gi");
    displayMeta = meta.replace(regex, '<span class="highlight">$1</span>');
    keywordStatus.textContent = `✅ Keyword "${keyword}" found in meta description`;
    keywordStatus.classList.add("found");
  } else if (keyword) {
    keywordStatus.textContent = `❌ Keyword "${keyword}" NOT found`;
    keywordStatus.classList.remove("found");
  } else {
    keywordStatus.textContent = "";
  }

  output.innerHTML = displayMeta;
  charCount.textContent = `${meta.length} / 155 characters`;
  outputContainer.classList.remove("hidden");
  copyMsg.classList.add("hidden");
}

function clearFields() {
  document.getElementById("contentInput").value = "";
  document.getElementById("keywordInput").value = "";
  document.getElementById("metaOutput").textContent = "";
  document.getElementById("charCount").textContent = "0 / 155 characters";
  document.getElementById("keywordStatus").textContent = "";
  document.getElementById("metaOutputContainer").classList.add("hidden");
}

function copyMeta() {
  const tempText = document.createElement("textarea");
  tempText.value = document.getElementById("metaOutput").innerText;
  document.body.appendChild(tempText);
  tempText.select();
  document.execCommand("copy");
  document.body.removeChild(tempText);
  document.getElementById("copyMsg").classList.remove("hidden");
}

function toggleDarkMode() {
  document.body.classList.toggle("dark");
      }
