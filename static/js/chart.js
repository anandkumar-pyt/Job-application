fetch("/job-stats")
    .then(response => response.json())
    .then(data => {
        const keys = Object.keys(data);
        const values = Object.values(data);
        let counts = 0;
        values.forEach(value =>{
            counts += value;
        })
        // data.forEach((value, index)=>{

        // })
        
        const canvas = document.getElementById("jobChart");

        // Create chart
        new Chart(canvas, {
            type: "bar",

            data: {
                labels: keys,

                datasets: [{
                    label: "Number of Jobs",
                    data: values,
                    backgroundColor: [
                        "#3498db",
                        "#f39c12",
                        "#2ecc71",
                        "#e74c3c"
                    ]
                }]
            },

            options: {
                responsive: true,
                maintainAspectRatio: true,

                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            precision: 0
                        }
                    }
                }
            }
        });
    })
    .catch(error => {
        console.error("Error loading chart:", error);
    });