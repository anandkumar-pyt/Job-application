document.addEventListener("DOMContentLoaded",()=>{
    fetch("/job-stats").
    then(response => response.json()).
    then(data=>{
        // const table = document.querySelector(".job-status-container");
        const tablebody = document.querySelector("#jobs-status");
        const keys =Object.keys(data)
        // console.log(keys)
        keys.forEach(key=>{
            tablebody.innerHTML+=`
            <tr>
            <td>${key}</td>
            <td>${data[key]}</td>
            </tr>
            `
        })
    });
})