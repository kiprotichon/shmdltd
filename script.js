const toggle = document.querySelector('.nav__toggle');
const menu = document.querySelector('.nav__menu');

toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  menu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    toggle.classList.remove('active');
    menu.classList.remove('active');
  });
});


/* === GETBUTTON.IO WIDGET === */
(function () {
    var options = {
        phone: "+254785696640", // Your phone number
        call_to_action: "Call Us Now", // Custom message
        position: "right", // Position of the button (left or right)
    };
    var proto = document.location.protocol,
        host = "getbutton.io";
    var s = document.createElement('script');
    s.type = 'text/javascript';
    s.async = true;
    s.src = proto + '//static.' + host + '/widget-send-button/js/init.js';
    s.onload = function () {
        GetButton.init(options);
    };
    var x = document.getElementsByTagName('script')[0];
    x.parentNode.insertBefore(s, x);
})();

function animateCount(el, opts={}){
  const duration = Number(el.dataset.duration || opts.duration || 1800);
  const decimals = Number(el.dataset.decimals || 0);
  const target = Number(el.dataset.target || 0);
  const prefix = el.dataset.prefix || "";
  const suffix = el.dataset.suffix || "";
  
  
  const start = performance.now();
  const startVal = 0;
  
  
  function format(val){
  const fixed = val.toFixed(decimals);
  const parts = fixed.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return prefix + parts.join('.') + suffix;
  }
  
  
  function frame(now){
  const t = Math.min(1, (now - start) / duration);
  const eased = 1 - Math.pow(1 - t, 3);
  const val = startVal + (target - startVal) * eased;
  el.textContent = format(val);
  if(t < 1){ requestAnimationFrame(frame); }
  }
  requestAnimationFrame(frame);
  }
  
  
  function startLiveTicker(el){
  const decimals = Number(el.dataset.decimals || 0);
  let base = Number(el.dataset.target || 0);
  const variance = Number(el.dataset.liveVariance || 5);
  const interval = Number(el.dataset.liveInterval || 3000);
  
  
  function nudge(){
  const drift = Math.max(0, Math.round((Math.random() * variance)));
  base += drift;
  el.dataset.target = String(base);
  animateCount(el, {duration: 800});
  }
  const id = setInterval(nudge, interval);
  el._liveId = id;
  }
  
  
  const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
  if(entry.isIntersecting){
  const el = entry.target;
  animateCount(el);
  if(el.dataset.live === 'true'){
  startLiveTicker(el);
  }
  observer.unobserve(el);
  }
  })
  }, {threshold: .4});
  
  
  document.querySelectorAll('.value').forEach(el=> observer.observe(el));
