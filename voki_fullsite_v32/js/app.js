// Splash screen hide logic
window.addEventListener('load', () => {
  setTimeout(() => {
    const splash = document.getElementById('splash');
    if (splash) splash.style.display = 'none';
  }, 3000);
});

// Splash hide
window.addEventListener('load', () => setTimeout(()=>document.getElementById('splash').style.display='none',3000));
// Pricing conversion
async function updatePrices() {
  const usd=2.99;
  const method=document.getElementById('paymentMethod');
  if(method) {
    let text= `US$${usd}`;
    if(method.value==='transfer') {
      const r=await fetch('https://open.er-api.com/v6/latest/USD');
      const j=await r.json();
      text=`$${(usd*j.rates.ARS).toFixed(0)} ARS`;
    }
    document.getElementById('premiumUSD').innerText=text;
  }
}
document.addEventListener('DOMContentLoaded', ()=>{
  const pm=document.getElementById('paymentMethod');
  if(pm){ pm.addEventListener('change', updatePrices); updatePrices(); }
  const pre=document.getElementById('preRegForm');
  if(pre) pre.addEventListener('submit', e=>{e.preventDefault(); alert('¡Gracias por pre-registrarte!');});
});


// Indicator slider for nav
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelectorAll('.nav-links li a');
  const indicator = document.querySelector('.indicator');
  const navbar = document.querySelector('.navbar');

  function updateIndicator(el) {
    const rect = el.getBoundingClientRect();
    const navRect = navbar.getBoundingClientRect();
    indicator.style.left = (rect.left - navRect.left) + 'px';
    indicator.style.width = rect.width + 'px';
  }

  // Initialize indicator
  const active = document.querySelector('.nav-links li a.active') || navLinks[0];
  updateIndicator(active);

  navLinks.forEach(link => {
    link.addEventListener('mouseover', () => updateIndicator(link));
    link.addEventListener('mouseout', () => {
      const act = document.querySelector('.nav-links li a.active') || navLinks[0];
      updateIndicator(act);
    });
    link.addEventListener('click', () => {
      navLinks.forEach(l => l.classList.remove('active'));
      link.classList.add('active');
      updateIndicator(link);
    });
  });

  window.addEventListener('resize', () => {
    const act = document.querySelector('.nav-links li a.active') || navLinks[0];
    updateIndicator(act);
  });
});
