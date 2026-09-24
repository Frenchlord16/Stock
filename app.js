const KEY="gestion_stock_v1";
let products=JSON.parse(localStorage.getItem(KEY)||"[]");
const $=id=>document.getElementById(id);
const money=n=>Number(n||0).toLocaleString("fr-FR",{style:"currency",currency:"EUR"});
function save(){localStorage.setItem(KEY,JSON.stringify(products));render()}
function render(){
 const q=$("search").value.toLowerCase();
 const list=products.filter(p=>(p.name+" "+p.ref+" "+p.category).toLowerCase().includes(q));
 $("productsBody").innerHTML=list.map(p=>`<tr>
 <td><b>${esc(p.name)}</b>${p.location?`<small> · ${esc(p.location)}</small>`:""}</td>
 <td>${esc(p.ref||"—")}</td><td>${esc(p.category||"—")}</td>
 <td class="${p.qty<=p.threshold?"low":"ok"}">${p.qty}</td><td>${p.threshold}</td>
 <td>${money(p.buyPrice)}</td><td>${money(p.qty*p.buyPrice)}</td>
 <td class="actions"><button onclick="movement('${p.id}',1)">+ Stock</button><button onclick="movement('${p.id}',-1)">− Stock</button><button onclick="edit('${p.id}')" class="secondary">Modifier</button><button onclick="removeP('${p.id}')" class="danger">Suppr.</button></td>
 </tr>`).join("");
 $("empty").style.display=list.length?"none":"block";
 $("countProducts").textContent=products.length;
 $("totalUnits").textContent=products.reduce((s,p)=>s+Number(p.qty),0);
 $("stockValue").textContent=money(products.reduce((s,p)=>s+p.qty*p.buyPrice,0));
 $("lowStock").textContent=products.filter(p=>p.qty<=p.threshold).length;
}
function esc(s){return String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]))}
function openModal(p=null){
 $("modalTitle").textContent=p?"Modifier un produit":"Ajouter un produit";
 $("productId").value=p?.id||"";$("name").value=p?.name||"";$("ref").value=p?.ref||"";$("category").value=p?.category||"";
 $("qty").value=p?.qty??0;$("threshold").value=p?.threshold??5;$("buyPrice").value=p?.buyPrice??0;$("sellPrice").value=p?.sellPrice??0;
 $("location").value=p?.location||"";$("notes").value=p?.notes||"";$("modal").classList.remove("hidden");
}
function closeModal(){$("modal").classList.add("hidden")}
function edit(id){openModal(products.find(p=>p.id===id))}
function removeP(id){if(confirm("Supprimer ce produit ?")){products=products.filter(p=>p.id!==id);save()}}
function movement(id,delta){const p=products.find(p=>p.id===id);if(!p)return;const n=p.qty+delta;if(n<0)return alert("Stock insuffisant.");p.qty=n;save()}
$("addBtn").onclick=()=>openModal();$("closeBtn").onclick=closeModal;$("cancelBtn").onclick=closeModal;$("search").oninput=render;
$("productForm").onsubmit=e=>{e.preventDefault();const id=$("productId").value;const data={id:id||crypto.randomUUID(),name:$("name").value.trim(),ref:$("ref").value.trim(),category:$("category").value.trim(),qty:+$("qty").value,threshold:+$("threshold").value,buyPrice:+$("buyPrice").value,sellPrice:+$("sellPrice").value,location:$("location").value.trim(),notes:$("notes").value.trim()};if(!data.name)return;
 const i=products.findIndex(p=>p.id===data.id);if(i>=0)products[i]=data;else products.push(data);save();closeModal()};
if("serviceWorker" in navigator)navigator.serviceWorker.register("sw.js").catch(()=>{});
let deferredPrompt;$("installBtn").onclick=async()=>{if(deferredPrompt){deferredPrompt.prompt();deferredPrompt=null}};
window.addEventListener("beforeinstallprompt",e=>{e.preventDefault();deferredPrompt=e;$("installBtn").classList.remove("hidden")});
render();
