const body = document.body;
let tiempo_inicial = null;
let posicion_inicial;
let posicion_final;
let duracion = 1000;
let no_hash;
body.addEventListener('click', e => {
    const link = e.target.closest('.trigger');
    if (link) {
        e.preventDefault();
        const hash = link.hash;
        no_hash = hash.substring(1);
        const link_target = body.querySelector(hash);
        posicion_final = link_target.getBoundingClientRect().top;
        posicion_inicial = window.pageYOffset;
        requestAnimationFrame(show);
    }
});
function show(tiempo_actual) {
    if (tiempo_inicial === null)
        tiempo_inicial = tiempo_actual;
    const transcurrido = tiempo_actual - tiempo_inicial;
    const run = ease(transcurrido, posicion_inicial, posicion_final, duracion);
    // console.log(run);
    if (transcurrido < duracion) {
        window.scrollTo(0, run);
        requestAnimationFrame(show);
    }
    else {
        tiempo_inicial = null;
        window.location.hash = no_hash;
    }
}
function ease(t, b, c, d) {
    t /= d;
    return t < 0.5 ? c * (4 * t * t * t) + b : c * (1 - Math.pow(-2 * t + 2, 3) / 2) + b;
    // return c*(Math.pow(2*t-1,3)+Math.pow(t-1,2))+b;
}
