Statuses=document.querySelectorAll(".summary");
jobCards=document.querySelectorAll(".job-card");
Statuses.forEach(Status=>{
    Status.addEventListener("click", async (e)=>{
        heading=Status.querySelector("h3").textContent.trim().toLowerCase();
        const response = await fetch(`/api/jobs?status=${encodeURIComponent(heading)}`);
        try{
            if(!response.ok){
                throw new Error("not any jobs found");
            }
            const jobs= await response.json();
            let summaryDiv=document.querySelector(".summaryTable");
            summaryDiv.innerHTML="";
            jobs.forEach(job=>{
                    if(job.status=="Rejected"){
                       summaryDiv.innerHTML +=`
                    <div style="background-color:red"><h3>${job.company}</h3>
                    <p>${job.role}</p></div>` 
                    }

                    else if(job.status=='Selected'){
                         summaryDiv.innerHTML +=`
                            <div style="background-color:green"><h3>${job.company}</h3>
                            <p>${job.role}</p></div>`
                        }
                    else{
                        summaryDiv.innerHTML +=`
                            <div><h3>${job.company}</h3>
                            <p>${job.role}</p></div>`
                    }
                
            })
        }
        catch(errors){
            console.log("Status Card Problem")
        }
    })
})





