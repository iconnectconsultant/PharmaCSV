const catalog=[
{group:'Pharma & Life Sciences',cat:'pharma',items:['Computer System Validation (CSV)','Computer Software Assurance (CSA)','Equipment Qualification (IQ/OQ/PQ)','Process Validation','Cleaning Validation','Data Integrity (ALCOA+)']},
{group:'Pharma Quality & Regulatory',cat:'pharma',items:['Quality Management Systems (QMS)','Regulatory Affairs','Microbiology & Sterility Assurance','Quality Control & Stability Studies','APQR','CQA & Risk Management']},
{group:'Pharma Digital Systems',cat:'pharma',items:['LIMS','MES','AI & ML in Pharma','Pharma Digital Transformation','Pharma Quality & Compliance','GxP System Validation']},
{group:'AI / ML & Data',cat:'it',items:['Artificial Intelligence (AI)','Machine Learning (ML)','Data Analytics','Business Analytics','AI & Data Science','Prompt Engineering']},
{group:'IT & Software Development',cat:'it',items:['Full Stack Development','Frontend Development','Backend Development','Cloud Computing','DevOps Engineering','Cybersecurity']},
{group:'Software Testing',cat:'testing',items:['Manual Testing','Automation Testing','Selenium Automation Testing','API Testing','Performance Testing','Agile Testing']},
{group:'Advanced Testing',cat:'testing',items:['Security Testing','CSV Testing','Pharma Software Testing','Validation Testing for GxP Systems','Software Testing Engineering','DevOps Testing']},
{group:'Business & Management',cat:'business',items:['Business Analysis','Product Management','Agile & Scrum','Business Analysis & Data Analytics','Project Management','Corporate Communication']},
{group:'Digital & Design',cat:'digital',items:['Digital Marketing','Performance Marketing','Digital Marketing & Analytics','UI/UX Design','Lead Generation','LinkedIn Profile Branding']}
];
const catalogEl=document.getElementById('catalog');
function render(filter='all'){
 catalogEl.innerHTML='';
 catalog.filter(c=>filter==='all'||c.cat===filter).forEach((c,i)=>{
  const card=document.createElement('article'); card.className='catalog-card reveal'; card.style.transitionDelay=`${Math.min(i*40,240)}ms`;
  card.innerHTML=`<h3>${c.group}</h3><ul>${c.items.map(item=>`<li>Professional Certification in ${item}</li>`).join('')}</ul><span class="tag">Starting ₹499* • Up to 50% OFF</span>`;
  catalogEl.appendChild(card);
 });
 observeReveal();
}
render();
document.querySelectorAll('.filters button').forEach(btn=>btn.addEventListener('click',()=>{document.querySelectorAll('.filters button').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render(btn.dataset.filter)}));
document.getElementById('year').textContent=new Date().getFullYear();
function observeReveal(){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('show')}),{threshold:.12});
 document.querySelectorAll('.reveal:not(.show)').forEach(el=>io.observe(el));
}
observeReveal();
