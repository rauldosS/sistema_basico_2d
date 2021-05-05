document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM completamente carregado e analisado")

    carregarDados()
    formatJsonInput()
    createIcons()
});

const canvas = document.getElementById('coordenadas')
const context = canvas.getContext('2d')
//     context.clearRect(0, 0, canvas.width, canvas.height)

// var canvas=document.getElementById('myCanvas');
// var context=canvas.getContext('2d');

// // set the canvas origin (0,0) to center canvas
// // All coordinates to the left of center canvas are negative
// // All coordinates below center canvas are negative
context.translate(canvas.width/2,canvas.height/2)

// context.font = '16px Arial'
// context.lineWidth = 1;
// context.textBaseline = 'middle'
// context.fillStyle = '#000000'
context.strokeStyle='grey'

// canvas.addEventListener('mouseout', function (e) {
//     context.clearRect(0, 0, canvas.width, canvas.height)
// }) - Esse apaga

// canvas.addEventListener('mousemove', function (e) {
//     context.clearRect(0, 0, canvas.width, canvas.height)
//     context.beginPath()
//     context.arc(e.layerX, e.layerY, 3, 0, 2 * Math.PI, false)
//     context.closePath()
//     context.fill()

//     const text = '(' + e.layerX + ', ' + e.layerY + ')'

//     context.fillText(text, e.layerX + 5, e.layerY)
// })

// for (i = 10; i < canvas.offsetHeight; i += 30) {
//     context.moveTo(0, i)
//     context.lineTo(canvas.width, i)
//     context.stroke()
// }

// for (i = 10; i < canvas.offsetWidth; i += 30) {
//     context.moveTo(i, 0)
//     context.lineTo(i, canvas.height)
//     context.stroke()
// }

// Box width
// Padding

const p = 10
const bw = canvas.offsetWidth
const bh = canvas.offsetHeight

for (var x = 0; x <= bw; x += 40) {
  context.moveTo(0.5 + x + p, p)
  context.lineTo(0.5 + x + p, bh + p)
  context.stroke()
}

for (var x = 0; x <= bh; x += 40) {
  context.moveTo(p, 0.5 + x + p)
  context.lineTo(bw + p, 0.5 + x + p)
  context.stroke()
}



document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()

    const dados = {
        'nome': document.getElementById('nome').value,
        'x': document.getElementById('coordenada_x').value,
        'y': document.getElementById('coordenada_y').value,
        'tipo_objeto': document.getElementById("tipo_objeto").value,
    }

    adicionarObjetoCanvas(dados)
})

adicionarObjetoCanvas = (dados) => {
    if (dados.tipo_objeto == 'ponto')
        drawPoint(dados.x, dados.y)
    
    if (dados.tipo_objeto == 'quadrado')
        drawQuadradinho(dados.x, dados.y)

    const textarea_dados = document.querySelector('textarea[id="dados"]')

    textarea_dados.value += `${ textarea_dados.value != '' ? '\n' : '' }${ JSON.stringify(dados) }`

    localStorage.setItem(dados.nome, JSON.stringify(dados))

    adicionarListaObjetos(dados)
}

adicionarListaObjetos = (dados) => {
    document.getElementById('objetos').innerHTML += `
        <li class="list-group-item d-flex bd-highlight">
            <div class="me-auto p-2 bd-highlight">${ dados.nome } (${ dados.x }, ${ dados.y })</div>
            <a class="p-2 bd-highlight btn btn-danger mr-3 cursor-pointer"><i class="bi bi-trash"></i> Remover</a>
            <a class="p-2 bd-highlight btn btn-success cursor-pointer"><i class="bi bi-arrow-clockwise"></i> Rotacionar 90º</a>
        </li>
    `
}

drawPoint = (x, y) => {
    context.save()
    context.fillStyle = '#0000FF'
    context.beginPath()
    context.arc(x, y, 3, 0, 2 * Math.PI, false)
    context.fill()
    context.restore()
}

drawQuadradinho = (x, y) => {
    context.rect(x, y, 20, 20)
    context.fillStyle = 'blue'
    context.fill()
}

carregarDados = () => {
    const objetos = Object.keys(localStorage).reduce(function(obj, key) {
        obj[key] = localStorage.getItem(key)

        return obj
    }, {})

    console.log('Lista de objetos salvos!')

    for (const [id, valor] of Object.entries(objetos)) {
        adicionarObjetoCanvas(JSON.parse(valor))
    }
}

formatJsonString = (json) => {
    return JSON.stringify(json, undefined, 4)
}

formatJsonInput = () => {
    document.querySelectorAll('.json').forEach(json => {
        if (json.value) {
            const str = JSON.stringify(JSON.parse(json.value), undefined, 4)
            
            // display pretty printed object in text area:
            json.value = str
        }
    })
}

createIcons = () => {
    document.querySelectorAll('#cor option').forEach(el => {
        el.innerHTML = `<i class="bi bi-palette-fill"></i>${ el.textContent }`
    })
}