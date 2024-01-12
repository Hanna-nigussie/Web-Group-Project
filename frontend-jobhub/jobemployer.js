async function fetchJobs() {
    try {
      const response = await fetch('http://localhost:2001/jobs/forEmployees', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success) {
        displayJobs(data.jobs);
      } else {
        console.error('Error fetching jobs:', data.error);
      }
    } catch (error) {
      console.error('Error fetching jobs:', error.message);
    }
  }

  function displayJobs(jobs) {
    const jobList = document.getElementById('jobList');

    jobs.forEach((job) => {
      const card = document.createElement('div');
      card.classList.add('card');

      const title = document.createElement('h2');
      title.textContent = job.title;

      const description = document.createElement('p');
      description.textContent = job.description;

      const location = document.createElement('p');
      location.textContent = `Location: ${job.location}`;

      card.appendChild(title);
      card.appendChild(description);
      card.appendChild(location);

      jobList.appendChild(card);
    });
  }

  fetchJobs();