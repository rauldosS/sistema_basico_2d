function saveTextAsFile(event) {
    event.preventDefault()

    const textToWrite = document.querySelector(`textarea[id=${ event.target.getAttribute('for') }]`).value
    const textFileAsBlob = new Blob([textToWrite], { type: 'text/plain' })
    const fileNameToSaveAs = `dados.${ event.target.getAttribute('type') }`

    const downloadLink = document.createElement("a")

    downloadLink.download = fileNameToSaveAs
    downloadLink.innerHTML = "Download File"

    if (window.webkitURL != null) {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob)
    } else {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob)
        downloadLink.onclick = destroyClickedElement
        downloadLink.style.display = "none"
        document.body.appendChild(downloadLink)
    }

    downloadLink.click()
}

const button = document.getElementById('export')

button.addEventListener('click', saveTextAsFile)