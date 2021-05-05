const plano_cartesiano = document.getElementById('plano_cartesiano')

plano_cartesiano.onclick = function clickEvent(e) {
    // e = Mouse click event.
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left //x position within the element.
    const y = e.clientY - rect.top  //y position within the element.

    if (x > (e.target.offsetWidth / 2)) {
        // Direita
        console.log('direita', x - (e.target.offsetWidth / 2))
    } else {
        // Esquerda
        console.log('esquerda', x - (e.target.offsetWidth / 2))
    }

    if (y > (e.target.offsetHeight / 2)) {
        // Baixo
        console.log('baixo', (y - e.target.offsetHeight / 2) * -1)
    } else {
        // Cima
        console.log('cima', (y - (e.target.offsetHeight / 2)) * -1)
    }
    
    showCoords.innerHTML = `<b>x:</b> ${ x }, <b>y:</b> ${ y }`
}