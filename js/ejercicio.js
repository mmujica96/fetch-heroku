let cargarDatos=()=>{
    fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
        .then(response => response.text())
        .then(data => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(data, "application/xml");
        let escritores= xml.getElementsByTagName("escritor")

        //escritores pasa a ser un html el cual se obtiene los item con el for
        for (let escritor of escritores) {
            let id = escritor.querySelector('id').textContent
            let name = escritor.querySelector('nombre').textContent
            //se crea una etiqueta <option> por cada escritor
            let plantilla =`
                <option value="${id}">${name}</option>
            `
            // se agrega la etiueta <option> dentro de la etiwueta <select>
            document.querySelector('select').innerHTML+= plantilla
            document.querySelector('select').addEventListener('change',(event)=>{
                fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
                    .then(response => response.json())
                    .then(data => {
                        
                    })
                    .catch(console.error);
            } )
        }
        })
        .catch(console.error);
}

window.addEventListener('DOMContentLoaded', (event) => {
    //se llama el callback(una funcion como parametro de otra funcion)
    cargarDatos(); 
});