
async function cargarDatos() {
        const escritores = await this.GetEscritores(); 
        //console.log(escritores[0].querySelector('nombre').textContent);
        //escritores pasa a ser un html el cual se obtiene los item con el for
        for (let escritor of escritores) {
            let id = escritor.querySelector('id').textContent
            let name = escritor.querySelector('nombre').textContent
            //se crea una etiqueta <option> por cada escritor
            //Use el texto de la etiqueta <nombre> como valor de la etiqueta <option>
            //Use el texto de la etiqueta <id> como valor del atributo value
            let plantilla =`
                <option value="${id}">${name}</option>
            `
            // se agrega la etiqueta <option> dentro de la etiqueta <select>
            document.querySelector('select').innerHTML+= plantilla;
        }

        const selectElement = document.querySelector('select');
        selectElement.addEventListener('change',(event)=>{
        const result = event.target.value;
            fetch("https://dataserverdaw.herokuapp.com/escritores/frases")
                .then(response => response.json())
                .then(data => {
                    const array = data.frases;
                    document.getElementById('frases').innerHTML='';
                    for(let  frase of array) {
                        let id = frase.id_autor;
                        let texto = frase.texto;
                        let name = '';
                        if(id == result){
                            for (let escritor of escritores) {
                                let idEsc = escritor.querySelector('id').textContent
                                if(idEsc == id) {
                                    name = escritor.querySelector('nombre').textContent
                                }
                            }
                            let plantilla = `
                                <div class="col-lg-3">
                                    <div class="test-inner ">
                                        <div class="test-author-thumb d-flex">
                                            <div class="test-author-info">
                                                <h4>${name}</h4>                                            
                                            </div>
                                        </div>
                                        <span>${texto}</span>
                                        <i class="fa fa-quote-right"></i>
                                    </div>
                                </div>
                                        `
                            document.getElementById('frases').innerHTML+= plantilla;
                        }      
                    }       
                })
                .catch(console.error);
        });
}

async function GetEscritores(){
    return fetch("https://dataserverdaw.herokuapp.com/escritores/xml")
    .then(response => response.text())
    .then(data => {
    const parser = new DOMParser();
    //se procesa la respuesta como un onbjeto xml
    const xml = parser.parseFromString(data, "application/xml");
    let escritores= xml.getElementsByTagName("escritor");
    return escritores;
    })
    .catch(error => {
        console.log(error);
        return [];
    }); 
}


window.addEventListener('DOMContentLoaded', (event) => {
    //se llama el callback(una funcion como parametro de otra funcion)
    cargarDatos(); 
});