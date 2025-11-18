


function out(){
    alert("Your message was sent correctly")
}

    document.addEventListener('scroll', () => {
    const element2 = document.querySelector('.banner');
    const element3 = document.querySelector('.menu');
    const acerca = document.querySelector('.sobre_mi');


    const position2 = element2.getBoundingClientRect();
    const position_acerca = acerca.getBoundingClientRect();



    // Muestra el menu a voluntad
    if (position_acerca.top < 50) {
        element3.classList.add('active');
    }else{
        if (position_acerca.top > 0) {
        element3.classList.remove('active');
    }

    }
});