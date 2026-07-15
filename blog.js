document.addEventListener('DOMContentLoaded', () => {

  /* NAV scroll */
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

});

function openArticle(id) {
  /* Fshih blog list dhe footer */
  document.getElementById('blog-list').style.display = 'none';
  document.getElementById('main-footer').style.display = 'none';
  document.querySelector('.blog-hero').style.display = 'none';
  document.querySelector('.breadcrumb').style.display = 'none';

  /* Shfaq artikullin */
  document.getElementById('article-' + id).style.display = 'block';

  /* Scroll top */
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeArticle() {
  /* Fshih të gjithë article pages */
  document.querySelectorAll('.article-page').forEach(a => a.style.display = 'none');

  /* Shfaq blog list */
  document.getElementById('blog-list').style.display = 'block';
  document.getElementById('main-footer').style.display = 'block';
  document.querySelector('.blog-hero').style.display = 'flex';
  document.querySelector('.breadcrumb').style.display = 'flex';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}