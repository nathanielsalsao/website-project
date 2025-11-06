document.addEventListener("DOMContentLoaded", () => {
  // Fade in when the page loads
  document.body.classList.add("loaded");

  // Fade out when clicking a link
  document.querySelectorAll('a[href]').forEach(link => {
    link.addEventListener('click', e => {
      const href = link.getAttribute('href');
      
      // Ignore empty or # links
      if (!href || href.startsWith('#') || href.startsWith('javascript:')) return;

      e.preventDefault();
      document.body.classList.add('fade-out');
      setTimeout(() => {
        window.location.href = href;
      }, 400); // matches the CSS fade-out duration
    });
  });
});
