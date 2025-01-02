(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&r(l)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerPolicy&&(o.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?o.credentials="include":e.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function r(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}})();document.addEventListener("DOMContentLoaded",()=>{const n=document.getElementById("jobType"),t=document.getElementById("yachtType"),s=document.getElementById("department"),r=document.getElementById("vesselSize"),e=document.getElementById("keyword"),o=document.getElementById("jobList"),l=[{title:"Service Stewardess",yacht:"Motor",department:"Interior",vesselSize:"31m–50m",type:"Permanent",description:"Provide exceptional service for guests aboard a luxurious new build yacht. A solid knowledge of cocktails and wine is required.",location:"50m Private Yacht, Mediterranean",salary:"€4,500/month",startDate:"Mid-February"},{title:"Deckhand",yacht:"Sailing",department:"Deck",vesselSize:"51m–80m",type:"Seasonal",description:"Support sailing operations, maintain the deck’s cleanliness, assist with technical duties, and participate in mooring and docking procedures. A Yachtmaster qualification is preferred.",location:"52m Sailing Yacht, Caribbean",salary:"$4,000/month",visaRequirement:"B1/B2 Visa",startDate:"ASAP"},{title:"Sous Chef",yacht:"Motor",department:"Galley",vesselSize:"81m–100m",type:"Temporary",description:"Create gourmet meals for guests and crew, handle menu planning and provisioning, and maintain high culinary standards.",location:"81m Motor Yacht",salary:"DOE but competitive",startDate:"March"}];function m(){const i=e.value.toLowerCase(),a=n.value,c=t.value,p=s.value,u=r.value,f=l.filter(d=>{const g=i===""||d.title.toLowerCase().includes(i)||d.description.toLowerCase().includes(i),h=a===""||d.type===a,v=c===""||d.yacht===c,E=p===""||d.department===p,b=u===""||d.vesselSize===u;return g&&h&&v&&E&&b});y(f)}function y(i){if(o.innerHTML="",i.length===0){o.innerHTML="<p>No jobs found.</p>";return}i.forEach(a=>{const c=document.createElement("div");c.classList.add("job"),c.innerHTML=`
                <div>
                    <h3>${a.title} (${a.location})</h3>
                    <p><strong>Type:</strong> ${a.type}</p>
                    <p><strong>Yacht:</strong> ${a.yacht}</p>
                    <p><strong>Department:</strong> ${a.department}</p>
                    <p><strong>Vessel Size:</strong> ${a.vesselSize}</p>
                    <p><strong>Description:</strong> ${a.description}</p>
                    <p><strong>Salary:</strong> ${a.salary}</p>
                    ${a.visaRequirement?`<p><strong>Visa Requirement:</strong> ${a.visaRequirement}</p>`:""}
                    <p><strong>Start Date:</strong> ${a.startDate}</p>
                </div>
                <a href="#contacts" class="apply-btn">Apply</a>
            `,c.querySelector(".apply-btn").addEventListener("click",u=>{u.preventDefault(),document.getElementById("contacts").scrollIntoView({behavior:"smooth"})}),o.appendChild(c)})}[n,t,s,r].forEach(i=>{i.addEventListener("click",()=>{Array.from(i.options).forEach(a=>{a.disabled=!1}),i.options[0].disabled=!0})}),y(l),document.querySelector(".search-bar button").addEventListener("click",m),[n,t,s,r].forEach(i=>{i.addEventListener("change",m)}),e.addEventListener("input",m)});document.getElementById("cv").addEventListener("change",function(){const n=document.getElementById("cv"),t=n.files,s=document.getElementById("fileNameDisplay");if(t.length>1){alert("You can only upload one file."),n.value="",s.textContent="No file selected";return}t.length===1?(s.textContent=`Selected file: ${t[0].name}`,s.style.color="#28a745"):(s.textContent="No file selected.",s.style.color="#dc3545")});document.getElementById("applyForm").addEventListener("submit",function(n){n.preventDefault();const t=document.getElementById("jobName").value.trim(),s=document.getElementById("firstName").value.trim(),r=document.getElementById("lastName").value.trim(),e=document.getElementById("email").value.trim(),o=document.getElementById("cv").files[0];if(!t||!s||!r||!e||!o){alert("Please fill out all fields.");return}if(!S(e)){alert("Please enter a valid email address.");return}if(!L(o)){alert("Only PDF, DOC, or DOCX files are allowed.");return}x()});function S(n){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(n)}function L(n){const t=["pdf","doc","docx"],s=n.name.split(".").pop().toLowerCase();return t.includes(s)}function x(){const n=document.createElement("div");n.id="successModal",n.innerHTML=`
        <div class="modal-content">
            <h2>Application Submitted</h2>
            <p>Your application has been successfully submitted! We will contact you soon.</p>
            <button id="closeModalButton">Close</button>
        </div>
    `,document.body.appendChild(n);const t=document.createElement("style");t.textContent=`
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
    `,document.head.appendChild(t),document.getElementById("closeModalButton").addEventListener("click",function(){document.body.removeChild(n)})}
//# sourceMappingURL=index.js.map
