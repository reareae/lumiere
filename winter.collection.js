// winter.js
const WINTER_IDS = [
 
  //'harvest-warmth',
 // 'winter-spice',
//'frozen-pine'
  {
    "id": "harvest-warmth",
    "name": "Harvest Warmth",
    "price": 1500,
    "category": "festive",
    "tag": "Dimërore · Mollë & Kanellë",
    "image": "images/kolekdiondimri2.webp",
    "badge": "Dimër 2026",
    "hours": "52 orë",
    "wax": "Dyllë natyral",
    "size": "200g",
    "scent": "Mollë · Kanellë · Karafil · Nutmeg",
    "ingredients": "Dyllë natyral, aroma mollë & kanellë, fitil pambuku organik",
    "description": "Harvest Warmth sjell ngrohtësinë e stinës së vjeshtës dhe dimrit — mollë e pjekur, kanellë dhe karafil krijojnë aromën perfekte të shtëpisë."
  },
  {
    "id": "winter-spice",
    "name": "Winter Spice",
    "price": 1750,
    "category": "festive",
    "tag": "Dimërore · Erëza",
    "image": "images/soy candles.webp",
    "badge": "Dimër 2026",
    "hours": "58 orë",
    "wax": "Dyllë natyral",
    "size": "240g",
    "scent": "Kanellë · Vanilje · Yll anisi · Kardamom",
    "ingredients": "Dyllë natyral premium, aroma erëzash dimërore, fitil pambuku bio",
    "description": "Winter Spice është kokteli ynë aromatik i dimrit — erëza ekzotike, vanilje e ngrohtë dhe kardamom krijon atmosferën e festave dhe momenteve familjare."
  },
  {
    "id": "frozen-pine",
    "name": "Frozen Pine",
    "price": 1900,
    "category": "festive",
    "tag": "Dimërore · Pishe & Borë",
    "image": "images/koleksiondimri3.avif",
    "badge": "Dimër 2026",
    "hours": "60 orë",
    "wax": "Dyllë natyral",
    "size": "260g",
    "scent": "Pishe · Borë · Dëllinjë · Cedër",
    "ingredients": "Dyllë natyral ekologjik, aroma pishe & borë, fitil pambuku organik",
    "description": "Frozen Pine të transporton në një pyllin dimëror të mbuluar me borë — pishe alpine, dëllinjë dhe freski bore krijojnë qetësinë dhe pastërtinë absolute."
  }
];


  
  const grid = document.getElementById('winter-grid');


  grid.innerHTML = WINTER_IDS.map((p, i) => `
    <div class="wc-card ${i === 0 ? 'wc-featured' : ''} shop-card"
      data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">
      <div class="wc-img">
        <img src="${p.image}" alt="${p.name}" class="prod-photo"/>
        <div class="wc-overlay">
          <button class="btn-view-prod">Shiko produktin</button>
        </div>
        ${p.badge ? `<span class="wc-badge">${p.badge}</span>` : ''}
      </div>
      <div class="wc-body">
        <p class="wc-tag">${p.tag}</p>
        <p class="wc-name">${p.name}</p>
        <p class="wc-desc">${p.description.substring(0,80)}...</p>
        <p class="wc-scent"><i class="ti ti-flame"></i> ${p.scent}</p>
        <div class="wc-foot">
          <span class="wc-price">${p.price.toLocaleString('sq')} L</span>
          <button class="add-btn">+ Shto</button>
        </div>
      </div>
    </div>`).join('');
