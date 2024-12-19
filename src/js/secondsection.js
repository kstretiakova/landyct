document.addEventListener("DOMContentLoaded", () => {
    const jobTypeSelect = document.getElementById("jobType");
    const yachtTypeSelect = document.getElementById("yachtType");
    const positionSelect = document.getElementById("position");
    const vesselSizeSelect = document.getElementById("vesselSize");
    const keywordInput = document.getElementById("keyword");
    const jobList = document.getElementById("jobList");

    const jobs = [
        {
            title: "Service Stewardess",
            type: "Permanent",
            yacht: "Motor",
            position: "Interior",
            vesselSize: "31m-50m",
            description: "Deliver high-end service aboard a luxurious motor yacht."
        },
        {
            title: "Deckhand",
            type: "Seasonal",
            yacht: "Sailing",
            position: "Deck",
            vesselSize: "51m-80m",
            description: "Assist with sailing and maintenance tasks on a sailing yacht."
        },
        {
            title: "Chef",
            type: "Temporary",
            yacht: "Motor",
            position: "Galley",
            vesselSize: "81m-100m",
            description: "Prepare gourmet meals for guests aboard a motor yacht."
        },
        {
            title: "Engineer",
            type: "Permanent",
            yacht: "Motor",
            position: "Engineering",
            vesselSize: "101m+",
            description: "Maintain and repair engine systems on a luxury yacht."
        }
    ];

    function filterJobs() {
        const keyword = keywordInput.value.toLowerCase();
        const jobType = jobTypeSelect.value;
        const yachtType = yachtTypeSelect.value;
        const position = positionSelect.value;
        const vesselSize = vesselSizeSelect.value;

        const filteredJobs = jobs.filter(job => {
            const matchesKeyword = keyword === "" || job.title.toLowerCase().includes(keyword) || job.description.toLowerCase().includes(keyword);
            const matchesJobType = jobType === "" || job.type === jobType;
            const matchesYachtType = yachtType === "" || job.yacht === yachtType;
            const matchesPosition = position === "" || job.position === position;
            const matchesVesselSize = vesselSize === "" || job.vesselSize === vesselSize;

            return matchesKeyword && matchesJobType && matchesYachtType && matchesPosition && matchesVesselSize;
        });

        displayJobs(filteredJobs);
    }

    function displayJobs(jobs) {
        jobList.innerHTML = "";
        if (jobs.length === 0) {
            jobList.innerHTML = "<p>No jobs found.</p>";
            return;
        }

        jobs.forEach(job => {
            const jobDiv = document.createElement("div");
            jobDiv.classList.add("job");
            jobDiv.innerHTML = `
                <div>
                    <h3>${job.title}</h3>
                    <p><strong>Type:</strong> ${job.type}</p>
                    <p><strong>Yacht:</strong> ${job.yacht}</p>
                    <p><strong>Position:</strong> ${job.position}</p>
                    <p><strong>Vessel Size:</strong> ${job.vesselSize}</p>
                    <p>${job.description}</p>
                </div>
                <a href="#contacts" class="apply-btn">Apply</a>
            `;

            // Attach the Apply button functionality
            const applyButton = jobDiv.querySelector(".apply-btn");
            applyButton.addEventListener("click", (event) => {
                event.preventDefault();  // Prevent default anchor behavior
                const contactsSection = document.getElementById("contacts");
                contactsSection.scrollIntoView({
                    behavior: 'smooth'
                });
            });

            jobList.appendChild(jobDiv);
        });
    }

    // Enable options and make headings inactive only when dropdown is open
    [jobTypeSelect, yachtTypeSelect, positionSelect, vesselSizeSelect].forEach(select => {
        select.addEventListener("click", () => {
            Array.from(select.options).forEach(option => {
                option.disabled = false;
            });
            select.options[0].disabled = true; // Disable the heading option
        });
    });

    // Initial display of all jobs
    displayJobs(jobs);

    // Attach filter function to the search button
    document.querySelector(".search-bar button").addEventListener("click", filterJobs);

    // Attach filter function to dropdowns
    [jobTypeSelect, yachtTypeSelect, positionSelect, vesselSizeSelect].forEach(select => {
        select.addEventListener("change", filterJobs);
    });

    // Attach filter function to keyword input
    keywordInput.addEventListener("input", filterJobs);
});
