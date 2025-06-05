alert("Script loaded!");
function generateMetaDescription() {
  const blogContent = document.getElementById("blogContent").value;

  if (!blogContent.trim()) {
    alert("Please paste your blog content.");
    return;
  }

  // Step 1: Clean the input
  const cleanText = blogContent
    .replace(/[\n\r]+/g, " ") // remove new lines
    .replace(/[^a-zA-Z0-9 ]/g, "") // remove punctuation
    .toLowerCase();

  const words = cleanText.split(/\s+/);

  // Step 2: Count word frequency
  const stopwords = ["the", "is", "in", "of", "to", "and", "a", "with", "for", "on", "this", "that", "by", "an", "as", "it", "are", "at", "from"];
  const wordFreq = {};

  words.forEach(word => {
    if (word.length > 2 && !stopwords.includes(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  // Step 3: Sort and get top keywords
  const topKeywords = Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(entry => entry[0]);

  // Step 4: Build a smart meta description sentence
  let meta = "";

  if (topKeywords.length >= 2) {
    meta = `Learn about ${topKeywords[0]} and how it affects ${topKeywords[1]}. Discover insights on ${topKeywords[2]}.`;
  } else if (topKeywords.length === 1) {
    meta = `Explore everything you need to know about ${topKeywords[0]}. This guide provides helpful tips and details.`;
  } else {
    meta = blogContent.split(".")[0];
  }

  // Step 5: Trim to 155 characters
  meta = meta.substring(0, 155);

  // Show result
  document.getElementById("result").innerText = meta;
}
