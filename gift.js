const GIFT_IDS =
[
  {
    "id": "sete-ditelindjesh",
    "name": "Set Ditëlindjesh",
    "price": 3200,
    "tag": "Festive · Dhuratë",
    "category": "gift",
    "image": "images/set_personalizuar.webp",
    "description": "Qiri artizanal + kutia dhuratë elegante + kartë personale. Dhurata ideale për ditëlindje."
  },
  {
    "id": "gift-birthday-set",
    "name": "Birthday Candle Gift Box",
    "price": 2500,
    "tag": "Dhuratë · Ditëlindje",
    "category": "gift",
    "image": "images/gift6.webp",
    "description": "Set komplet me qiri aromatik, pako rozë elegante dhe kartë urimesh. Surprizë e plotë."
  },
  {
    "id": "gift-candle-set",
    "name": "Candle & Wick Trimmer Set",
    "price": 1800,
    "tag": "Dhuratë · Premium",
    "category": "gift",
    "image": "images/giftset.webp",
    "description": "Qiri artizanal + wick trimmer ari + shkrepëse dekorative. Seti i plotë për dashamirësit e qirinjve."
  },
  {
    "id": "wedding-favors",
    "name": "Wedding Favor Set",
    "price": 4500,
    "tag": "Dhuratë · Dasma",
    "category": "gift",
    "image": "images/il_1588xN_5634131884_tsfn.webp",
    "description": "Set 9 qirinjsh votiv në mbajtëse druri me lule të thara — favoret ideale për dasma dhe evente."
  },
  {
    "id": "seti-krishtlindjesh",
    "name": "Set Krishtlindjesh",
    "price": 2800,
    "tag": "Festive · Set",
    "category": "gift",
    "image": "images/il_1588xN.7394624854_oa4i.webp",
    "description": "2 qirinj artizanalë me aromë pishe dhe kanellë + kutia festive. Atmosfera e dimrit në dhuratë."
  },
  {
    "id": "rosae-serata",
    "name": "Rosa Serata",
    "price": 1100,
    "tag": "Romantike · Trëndafil",
    "category": "gift",
    "image": "images/rosaserata.jpg",
    "description": "Trëndafil dhe musk — qiri perfekt si dhuratë romantike."
  },
  {
    "id": "velveti-rose",
    "name": "Velvet Rose",
    "price": 1800,
    "tag": "Romantike · Premium",
    "category": "gift",
    "image": "images/velvet rose.jpg",
    "description": "Qiri premium me trëndafil të kuq dhe velvet musk. Dhuratë elegante."
  },
  {
    "id": "glow-globes",
    "name": "Glow Globes",
    "price": 4000,
    "tag": "Festive · Sandalwood",
    "category": "gift",
    "image": "images/set krishlindje.jpg",
    "description": "Sfera qirinjsh premium sandalwood — prezantimi vizual më i bukur për çdo rast."
  },
  {
    "id": "il-mini-tealight",
    "name": "Mini Tealight Set",
    "price": 1400,
    "tag": "Dhuratë · Mini Set",
    "category": "gift",
    "image": "images/il_75x75_5496356111_4tpb.webp",
    "description": "Set qirinjsh mini natyralë — perfektë si favor eventi ose dhuratë e vogël."
  }
]

document.addEventListener('DOMContentLoaded', () => {
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => nav?.classList.toggle('scrolled', window.scrollY > 50));

  // Occasion filter
  document.querySelectorAll('.occ-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.occ-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const occ = btn.dataset.occ;
      document.querySelectorAll('.gift-card').forEach(card => {
        if (occ === 'all') {
          card.style.display = '';
        } else {
          card.style.display = card.dataset.occ.includes(occ) ? '' : 'none';
        }
      });
    });
  });
});

// Shko te faqja e produktit
function goProduct(id) {
  window.location.href = 'product.html?id=' + id;
}

// Shto ne shporte
function addGift(id, name, price, tag, image) {
  Cart.add(id, name, price, tag, image);
  // Flash butonin
  document.querySelectorAll('.gift-add-btn').forEach(btn => {
    if (btn.getAttribute('onclick') && btn.getAttribute('onclick').includes("'" + id + "'")) {
      const orig = btn.innerHTML;
      btn.innerHTML = '<i class="ti ti-check"></i> Shtuar';
      btn.style.background = '#357A39';
      setTimeout(() => {
        btn.innerHTML = orig;
        btn.style.background = '';
      }, 1500);
    }
  });
}