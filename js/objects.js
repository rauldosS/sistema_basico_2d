document.addEventListener("DOMContentLoaded", function(event) {
    console.log("DOM completamente carregado e analisado")

    loadData()
    formatJsonInput()
})

const graph = document.getElementById('graph')

graph.onclick = function clickEvent(e) {
    // e = Mouse click event.
    const rect = e.target.getBoundingClientRect()
    const x = e.clientX - rect.left //x position within the element.
    const y = e.clientY - rect.top  //y position within the element.

    const coordinate_x = parseInt(x - (e.target.offsetWidth / 2))
    const coordinate_y = parseInt((y - (e.target.offsetHeight / 2)) * -1)

    document.querySelector('form input[id="x"]').value = coordinate_x
    document.querySelector('form input[id="y"]').value = coordinate_y

    showCoords.innerHTML = `<b>x:</b> ${coordinate_x}, <b>y:</b> ${coordinate_y}`
}

IdentifierAlreadyExists = (content_id) => {
    const content = document.querySelector(`#${ content_id }`)
    const counter = content.children.length

    let id = `object${ counter }`

    if (document.querySelector(`#${ content_id } input#${ id }`)) {
        id = newIdentifier(content_id, counter)

        return id
    } else
        return id
}

newIdentifier = (content_id, counter) => {
    const id = `object${ counter + 1 }`
    
    if (document.querySelector(`#${ content_id } input#${ id }`)) {
        newIdentifier(content_id, counter + 1)
    } else
        return id
}

document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault()

    const data = {
        'id': IdentifierAlreadyExists('graph'),
        'name': document.querySelector('form input[id="name"]').value,
        'x': parseInt(document.querySelector('form input[id="x"]').value),
        'y': parseInt(document.querySelector('form input[id="y"]').value),
        'width': document.querySelector('form input[id="width"]').value,
        'height': document.querySelector('form input[id="height"]').value,
        'border': document.querySelector('form input[id="border"]').value,
        'type': document.querySelector('form select[id="type"]').value,
        'color': document.querySelector('form select[id="color"]').value,
    }

    addGraphicObject(data)
})

addGraphicObject = (data) => {
    if (data.type == 'pointer')
        addRectangle(data, data.type)
    
    if (data.type == 'rectangle')
        addRectangle(data, data.type)

    const textarea_data = document.querySelector('textarea[id="json_data"]')
    let new_obj = {}

    new_obj = { ...textarea_data.value != '' ? JSON.parse(textarea_data.value) : new_obj, [data.id]: data }

    textarea_data.value = JSON.stringify(new_obj)

    localStorage.setItem(data.id, JSON.stringify(data))

    addListObjects(data)
    addEventObject(data)
    // formatJsonInput()
}

addEventObject = (data) => {
    document.getElementById(data.id).addEventListener('click', (event) => {
        document.querySelectorAll('.object.selected').forEach(object => {
            object.classList.remove('selected')
        })

        event.target.classList.add('selected')
    })
}

// Type objects

addRectangle = (data, type) => {
    const obj = document.createElement('div')

    obj.setAttribute('id', data.id)
    obj.setAttribute('class', 'object')
    obj.setAttribute('coordinate', `(${ data.x }, ${ data.y })`)

    if (type === 'pointer')
        obj.style.borderRadius = '30px'

    obj.style.transform = `translate(${ convertX(data.x, data.width) }px, ${ convertY(data.y, data.height) }px)`
    obj.style.width = `${ data.width }px`
    obj.style.height = `${ data.height }px`
    obj.style.position = 'absolute'
    obj.style.border = '1px solid #ccc'
    obj.style.backgroundColor = data.color

    graph.append(obj)
}

convertX = (x) => {
    return x
}

convertY = (y, height) => {
    return ((graph.offsetHeight / 2) - y) - (height / 2)
}

addListObjects = (data) => {
    document.getElementById('objects').innerHTML += `
        <li id="${ data.id }" class="list-group-item d-flex bd-highlight">
            <div class="me-auto p-2 bd-highlight">${ data.name } (${ data.x }, ${ data.y })</div>
            <a onclick="deleteObject(this, '${ data.id }')" class="p-2 bd-highlight btn btn-danger mr-3 cursor-pointer"><i class="bi bi-trash"></i> Remover</a>
        </li>
    `
}

deleteObject = (el, id) => {
    el.parentNode.remove()
    graph.querySelector(`div[id=${ id }]`).remove()

    localStorage.removeItem(id)
}

loadData = () => {
    const objetos = Object.keys(localStorage).reduce(function(obj, key) {
        obj[key] = localStorage.getItem(key)

        return obj
    }, {})

    for (const [id, valor] of Object.entries(objetos)) {
        addGraphicObject(JSON.parse(valor))
    }
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

translation = () => {
    const selected = document.querySelector('.object.selected')

    if (selected) {
        const dx = document.getElementById('dx').value
        const dy = document.getElementById('dy').value
    
        selected.style.left = `${ parseInt(selected.offsetLeft) + parseInt(dx) }px`;
        selected.style.top = `${ parseInt(selected.offsetTop) + parseInt(dy) }px`;
    } else
        alert('Selecione um objecto para alterar suas propriedades.')
}

rotation = () => {
    const selected = document.querySelector('.object.selected')

    if (selected) {
        const angle = document.getElementById('angle').value

        selected.style.transform = `${ selected.style.transform } rotate(${ angle }deg)`
    } else
        alert('Selecione um objecto para alterar suas propriedades.')
}

scaling = () => {
    const selected = document.querySelector('.object.selected')

    if (selected) {
        const sx = document.getElementById('sx').value
        const sy = document.getElementById('sy').value

        selected.style.left = `${ parseInt(selected.offsetLeft) + parseInt(sx) }px`;
        selected.style.top = `${ parseInt(selected.offsetTop) + parseInt(sy) }px`;

        selected.style.width = `${ parseInt(selected.offsetWidth) + parseInt(sx) }px`;
        selected.style.height = `${ parseInt(selected.offsetHeight) + parseInt(sy) }px`;
    } else
        alert('Selecione um objecto para alterar suas propriedades.')
}