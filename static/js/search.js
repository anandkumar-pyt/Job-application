let searchInput=document.getElementById("search");
let searchForm=document.getElementById("searchForm");
let jobcards=document.querySelectorAll(".job-card")
searchForm.addEventListener("submit",(e)=>{
    e.preventDefault()
})

searchInput.addEventListener("input",function(e){
    
    let SearchText=this.value.toLowerCase().trim();
   jobcards.forEach(function(card){
    let cardText=card.dataset.search;
    if(cardText.includes(SearchText)){
        card.style.display=""
    }
    else{
        card.style.display="none";
    }
   })
});