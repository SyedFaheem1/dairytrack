fetch("data/animals.json")
  .then((response) => response.json())
  .then((data) => {
    let totalMilk = 0;
    const milkPerLiterPrice = 150;

    data.forEach((animal) => {
      totalMilk += animal.milkPerDay;
    });

    const dailyIncome = totalMilk * milkPerLiterPrice;
    const monthlyMilk = totalMilk * 30;
    const monthlyIncome = dailyIncome * 30;

    // Show daily
    document.getElementById(
      "total-milk"
    ).textContent = `Total Milk: ${totalMilk} liters`;
    document.getElementById(
      "total-income"
    ).textContent = `Estimated Income: ${dailyIncome.toLocaleString()} PKR`;

    // Show monthly
    document.getElementById(
      "monthly-milk"
    ).textContent = `Monthly Milk: ${monthlyMilk} liters`;
    document.getElementById(
      "monthly-income"
    ).textContent = `Monthly Income: ${monthlyIncome.toLocaleString()} PKR`;
    function manualCalculate() {
      const liters = parseFloat(document.getElementById("manualMilk").value);
      if (isNaN(liters)) return alert("Enter a valid number");
      const income = liters * 150;
      document.getElementById(
        "manual-result"
      ).textContent = `Income: ${income.toLocaleString()} PKR`;
    }

    // Simulated weekly data
    const days = [
      "Day 1",
      "Day 2",
      "Day 3",
      "Day 4",
      "Day 5",
      "Day 6",
      "Day 7",
    ];
    const milkData = days.map(() => totalMilk);
    const incomeData = milkData.map((lit) => lit * milkPerLiterPrice);

    // Chart
    const ctx = document.getElementById("milkChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: days,
        datasets: [
          {
            label: "Milk (Liters)",
            data: milkData,
            backgroundColor: "rgba(0, 123, 255, 0.6)",
            borderColor: "rgba(0, 123, 255, 1)",
            borderWidth: 1,
          },
          {
            label: "Income (PKR)",
            data: incomeData,
            backgroundColor: "rgba(40, 167, 69, 0.6)",
            borderColor: "rgba(40, 167, 69, 1)",
            borderWidth: 1,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    // ✅ Cow Profiles (inside the .then block)
    const profileContainer = document.getElementById("cow-profiles");
    data.forEach((cow) => {
      const card = document.createElement("div");
      card.classList.add("cow-card");
      card.innerHTML = `
        <h3>${cow.name}</h3>
        <p>Type: ${cow.type}</p>
        <p>Age: ${cow.age} years</p>
        <p>Milk per day: ${cow.milkPerDay} liters</p>
        <p>Health: ${cow.health}</p>
      `;
      profileContainer.appendChild(card);
    });
  })
  .catch((error) => {
    console.error("Error loading data:", error);
  });

  