// Step 1: Language Detection
// This function detects the visitor's language using the browser's language preference.
function detectLanguage() {
  const userLanguage = navigator.language || navigator.userLanguage;
  return userLanguage.split("-")[0];
}

// Step 2: Translation
// This function translates the content using the Google Translate API.
function translateContent(content, targetLanguage) {
  // Replace 'YOUR_API_KEY' with your actual Google Translate API key.
  const apiKey = 'YOUR_API_KEY';
  const apiUrl = `https://translation.googleapis.com/language/translate/v2?key=${apiKey}`;

  const requestBody = {
    q: content,
    target: targetLanguage,
  };

  return fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then(response => response.json())
    .then(data => data.data.translations[0].translatedText)
    .catch(error => {
      console.error('Translation error:', error);
      return content; // Return the original content if translation fails
    });
}

// Step 3: Automatic Translation
// This function automatically translates the website based on the visitor's country.
function autoTranslateWebsite() {
  const visitorLanguage = detectLanguage(); // Detect the visitor's language

  // Map visitor's language to target language
  const targetLanguageMap = {
    en: 'en', // English
    fr: 'fr', // French
    es: 'es', // Spanish
    // Add more language mappings as needed
  };

  const targetLanguage = targetLanguageMap[visitorLanguage] || 'en'; // Default to English if visitor's language is not supported

  // Translate the content of each element with the 'data-translate' attribute
  const elementsToTranslate = document.querySelectorAll('[data-translate]');
  elementsToTranslate.forEach(element => {
    const content = element.getAttribute('data-translate');
    translateContent(content, targetLanguage).then(translatedText => {
      element.textContent = translatedText;
    });
  });
}

// Call the autoTranslateWebsite function when the page has finished loading
window.addEventListener('load', autoTranslateWebsite);
