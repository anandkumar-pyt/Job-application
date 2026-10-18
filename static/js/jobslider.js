const sliderContainer = document.querySelector(".slider-container");
const slider=document.querySelector(".sliders");
let intervalId;
document.addEventListener('DOMContentLoaded',()=>{
    fetch("/api/jobs")
    .then(response=>response.json())
    .then(data=>{
        data.forEach(job=>{
            const card=document.createElement("div");
            card.classList.add('card');
            card.innerHTML=`
                <div class="card-body">
                    <h3 class="card-titla">${job.company}</h3>
                    <p class="card-text">${job.role}</p>
                    <p class ="card-text">${job.location}</p>
                    <p class="card-text">${job.status}</p>
                </div>`
                slider.appendChild(card);
        });
        const cards=document.querySelectorAll('.card');
        let cardlength=cards.length;
        let firstClone=cards[0].cloneNode(true);
        let SecondClone=cards[1].cloneNode(true);
        let lastClone=cards[cardlength-1].cloneNode(true);
        slider.appendChild(firstClone);
        slider.appendChild(SecondClone);
        slider.prepend(lastClone);
        slider.style.transition='none';
        slider.style.transform=`translateX(-${(cards[0].offsetWidth)}px)`;
        counter=1;
        intervalId=setInterval(()=>{
            if(counter>cardlength-1){
                slider.style.transition='none';
                counter=0;
            }
            else{
                slider.style.transition='transform 0.4s ease-in-out';
            }
            slider.style.transform=`translateX(-${(cards[0].offsetWidth)*counter}px)`;
            
            counter++;

        },2000)
        slider.addEventListener('transitionend',()=>{
            // const cards=document.querySelectorAll('.card');
            if (counter === cards.length + 1) {
        // First clone reached: jump to original first card
        slider.style.transition = 'none';
        counter = 1;

        slider.style.transform =
            `translateX(-${getCardWidth() * counter}px)`;
    }

        })
        
    })
})