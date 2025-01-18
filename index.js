(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const c of t.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("jobType"),o=document.getElementById("yachtType"),s=document.getElementById("department"),i=document.getElementById("vesselSize"),e=document.getElementById("keyword"),t=document.getElementById("jobList"),c=[{title:"Service Stewardess",yacht:"Motor",department:"Interior",vesselSize:"31m–50m",type:"Permanent",description:"Provide exceptional service for guests aboard a luxurious new build yacht. A solid knowledge of cocktails and wine is required.",location:"50m Private Yacht, Mediterranean",salary:"€4,500/month",startDate:"Mid-February"},{title:"Deckhand",yacht:"Sailing",department:"Deck",vesselSize:"51m–80m",type:"Seasonal",description:"Support sailing operations, maintain the deck’s cleanliness, assist with technical duties, and participate in mooring and docking procedures. A Yachtmaster qualification is preferred.",location:"52m Sailing Yacht, Caribbean",salary:"$4,000/month",visaRequirement:"B1/B2 Visa",startDate:"ASAP"},{title:"Sous Chef",yacht:"Motor",department:"Galley",vesselSize:"81m–100m",type:"Temporary",description:"Create gourmet meals for guests and crew, handle menu planning and provisioning, and maintain high culinary standards.",location:"81m Motor Yacht",salary:"DOE but competitive",startDate:"March"}];function u(){const n=e.value.toLowerCase(),r=a.value,l=o.value,y=s.value,m=i.value,h=c.filter(d=>{const g=n===""||d.title.toLowerCase().includes(n)||d.description.toLowerCase().includes(n),f=r===""||d.type===r,v=l===""||d.yacht===l,b=y===""||d.department===y,S=m===""||d.vesselSize===m;return g&&f&&v&&b&&S});p(h)}function p(n){if(t.innerHTML="",n.length===0){t.innerHTML="<p>No jobs found.</p>";return}n.forEach(r=>{const l=document.createElement("div");l.classList.add("job"),l.innerHTML=`
                <div>
                    <h3>${r.title} (${r.location})</h3>
                    <p><strong>Type:</strong> ${r.type}</p>
                    <p><strong>Yacht:</strong> ${r.yacht}</p>
                    <p><strong>Department:</strong> ${r.department}</p>
                    <p><strong>Vessel Size:</strong> ${r.vesselSize}</p>
                    <p><strong>Description:</strong> ${r.description}</p>
                    <p><strong>Salary:</strong> ${r.salary}</p>
                    ${r.visaRequirement?`<p><strong>Visa Requirement:</strong> ${r.visaRequirement}</p>`:""}
                    <p><strong>Start Date:</strong> ${r.startDate}</p>
                </div>
                <a href="#contacts" class="apply-btn">Apply</a>
            `,l.querySelector(".apply-btn").addEventListener("click",m=>{m.preventDefault(),document.getElementById("contacts").scrollIntoView({behavior:"smooth"})}),t.appendChild(l)})}[a,o,s,i].forEach(n=>{n.addEventListener("click",()=>{Array.from(n.options).forEach(r=>{r.disabled=!1}),n.options[0].disabled=!0})}),p(c),document.querySelector(".search-bar button").addEventListener("click",u),[a,o,s,i].forEach(n=>{n.addEventListener("change",u)}),e.addEventListener("input",u)});document.addEventListener("DOMContentLoaded",()=>{const a=document.getElementById("jobPosition");document.querySelectorAll(".apply-btn").forEach(o=>{o.addEventListener("click",s=>{s.preventDefault();const e=s.target.closest(".job").querySelector("h3").textContent.split(" (")[0];a.value=e,document.getElementById("apply").scrollIntoView({behavior:"smooth"})})})});document.querySelector(".yacht-crew-form").addEventListener("submit",function(a){a.preventDefault();const o=document.getElementById("position").value.trim(),s=document.getElementById("yacht-type").value.trim(),i=document.getElementById("first-name").value.trim(),e=document.getElementById("last-name").value.trim(),t=document.getElementById("email").value.trim(),c=document.getElementById("contact").value.trim(),u=document.getElementById("details").value.trim();if(!o||!s||!i||!e||!t||!c){alert("Please fill out all required fields.");return}if(!w(t)){alert("Please enter a valid email address.");return}fetch("http://localhost:3000/yacht-crew",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({position:o,yachtType:s,firstName:i,lastName:e,email:t,contact:c,details:u})}).then(n=>{if(!n.ok)throw new Error("Failed to submit the form. Please try again.");return n.json()}).then(n=>{console.log(n.message),E()}).catch(n=>{console.error(n.message),alert("There was an error submitting the form. Please try again later.")})});function E(){const a=document.createElement("div");a.id="crewSuccessModal",a.innerHTML=`
      <div class="modal-content">
          <h2>Request Submitted</h2>
          <p>Your request has been successfully submitted! We will contact you soon.</p>
          <button id="closeCrewModalButton">Close</button>
      </div>
  `,document.body.appendChild(a);const o=document.createElement("style");o.textContent=`
      #crewSuccessModal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
      }
      .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
          animation: fadeIn 0.3s ease-in-out;
      }
      .modal-content h2 {
          margin: 0 0 10px;
          color: #28a745;
      }
      .modal-content p {
          margin: 0 0 20px;
          color: #333;
      }
      .modal-content button {
          background-color: #28a745;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 5px;
          cursor: pointer;
          font-size: 16px;
          transition: background-color 0.3s;
      }
      .modal-content button:hover {
          background-color: #218838;
      }
      @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
      }
  `,document.head.appendChild(o),document.getElementById("closeCrewModalButton").addEventListener("click",function(){document.body.removeChild(a)})}function w(a){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(a)}
//# sourceMappingURL=index.js.map
