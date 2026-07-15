document.addEventListener('DOMContentLoaded', () => {

  
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 50);
  });

});

function openArticle(id) {
  
  document.getElementById('blog-list').style.display = 'none';
  document.getElementById('main-footer').style.display = 'none';
  document.querySelector('.blog-hero').style.display = 'none';
  document.querySelector('.breadcrumb').style.display = 'none';

  
  document.getElementById('article-' + id).style.display = 'block';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function closeArticle() {
 
  document.querySelectorAll('.article-page').forEach(a => a.style.display = 'none');

 
  document.getElementById('blog-list').style.display = 'block';
  document.getElementById('main-footer').style.display = 'block';
  document.querySelector('.blog-hero').style.display = 'flex';
  document.querySelector('.breadcrumb').style.display = 'flex';

  window.scrollTo({ top: 0, behavior: 'smooth' });
}