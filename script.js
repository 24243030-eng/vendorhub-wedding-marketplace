const vendorData = [
 {id:1,name:"The Grand Orchid",category:"Venues",location:"Chennai, Tamil Nadu",rating:4.9,price:125000,priceText:"₹1,25,000",image:"https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=900&q=80",description:"An elegant celebration venue with landscaped outdoor spaces, a spacious hall and a dedicated event support team.",services:["Reception","Engagement","Wedding ceremony"],packages:[["Essential","₹1,25,000"],["Signature","₹2,10,000"],["Grand","₹3,50,000"]]},
 {id:2,name:"Golden Hour Studios",category:"Photographers",location:"Bengaluru, Karnataka",rating:4.8,price:45000,priceText:"₹45,000",image:"https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=900&q=80",description:"A photography team focused on candid moments, portraits and storytelling across your wedding celebrations.",services:["Wedding photography","Candid photography","Pre-wedding shoot"],packages:[["Essential","₹45,000"],["Signature","₹75,000"],["Grand","₹1,20,000"]]},
 {id:3,name:"Spice Route Caterers",category:"Caterers",location:"Coimbatore, Tamil Nadu",rating:4.7,price:65000,priceText:"₹65,000",image:"https://images.unsplash.com/photo-1555244162-803834f70033?auto=format&fit=crop&w=900&q=80",description:"A catering service offering traditional South Indian menus, live counters and custom menus for special events.",services:["South Indian menu","Live counters","Dessert station"],packages:[["Essential","₹65,000"],["Signature","₹95,000"],["Grand","₹1,60,000"]]},
 {id:4,name:"Petal & Promise",category:"Florists",location:"Chennai, Tamil Nadu",rating:4.8,price:38000,priceText:"₹38,000",image:"https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=900&q=80",description:"Floral styling and decor for mandaps, entrances, tables and intimate celebrations, tailored to your colour palette.",services:["Mandap decor","Floral arrangements","Bridal bouquets"],packages:[["Essential","₹38,000"],["Signature","₹72,000"],["Grand","₹1,40,000"]]},
 {id:5,name:"Blush Bridal Studio",category:"Makeup Artists",location:"Hyderabad, Telangana",rating:4.9,price:22000,priceText:"₹22,000",image:"https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?auto=format&fit=crop&w=900&q=80",description:"Bridal makeup and styling services with trial sessions and looks designed around your event and personal style.",services:["Bridal makeup","Hairstyling","Draping"],packages:[["Essential","₹22,000"],["Signature","₹38,000"],["Grand","₹60,000"]]},
 {id:6,name:"EverAfter Planners",category:"Planners",location:"Puducherry",rating:4.6,price:90000,priceText:"₹90,000",image:"https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=900&q=80",description:"An event planning team that coordinates vendors, timelines and details so couples can enjoy their celebration.",services:["Full wedding planning","Day coordination","Theme planning"],packages:[["Essential","₹90,000"],["Signature","₹1,50,000"],["Grand","₹2,75,000"]]},
 {id:7,name:"Rhythm Wedding DJs",category:"Planners",location:"Madurai, Tamil Nadu",rating:4.5,price:18000,priceText:"₹18,000",image:"https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&w=900&q=80",description:"Music, sound and lighting for receptions and pre-wedding events, with playlists tailored to your crowd.",services:["DJ setup","Sound and lights","Sangeet night"],packages:[["Essential","₹18,000"],["Signature","₹32,000"],["Grand","₹55,000"]]},
 {id:8,name:"Seaside Celebration Resort",category:"Venues",location:"Mahabalipuram, Tamil Nadu",rating:4.8,price:180000,priceText:"₹1,80,000",image:"https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?auto=format&fit=crop&w=900&q=80",description:"A coastal venue concept for destination-style celebrations, with scenic spaces and accommodation options.",services:["Beachside ceremony","Reception","Guest stay"],packages:[["Essential","₹1,80,000"],["Signature","₹2,80,000"],["Grand","₹4,50,000"]]}
];

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const readStore = (key, fallback) => { try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; } };
let favourites = readStore("vendorhub_favourites", []);
let bookings = readStore("vendorhub_bookings", []);
const money = value => "₹" + Number(value).toLocaleString("en-IN");
const safe = text => String(text).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[ch]));
function saveState(){localStorage.setItem("vendorhub_favourites",JSON.stringify(favourites));localStorage.setItem("vendorhub_bookings",JSON.stringify(bookings));}
function toast(message){const el=$("#toast");el.textContent=message;el.classList.add("show");clearTimeout(toast.timer);toast.timer=setTimeout(()=>el.classList.remove("show"),2600);}
function renderVendors(){
 const q=$("#vendorSearch").value.trim().toLowerCase(), cat=$("#categoryFilter").value, price=$("#priceFilter").value, rating=Number($("#ratingFilter").value);
 const filtered=vendorData.filter(v=>{
   const matchText=(v.name+" "+v.location+" "+v.category+" "+v.description).toLowerCase().includes(q);
   const matchCat=cat==="All"||v.category===cat;
   const matchRating=v.rating>=rating;
   const matchPrice=price==="All"||(price==="low"&&v.price<50000)||(price==="mid"&&v.price>=50000&&v.price<=100000)||(price==="high"&&v.price>100000);
   return matchText&&matchCat&&matchRating&&matchPrice;
 });
 $("#vendorGrid").innerHTML=filtered.map(v=>`<article class="vendor-card">
  <div class="vendor-image"><img src="${v.image}" alt="${safe(v.name)}" loading="lazy"><span class="tag">${safe(v.category)}</span>
  <button class="fav-btn ${favourites.includes(v.id)?"saved":""}" data-fav="${v.id}" aria-label="Save ${safe(v.name)}">${favourites.includes(v.id)?"♥":"♡"}</button></div>
  <div class="vendor-info"><div class="vendor-top"><h3>${safe(v.name)}</h3><span class="rating">★ ${v.rating.toFixed(1)}</span></div>
  <p class="vendor-location">⌖ ${safe(v.location)}</p><div class="vendor-bottom"><span class="price">${v.priceText}<small>Starting price</small></span><button class="view-btn" data-view="${v.id}">View details</button></div></div></article>`).join("");
 $("#emptyState").classList.toggle("hidden",filtered.length>0);
 $("#statVendors").textContent=vendorData.length;
 $("#statFavourites").textContent=favourites.length;
 $("#statBookings").textContent=bookings.length;
 $("#statRating").textContent=(vendorData.reduce((a,v)=>a+v.rating,0)/vendorData.length).toFixed(1);
}
function showVendor(id){
 const v=vendorData.find(x=>x.id===Number(id));if(!v)return;
 $("#vendorDialogContent").innerHTML=`<p class="eyebrow">${safe(v.category.toUpperCase())}</p><h2>${safe(v.name)}</h2><img class="detail-image" src="${v.image}" alt="${safe(v.name)}">
 <div class="detail-meta"><span class="detail-chip">★ ${v.rating.toFixed(1)} rating</span><span class="detail-chip">⌖ ${safe(v.location)}</span><span class="detail-chip">From ${v.priceText}</span></div>
 <p class="detail-copy">${safe(v.description)}</p><h3>Services</h3><div class="detail-meta">${v.services.map(s=>`<span class="detail-chip">${safe(s)}</span>`).join("")}</div><h3>Sample packages</h3>
 ${v.packages.map(p=>`<div class="package-row"><span>${safe(p[0])} package</span><strong>${safe(p[1])}</strong></div>`).join("")}
 <button class="btn primary full" id="detailBookBtn" data-book="${v.id}">Request a booking</button>`;
 $("#vendorDialog").showModal();
}
function openBooking(id){const v=vendorData.find(x=>x.id===Number(id));if(!v)return;$("#bookingVendorId").value=v.id;$("#bookingDialog h2").textContent="Request a booking — "+v.name;$("#bookingForm").reset();$("#bookingVendorId").value=v.id;$("#bookingDate").min=new Date().toISOString().slice(0,10);$("#bookingDialog").showModal();}
function renderBookings(){
 if(!bookings.length){$("#bookingList").innerHTML = "<p class='muted'>You haven't sent any booking requests yet. Choose a vendor and select a booking option to start.</p>";}
 else{$("#bookingList").innerHTML=bookings.slice().reverse().map(b=>`<article class="booking-item"><div><strong>${safe(b.vendorName)}</strong><small>${safe(b.package)} package · ${safe(b.date)} · ${safe(b.name)}</small><small>${safe(b.message||"No additional message")}</small></div><span class="status">${safe(b.status)}</span></article>`).join("");}
 $("#statBookings").textContent=bookings.length;
}
$("#vendorGrid").addEventListener("click",e=>{
 const fav=e.target.closest("[data-fav]"), view=e.target.closest("[data-view]");
 if(fav){const id=Number(fav.dataset.fav);favourites=favourites.includes(id)?favourites.filter(x=>x!==id):[...favourites,id];saveState();renderVendors();toast(favourites.includes(id)?"Added to favourites":"Removed from favourites");}
 if(view)showVendor(view.dataset.view);
});
$("#vendorDialogContent").addEventListener("click",e=>{const b=e.target.closest("[data-book]");if(b){$("#vendorDialog").close();openBooking(b.dataset.book);}});
$("#bookingForm").addEventListener("submit",e=>{
 e.preventDefault();const v=vendorData.find(x=>x.id===Number($("#bookingVendorId").value));if(!v)return;
 const booking={id:Date.now(),vendorId:v.id,vendorName:v.name,name:$("#bookingName").value.trim(),date:$("#bookingDate").value,package:$("#bookingPackage").value,message:$("#bookingMessage").value.trim(),status:"Request sent"};
 bookings.push(booking);saveState();renderBookings();$("#bookingDialog").close();toast("Booking request saved in this browser!");
});
["vendorSearch","categoryFilter","priceFilter","ratingFilter"].forEach(id=>$("#"+id).addEventListener("input",renderVendors));
$("#heroSearchBtn").addEventListener("click",()=>{$("#vendorSearch").value=$("#heroSearch").value;$("#categoryFilter").value="All";renderVendors();$("#vendors").scrollIntoView({behavior:"smooth"});});
$("#heroSearch").addEventListener("keydown",e=>{if(e.key==="Enter")$("#heroSearchBtn").click();});
$$(".category-card").forEach(btn=>btn.addEventListener("click",()=>{$$(".category-card").forEach(b=>b.classList.remove("active"));btn.classList.add("active");$("#categoryFilter").value=btn.dataset.category;renderVendors();$("#vendors").scrollIntoView({behavior:"smooth"});}));
$("#themeToggle").addEventListener("click",()=>{document.body.classList.toggle("dark");localStorage.setItem("vendorhub_dark",document.body.classList.contains("dark")?"1":"0");});
if(readStore("vendorhub_dark","0")==="1")document.body.classList.add("dark");
$("#menuToggle").addEventListener("click",()=>$("#mainNav").classList.toggle("open"));
$("#mainNav").addEventListener("click",e=>{if(e.target.closest("a"))$("#mainNav").classList.remove("open");});
$("#closeVendorDialog").addEventListener("click",()=>$("#vendorDialog").close());
$("#closeBookingDialog").addEventListener("click",()=>$("#bookingDialog").close());
$("#manageVendors").addEventListener("click",()=>$("#vendors").scrollIntoView({behavior:"smooth"}));
$("#resetDemo").addEventListener("click",()=>{if(confirm("Reset saved favourites, bookings and theme preference?")){favourites=[];bookings=[];localStorage.removeItem("vendorhub_favourites");localStorage.removeItem("vendorhub_bookings");localStorage.removeItem("vendorhub_dark");document.body.classList.remove("dark");renderVendors();renderBookings();toast("Demo data has been reset.");}});
renderVendors();renderBookings();
