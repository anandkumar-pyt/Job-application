
fetch("/job-stats")
    .then(response => response.json())
    .then(data => {
        const statuses = [
            ["Applied", "appliedBar"],
            ["Interview", "interviewBar"],
            ["Selected", "selectedBar"],
            ["Rejected", "rejectedBar"]
        ];

        const maxCount = Math.max(1,
            ...statuses.map(item => data[item[0]] || 0)
        );

        statuses.forEach(([status, id]) => {

            const count = data[status] || 0;
            const bar = document.getElementById(id);

            bar.style.height =
                `${(count / maxCount) * 100}%`;

            bar.title = `${status}: ${count} jobs`;
        });

    })
    .catch(error => console.error(error));
