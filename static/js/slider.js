// leftButton.addEventListener("click", () => {
//      sliderContainer.scrollBy({
//         left:400,
//         behavior:"smooth"
//      })
// });
// Rightbutton.addEventListener("click", () => {
//      sliderContainer.scrollBy({
//         left:-280,
//         behavior:"smooth"
//      })
// });


let leftButton=document.querySelector(".left-button");
let Rightbutton=document.querySelector(".right-button");
let sliderContainer=document.querySelector(".row")
let counter=1
let pointer=null
let intervalId=null

document.addEventListener('DOMContentLoaded',()=>{
    fetch("/").then(response=>{
        // console.log(response)
        return response.json()
    }).then(data=>{
        data.forEach(job=>{
            const card=document.createElement("div")
            card.classList.add("slider")
            card.innerHTML=`
                <div class="card-body">
                    <h5 class="card-title">${job.company}</h5>
                    <p class="card-text">${job.role}</p>
                </div>
            `
            // const cardCopy=card.cloneNode(true)
            sliderContainer.appendChild(card)
            // sliderContainer.appendChild(cardCopy)
        });
        let sliders=document.querySelectorAll(".slider")
        lastClone=sliders[sliders.length-1].cloneNode(true)
        firstClone=sliders[0].cloneNode(true)
        sliderContainer.prepend(lastClone)
        sliderContainer.appendChild(firstClone);
        function slide(counter){
            sliders.forEach(slider=>{
                slider.style.transform=`translateX(-${counter*100}%)`
            })
        }
        intervalId=setInterval(()=>{
            if(counter<sliders.length-1){
                counter++
                slide(counter)
            }
            else{
                counter=0
                slide(counter)
            }
        },3000)
        leftButton.addEventListener("click", () => {
            if(counter<sliders.length-1){
            counter++
            slide(counter)
            }
            else{
                counter=0
                slide(counter)
            }
            
        })
         Rightbutton.addEventListener("click", () => {
            if(counter>0){
            counter--
            slide(counter)
            }
            else{
                counter=sliders.length-1
                slide(counter)
            }
            
        })
         
    }).catch(exception=>{
        console.log(exception)
    })
})