var P=[
{id:1,n:"Twin Mill",d:"Double-engine show rod",p:299,c:"#ff6a00",a:"#ffc400",s:0},
{id:2,n:"Bone Shaker",d:"Skull-grille hot rod",p:249,c:"#e8e8ec",a:"#ff3b4e",s:0},
{id:3,n:"Rodger Dodger",d:"Low-slung street racer",p:279,c:"#2f7bff",a:"#ffffff",s:1},
{id:4,n:"Deora II",d:"Surf-wagon pickup",p:329,c:"#17c27a",a:"#14161c",s:0},
{id:5,n:"Night Burner",d:"Midnight track coupe",p:259,c:"#7a3cff",a:"#ffc400",s:1},
{id:6,n:"Sharkruiser",d:"Fin-nosed cruiser",p:349,c:"#18b6d6",a:"#ffffff",s:1},
{id:7,n:"Fast Fish",d:"Quick and slippery",p:229,c:"#ffc400",a:"#14161c",s:0},
{id:8,n:"Red Baron",d:"Wing-tail speedster",p:319,c:"#ff3b4e",a:"#ffffff",s:1}
];
function car(x){
  var b=x.s?'<path d="M8 72 L14 60 L60 52 L104 30 L150 30 L176 52 L194 58 L194 72Z" fill="'+x.c+'"/><path d="M108 36 L146 36 L160 52 L98 52Z" fill="#cfe9ff"/><rect x="8" y="38" width="30" height="5" fill="'+x.a+'"/><rect x="20" y="43" width="4" height="17" fill="'+x.a+'"/><rect x="14" y="62" width="176" height="4" fill="'+x.a+'"/>'
  :'<path d="M12 72 L18 56 Q22 50 34 48 L58 46 L74 28 Q78 24 86 24 L124 24 Q132 24 138 30 L152 46 L176 50 Q190 52 190 64 L190 72Z" fill="'+x.c+'"/><path d="M80 30 L120 30 L132 44 L68 46Z" fill="#cfe9ff"/><rect x="14" y="58" width="176" height="4" fill="'+x.a+'"/>';
  return '<svg viewBox="0 0 200 96" role="img" aria-label="'+x.n+' toy car"><ellipse cx="100" cy="90" rx="86" ry="5" fill="#000" opacity=".3"/>'+b+'<g><circle cx="52" cy="74" r="15" fill="#0b0c10"/><circle cx="52" cy="74" r="6" fill="#c9ccd4"/><circle cx="150" cy="74" r="15" fill="#0b0c10"/><circle cx="150" cy="74" r="6" fill="#c9ccd4"/></g></svg>';
}
var cart={},wish=[];
try{cart=JSON.parse(localStorage.getItem("plc_cart")||"{}");wish=JSON.parse(localStorage.getItem("plc_wish")||"[]")}catch(e){}
function save(){try{localStorage.setItem("plc_cart",JSON.stringify(cart));localStorage.setItem("plc_wish",JSON.stringify(wish))}catch(e){}}
function find(id){return P.filter(function(x){return x.id==id})[0]}
function money(n){return "₹"+n.toLocaleString("en-IN")}
var heartSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-8-5.2-8-11a4.5 4.5 0 0 1 8-2.8A4.5 4.5 0 0 1 20 10c0 5.8-8 11-8 11z"/></svg>';
function card(x){
  var w=wish.indexOf(x.id)>-1;
  return '<article class="card"><div class="pic">'+car(x)+'</div><div class="info"><h3>'+x.n+'</h3><small>'+x.d+'</small><div class="buy"><span class="price">'+money(x.p)+'</span><div class="acts"><button class="add" data-act="add" data-id="'+x.id+'">Add to cart</button><button class="heart" data-act="wish" data-id="'+x.id+'" aria-pressed="'+w+'" aria-label="'+(w?"Remove ":"Add ")+x.n+(w?" from":" to")+' wishlist">'+heartSvg+'</button></div></div></div></article>';
}
function home(){
  return '<section class="hero"><div class="wrap"><h1>Fast cars.<br>Small enough<br>to keep.</h1><p>Collect 1:64 scale racers, hot rods and show cars. Pick your favourites and take them home.</p><a class="btn dark" href="#products">Shop all cars</a><div class="car">'+car(P[0])+'</div></div></section>'+
  '<section class="pad"><div class="wrap"><h2>Fresh off the track</h2><div class="grid">'+P.slice(2,5).map(card).join("")+'</div><p style="margin-top:24px"><a class="btn" href="#products">See all '+P.length+' cars</a></p></div></section>';
}
function products(){return '<section class="pad"><div class="wrap"><h2>All cars</h2><div class="grid">'+P.map(card).join("")+'</div></div></section>'}
function cartPg(){
  var ids=Object.keys(cart),t=0,h;
  if(!ids.length)h='<div class="empty"><p>Your cart is empty. Add a car to start your collection.</p><a class="btn" href="#products">Browse cars</a></div>';
  else{h=ids.map(function(i){var x=find(i),q=cart[i];t+=x.p*q;
    return '<div class="row"><div>'+car(x)+'</div><div><div class="t">'+x.n+'</div><small>'+money(x.p)+' each</small><div class="qty"><button data-act="dec" data-id="'+i+'" aria-label="Decrease quantity">−</button><b>'+q+'</b><button data-act="inc" data-id="'+i+'" aria-label="Increase quantity">+</button><button class="link" data-act="rm" data-id="'+i+'">Remove</button></div></div><div class="rt"><span class="price">'+money(x.p*q)+'</span></div></div>'}).join("")+
    '<div class="total"><span>Total</span><strong>'+money(t)+'</strong><button class="btn dark" data-act="buy">Place order</button></div>'}
  return '<section class="pad"><div class="wrap"><h2>Your cart</h2>'+h+'</div></section>';
}
function wishPg(){
  var h=wish.length?'<div class="grid">'+wish.map(function(i){return card(find(i))}).join("")+'</div>':'<div class="empty"><p>No favourites yet. Tap the heart on any car to save it here.</p><a class="btn" href="#products">Browse cars</a></div>';
  return '<section class="pad"><div class="wrap"><h2>Your wishlist</h2>'+h+'</div></section>';
}
var R={home:home,products:products,cart:cartPg,wishlist:wishPg};
function render(){
  var r=location.hash.slice(1);if(!R[r])r="home";
  document.getElementById("app").innerHTML=R[r]();
  document.querySelectorAll("nav a").forEach(function(a){a.dataset.r==r?a.setAttribute("aria-current","page"):a.removeAttribute("aria-current")});
  document.getElementById("cc").textContent=Object.keys(cart).reduce(function(s,k){return s+cart[k]},0);
  document.getElementById("wc").textContent=wish.length;
  document.title={home:"Home",products:"Products",cart:"Cart",wishlist:"Wishlist"}[r]+" – Pit Lane Diecast";
}
var tt;function toast(m){var t=document.getElementById("toast");t.textContent=m;t.classList.add("on");clearTimeout(tt);tt=setTimeout(function(){t.classList.remove("on")},1800)}
document.addEventListener("click",function(e){
  var b=e.target.closest("[data-act]");if(!b)return;
  var a=b.dataset.act,id=+b.dataset.id,x=find(id);
  if(a=="add"){cart[id]=(cart[id]||0)+1;toast(x.n+" added to cart")}
  else if(a=="wish"){var k=wish.indexOf(id);if(k>-1){wish.splice(k,1);toast("Removed from wishlist")}else{wish.push(id);toast(x.n+" saved to wishlist")}}
  else if(a=="inc")cart[id]++;
  else if(a=="dec"){cart[id]--;if(cart[id]<1)delete cart[id]}
  else if(a=="rm"){delete cart[id];toast("Removed from cart")}
  else if(a=="buy"){cart={};toast("Order placed. Thanks for racing with us!")}
  save();render();
});
window.addEventListener("hashchange",function(){render();window.scrollTo(0,0)});
render();
