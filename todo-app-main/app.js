const toggler= document.querySelector(".toggler");


toggler.addEventListener("click", darkmodechanger);

function darkmodechanger(){
    document.documentElement.classList.toggle("darkmode");
    toggler.classList.toggle("iconchange");

    console.log("hi")
}