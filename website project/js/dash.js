    document.addEventListener("DOMContentLoaded", () => {
    const totalContent = Math.floor(Math.random() * 50) + 10;
    const bookmarked = Math.floor(Math.random() * 15);
    const profilePercent = Math.floor(Math.random() * 100);
    const activeUsers = Math.floor(Math.random() * 30) + 5;

    document.getElementById("totalContent").textContent = totalContent;
    document.getElementById("bookmarkedContent").textContent = bookmarked;
    document.getElementById("activeUsers").textContent = activeUsers;
    document.getElementById("profileCompletion").style.width = profilePercent + "%";

    const activities = [
      "Viewed CSS Flexbox Guide",
      "Completed JS Carousel Tutorial",
      "Updated Profile Picture",
      "Bookmarked 'Data Scientist Roadmap'",
      "Took IT Career Quiz"
    ];

    const table = document.getElementById("activityTable");
    activities.forEach(act => {
      const row = document.createElement("tr");
      const td1 = document.createElement("td");
      td1.textContent = act;
      const td2 = document.createElement("td");
      const date = new Date();
      td2.textContent = date.toLocaleDateString();
      row.appendChild(td1);
      row.appendChild(td2);
      table.appendChild(row);
    });
  });