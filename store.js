const products=[
 {id:1,name:"DRIP CLIENT",cat:"code",tag:"Digital Product",desc:"Drip Client adalah client ringan dan powerful untuk Minecraft dengan berbagai fitur unggulan.",image:"assets/drip-client.png",options:[
  {name:"DRIP 1 DAY",price:15000,desc:"Akses Drip Client selama 1 hari"},
  {name:"DRIP 3 DAY",price:25000,desc:"Akses Drip Client selama 3 hari"},
  {name:"DRIP 7 DAY",price:50000,desc:"Akses Drip Client selama 7 hari"}
 ]},
 {id:2,name:"PROXY DRIP CLIENT",cat:"proxy",tag:"NEW • PROXY",desc:"Proxy Drip Client dengan penggunaan yang lebih mudah dan simple untuk pengalaman yang praktis.",image:"assets/proxy-drip-client.png",options:[
  {name:"PROXY DRIP CLIENT 1 DAY",price:15000,desc:"Akses Proxy Drip Client selama 1 hari"},
  {name:"PROXY DRIP CLIENT 3 DAY",price:25000,desc:"Akses Proxy Drip Client selama 3 hari"},
  {name:"PROXY DRIP CLIENT 7 DAY",price:45000,oldPrice:50000,desc:"Promo 7 hari — harga normal Rp50.000"}
 ]}
];

let selectedProduct=null,selectedOption=null;
const money=n=>"Rp "+n.toLocaleString("id-ID");
const productsEl=document.getElementById("products");
const search=document.getElementById("search");

function render(){
 const q=(search?.value||"").trim().toLowerCase();
 const list=products.filter(p=>!q||`${p.name} ${p.desc}`.toLowerCase().includes(q));
 productsEl.innerHTML=list.length?list.map(p=>`<article class="product"><div class="cover"><img src="${p.image}" alt="${p.name}"></div><div class="product-body"><span class="tag">${p.tag}</span><h3>${p.name}</h3><p>${p.desc}</p><div class="price-row"><span class="price">Mulai ${money(p.options[0].price)}</span><button class="buy view-product" data-id="${p.id}">View Product</button></div></div></article>`).join(""):"<div class=\"empty-products\">Produk tidak ditemukan.</div>";
 document.getElementById("resultText").textContent=`Showing ${list.length} product${list.length===1?"":"s"}`;
 document.querySelectorAll(".view-product").forEach(b=>b.onclick=()=>openProduct(products.find(p=>p.id===Number(b.dataset.id))));
}

function openProduct(p){
 selectedProduct=p;
 selectedOption=p.options[0];
 document.getElementById("detailImage").innerHTML=`<img src="${p.image}" alt="${p.name}">`;
 document.getElementById("detailName").textContent=p.name;
 document.getElementById("detailDesc").textContent=p.desc;
 document.getElementById("chosenPrice").textContent=money(selectedOption.price);
 document.getElementById("options").innerHTML=p.options.map((o,i)=>`<button class="option ${i===0?"selected":""}" data-i="${i}" type="button"><span><b>${o.name}</b><small>${o.desc}</small></span><strong>${o.oldPrice?`<del>${money(o.oldPrice)}</del> `:""}${money(o.price)}</strong></button>`).join("");
 document.querySelectorAll(".option").forEach(b=>b.onclick=()=>{
   selectedOption=p.options[Number(b.dataset.i)];
   document.querySelectorAll(".option").forEach(x=>x.classList.remove("selected"));
   b.classList.add("selected");
   document.getElementById("chosenPrice").textContent=money(selectedOption.price);
 });
 document.getElementById("detailModal").classList.add("show");
}

function closeDetail(){
 document.getElementById("detailModal").classList.remove("show");
}

function resetPaymentPanels(){
 document.getElementById("qrisPanel")?.classList.remove("active");
 document.getElementById("saweriaPanel")?.classList.remove("active");
}

function openCheckout(){
 if(!selectedOption)return;
 document.getElementById("checkoutProduct").textContent=selectedOption.name;
 document.getElementById("checkoutPrice").textContent=money(selectedOption.price);
 const text=`Halo PERO STORE, saya ingin order ${selectedOption.name} (${money(selectedOption.price)}).`;
 document.getElementById("waButton").href=`https://wa.me/6282385143705?text=${encodeURIComponent(text)}`;
 resetPaymentPanels();
 closeDetail();
 document.getElementById("checkoutModal").classList.add("show");
}

document.getElementById("buyNow")?.addEventListener("click",openCheckout);
document.getElementById("closeDetail")?.addEventListener("click",closeDetail);
document.getElementById("closeCheckout")?.addEventListener("click",()=>{
 document.getElementById("checkoutModal").classList.remove("show");
 resetPaymentPanels();
});
document.getElementById("qrisPayment")?.addEventListener("click",()=>{
 resetPaymentPanels();
 document.getElementById("qrisPanel")?.classList.add("active");
});
document.getElementById("saweriaPayment")?.addEventListener("click",()=>{
 resetPaymentPanels();
 document.getElementById("saweriaPanel")?.classList.add("active");
});
search?.addEventListener("input",render);

document.addEventListener("click",e=>{
 if(e.target.classList.contains("modal")){
   e.target.classList.remove("show");
   resetPaymentPanels();
 }
});

render();
