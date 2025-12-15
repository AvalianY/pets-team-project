document.getElementById('scrollToStories').addEventListener('click', function (e) {
  e.preventDefault();

  document.querySelector('#success-stories').scrollIntoView({
    behavior: 'smooth'
  });
});
