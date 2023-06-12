// function navigator

const navigateToTale = (url) => {
  console.log("Go to tale! " + url);
  window.location.href = url;
};

const navigateToGenre = (url) => {
  console.log("Go to genre! " + url);
  window.location.href = url;
};

const navigateToAuthor = (url) => {
  console.log("Go to author! " + url);
  window.location.href = url;
};

// Helper function
let domReady = (cb) => {
  document.readyState === 'interactive' || document.readyState === 'complete'
    ? cb()
    : document.addEventListener('DOMContentLoaded', cb);
};

domReady(() => {
  // Display body when DOM is loaded
  document.body.style.opacity = 1;
});
