(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))i(n);new MutationObserver(n=>{for(const a of n)if(a.type==="childList")for(const c of a.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&i(c)}).observe(document,{childList:!0,subtree:!0});function o(n){const a={};return n.integrity&&(a.integrity=n.integrity),n.referrerPolicy&&(a.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?a.credentials="include":n.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(n){if(n.ep)return;n.ep=!0;const a=o(n);fetch(n.href,a)}})();document.addEventListener("DOMContentLoaded",()=>{const t=document.getElementById("jobType"),e=document.getElementById("yachtType"),o=document.getElementById("department"),i=document.getElementById("vesselSize"),n=document.getElementById("keyword"),a=document.getElementById("jobList"),c=[{title:"Service Stewardess",yacht:"Motor",department:"Interior",vesselSize:"31m–50m",type:"Permanent",description:"Provide exceptional service for guests aboard a luxurious new build yacht. A solid knowledge of cocktails and wine is required.",location:"50m Private Yacht, Mediterranean",salary:"€4,500/month",startDate:"Mid-February"},{title:"Deckhand",yacht:"Sailing",department:"Deck",vesselSize:"51m–80m",type:"Seasonal",description:"Support sailing operations, maintain the deck’s cleanliness, assist with technical duties, and participate in mooring and docking procedures. A Yachtmaster qualification is preferred.",location:"52m Sailing Yacht, Caribbean",salary:"$4,000/month",visaRequirement:"B1/B2 Visa",startDate:"ASAP"},{title:"Sous Chef",yacht:"Motor",department:"Galley",vesselSize:"81m–100m",type:"Temporary",description:"Create gourmet meals for guests and crew, handle menu planning and provisioning, and maintain high culinary standards.",location:"81m Motor Yacht",salary:"DOE but competitive",startDate:"March"}];function l(){const r=n.value.toLowerCase(),s=t.value,d=e.value,y=o.value,p=i.value,f=c.filter(m=>{const h=r===""||m.title.toLowerCase().includes(r)||m.description.toLowerCase().includes(r),v=s===""||m.type===s,b=d===""||m.yacht===d,E=y===""||m.department===y,S=p===""||m.vesselSize===p;return h&&v&&b&&E&&S});u(f)}function u(r){if(a.innerHTML="",r.length===0){a.innerHTML="<p>No jobs found.</p>";return}r.forEach(s=>{const d=document.createElement("div");d.classList.add("job"),d.innerHTML=`
                <div>
                    <h3>${s.title} (${s.location})</h3>
                    <p><strong>Type:</strong> ${s.type}</p>
                    <p><strong>Yacht:</strong> ${s.yacht}</p>
                    <p><strong>Department:</strong> ${s.department}</p>
                    <p><strong>Vessel Size:</strong> ${s.vesselSize}</p>
                    <p><strong>Description:</strong> ${s.description}</p>
                    <p><strong>Salary:</strong> ${s.salary}</p>
                    ${s.visaRequirement?`<p><strong>Visa Requirement:</strong> ${s.visaRequirement}</p>`:""}
                    <p><strong>Start Date:</strong> ${s.startDate}</p>
                </div>
                <a href="#contacts" class="apply-btn">Apply</a>
            `,d.querySelector(".apply-btn").addEventListener("click",p=>{p.preventDefault(),document.getElementById("contacts").scrollIntoView({behavior:"smooth"})}),a.appendChild(d)})}[t,e,o,i].forEach(r=>{r.addEventListener("click",()=>{Array.from(r.options).forEach(s=>{s.disabled=!1}),r.options[0].disabled=!0})}),u(c),document.querySelector(".search-bar button").addEventListener("click",l),[t,e,o,i].forEach(r=>{r.addEventListener("change",l)}),n.addEventListener("input",l)});document.getElementById("cv").addEventListener("change",function(){const t=document.getElementById("cv"),e=t.files,o=document.getElementById("fileNameDisplay");if(e.length>1){alert("You can only upload one file."),t.value="",o.textContent="No file selected";return}e.length===1?(o.textContent=`Selected file: ${e[0].name}`,o.style.color="#28a745"):(o.textContent="No file selected.",o.style.color="#dc3545")});document.getElementById("applyForm").addEventListener("submit",async function(t){t.preventDefault();const e=new FormData;e.append("jobPosition",document.getElementById("jobPosition").value.trim()),e.append("firstName",document.getElementById("firstName").value.trim()),e.append("lastName",document.getElementById("lastName").value.trim()),e.append("email",document.getElementById("email").value.trim()),e.append("cv",document.getElementById("cv").files[0]);try{(await fetch("/apply",{method:"POST",body:e})).ok?g("Application submitted successfully!"):alert("Failed to submit the application. Please try again.")}catch(o){console.error(o),alert("An error occurred. Please try again later.")}});document.querySelector(".yacht-crew-form").addEventListener("submit",async function(t){t.preventDefault();const e=document.getElementById("position").value.trim(),o=document.getElementById("yacht-type").value.trim(),i=document.getElementById("first-name").value.trim(),n=document.getElementById("last-name").value.trim(),a=document.getElementById("email").value.trim(),c=document.getElementById("contact").value.trim(),l=document.getElementById("details").value.trim();if(!e||!o||!i||!n||!a||!c||!l){alert("Please fill out all fields.");return}if(!w(a)){alert("Please enter a valid email address.");return}const u={position:e,yachtType:o,firstName:i,lastName:n,email:a,contact:c,details:l};try{(await fetch("/yacht-crew",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(u)})).ok?g("Yacht crew request submitted successfully!"):alert("Failed to submit the yacht crew request. Please try again.")}catch(r){console.error(r),alert("An error occurred. Please try again later.")}});function w(t){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}function g(t){const e=document.createElement("div");e.id="successModal",e.innerHTML=`
      <div class="modal-content">
          <h2>Success</h2>
          <p>${t}</p>
          <button id="closeModalButton">Close</button>
      </div>
  `,document.body.appendChild(e);const o=document.createElement("style");o.textContent=`
      #successModal {
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
  `,document.head.appendChild(o),document.getElementById("closeModalButton").addEventListener("click",function(){document.body.removeChild(e)})}document.querySelector(".yacht-crew-form").addEventListener("submit",function(t){t.preventDefault();const e=document.getElementById("position").value.trim(),o=document.getElementById("yacht-type").value.trim(),i=document.getElementById("first-name").value.trim(),n=document.getElementById("last-name").value.trim(),a=document.getElementById("email").value.trim(),c=document.getElementById("contact").value.trim(),l=document.getElementById("details").value.trim();if(!e||!o||!i||!n||!a||!c){alert("Please fill out all required fields.");return}if(!I(a)){alert("Please enter a valid email address.");return}fetch("http://localhost:3000/yacht-crew",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({position:e,yachtType:o,firstName:i,lastName:n,email:a,contact:c,details:l})}).then(r=>{if(!r.ok)throw new Error("Failed to submit the form. Please try again.");return r.json()}).then(r=>{console.log(r.message),x()}).catch(r=>{console.error(r.message),alert("There was an error submitting the form. Please try again later.")})});function x(){const t=document.createElement("div");t.id="crewSuccessModal",t.innerHTML=`
      <div class="modal-content">
          <h2>Request Submitted</h2>
          <p>Your request has been successfully submitted! We will contact you soon.</p>
          <button id="closeCrewModalButton">Close</button>
      </div>
  `,document.body.appendChild(t);const e=document.createElement("style");e.textContent=`
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
  `,document.head.appendChild(e),document.getElementById("closeCrewModalButton").addEventListener("click",function(){document.body.removeChild(t)})}function I(t){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(t)}
//# sourceMappingURL=index.js.map
