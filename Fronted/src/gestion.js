

const btn_Agregar=document.querySelector('#btn-guardar')
const portada=document.querySelector('#portada');
const labelportada=document.querySelector('#labelportada');
const checkNcomercial=document.querySelector('#nComercialEC');
const checkComercial=document.querySelector('#ComercialEC');
const checkDigital=document.querySelector('#digitalEC');
const file=document.querySelector('#portada');
let id=0;


//-------------------Personal------------------------------------------------------------------------
const form= document.getElementById('form_AgregarGestor')
    form.addEventListener("submit",(event)=>{
        event.preventDefault();
        const userdata={
            nombre:event.target.elements.nombre.value,
            password:event.target.elements.password.value
        }
        const userdataJson=JSON.stringify(userdata);
        fetch("http://localhost:3000/users",{
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: userdataJson,
        }).then((result=>{
            refreshUsers();
        }));
    })
async function refreshUsers(){
    const users=await obtenerData()
    personal=users
}
async function obtenerData(){
    const response= await fetch('http://localhost:3000/users');
    const users=await response.json();
    return users
}
//-----------------------------------------------------------------------------------------------
//----------------Enriquecer Catalogo/POST-PUT--------------------------------------------------------------
const btonSubmit=document.getElementById('btn-guardarEC')
btonSubmit.addEventListener("click",(event)=>{
    event.preventDefault();
    const estado=btonSubmit.innerText;
    let metodo="POST"
    if(estado==='Editar'){
        metodo="PUT";
    }
    if((checkNcomercial.checked==true)&&(checkComercial.checked==false)&&(checkDigital.checked==false)){
        let userdata={
            imagen: $('#portada').val(),
            titulo: $('#tituloEC').val(),
            autor: $('#autorEC').val(),
            municipio: $('#municipioEC').val(),
            genero: $('#generoEC').val(),
        };
        console.log('esta entrando')
        if(metodo==="PUT"){
            userdata={
                imagen: $('#portada').val(),
                titulo: $('#tituloEC').val(),
                autor: $('#autorEC').val(),
                municipio: $('#municipioEC').val(),
                genero: $('#generoEC').val(),
                idnocomercial:id,
            };
            checkComercial.checked=false;
            checkDigital.checked=false;
            checkNcomercial.checked=true;
        }
        const userdataJson=JSON.stringify(userdata);
        fetch("http://localhost:3000/librosnc",{
            method: `${metodo}`,
            headers: {
            "Content-Type": "application/json",
            },
            body: userdataJson,
        })
        $('#Modal4').modal('hide');
        if(metodo==='POST'){
            restaurarEnriquecer();
        }
    }
    if((checkNcomercial.checked==false)&&(checkComercial.checked==false)&&(checkDigital.checked==true)){
        let userdata={
            imagen: $('#portada').val(),
            titulo: $('#tituloEC').val(),
            autor: $('#autorEC').val(),
            municipio: $('#municipioEC').val(),
            genero: $('#generoEC').val(),
            formato: $('#formatoEC').val(),
        };
        if(metodo==="PUT"){
            userdata={
                imagen: $('#portada').val(),
                titulo: $('#tituloEC').val(),
                autor: $('#autorEC').val(),
                municipio: $('#municipioEC').val(),
                genero: $('#generoEC').val(),
                formato: $('#formatoEC').val(),
                iddigital: id,
            };
            checkComercial.checked=false;
            checkDigital.checked=true;
            checkNcomercial.checked=false;
        }
        const userdataJson=JSON.stringify(userdata);
        fetch("http://localhost:3000/librosd",{
            method: `${metodo}`,
            headers: {
            "Content-Type": "application/json",
            },
            body: userdataJson,
        })
        $('#Modal4').modal('hide');
        if(metodo==='POST'){
            restaurarEnriquecer();
        }
    }
    if((checkNcomercial.checked==false)&&(checkComercial.checked==true)&&(checkDigital.checked==false)){
        let userdata={
            imagen: $('#portada').val(),
            titulo: $('#tituloEC').val(),
            autor: $('#autorEC').val(),
            municipio: $('#municipioEC').val(),
            genero: $('#generoEC').val(),
            preciocup: ($('#montocup').val()=='')?'-':$('#montocup').val(),
            preciomlc: ($('#montomlc').val()=='')?'-':$('#montomlc').val(),
        };
        let userdataJson=JSON.stringify(userdata);
        if(metodo==="PUT"){
            userdata={
                imagen: $('#portada').val(),
                titulo: $('#tituloEC').val(),
                autor: $('#autorEC').val(),
                municipio: $('#municipioEC').val(),
                genero: $('#generoEC').val(),
                preciocup: ($('#montocup').val()=='')?'-':$('#montocup').val(),
                preciomlc: ($('#montomlc').val()=='')?'-':$('#montomlc').val(),
                idcomercial:id,
            };
            checkComercial.checked=true;
            checkDigital.checked=false;
            checkNcomercial.checked=false;
            userdataJson=JSON.stringify(userdata);
        }
        fetch("http://localhost:3000/librosc",{
            method: `${metodo}`,
            headers: {
            "Content-Type": "application/json",
            },
            body: userdataJson,
        })
        $('#Modal4').modal('hide');
        if(metodo==='POST'){
            restaurarEnriquecer();
        }
    }
})
function restaurarEnriquecer(){
    $('#portada').val('');
    $('#tituloEC').val('');
    $('#autorEC').val('');
    $('#municipioEC').val('');
    $('#generoEC').val('');
    $('#montocup').val('');
    $('#montomlc').val('');
    btonSubmit.innerText='Agregar';
    checkComercial.checked=false;
    checkDigital.checked=false;
    checkNcomercial.checked=false;
}
//-------------------------------------------------------------------------------
//--------------------Dibujar Tablas Editar--------------------------------------------
const tablaHead=document.getElementById('tablaHead');
const tabla=document.getElementById('tabla');
const tablaBody=document.getElementById('tablaBody');
const btnComerciales=document.getElementById('Comerciales');
const btnNoComerciales=document.getElementById('NoComerciales');
const btnDigitales=document.getElementById('Digitales');
let comerciales=[];
let nocomerciales=[];
let digitales=[];
refreshComerciales();
refreshNoComerciales();
refreshDigitales();
async function refreshComerciales(){
    const libros=await getComerciales()
    comerciales=libros
}
async function getComerciales(){
    const response= await fetch('http://localhost:3000/librosc');
    const comerciales=await response.json();
    return comerciales
}
async function refreshNoComerciales(){
    const libros=await getNoComerciales()
    nocomerciales=libros
}
async function getNoComerciales(){
    const response= await fetch('http://localhost:3000/librosnc');
    const nocomerciales=await response.json();
    return nocomerciales
}
async function refreshDigitales(){
    const libros=await getDigitales()
    digitales=libros
}
async function getDigitales(){
    const response= await fetch('http://localhost:3000/librosd');
    const digitales=await response.json();
    return digitales
}
btnComerciales.addEventListener('click',(event)=>{
    event.preventDefault();
    limpiarTabla();
    const head=`
    <tr>
        <th scope="col">Titulo</th>
        <th scope="col">Autor</th>
        <th scope="col">Municipio</th>
        <th scope="col">Genero</th>
        <th scope="col">CUP</th>
        <th scope="col">MLC</th>
        <th scope="col"></th>
    </tr>`
    tablaHead.innerHTML=head;
    comerciales.map((libro,index)=>{
        const newRow = tabla.insertRow();
        const titulo = newRow.insertCell(0);
        const autor = newRow.insertCell(1);
        const municipio = newRow.insertCell(2);
        const genero = newRow.insertCell(3);
        const cup = newRow.insertCell(4);
        const mlc = newRow.insertCell(5);
        const opt = newRow.insertCell(6);
        titulo.innerHTML=libro.titulo;
        autor.innerHTML=libro.autor;
        municipio.innerHTML=libro.municipio;
        genero.innerHTML=libro.genero
        cup.innerHTML=libro.preciocup;
        mlc.innerHTML=libro.preciomlc;
        opt.innerHTML=`
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#Modal4"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>`;
    })
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index)=>botonEditar.onclick=editarC(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminarc(index));
})
btnNoComerciales.addEventListener('click',(event)=>{
    event.preventDefault();
    limpiarTabla();
    const head=`
    <tr>
        <th scope="col">Titulo</th>
        <th scope="col">Autor</th>
        <th scope="col">Municipio</th>
        <th scope="col">Genero</th>
        <th scope="col"></th>
    </tr>`
    tablaHead.innerHTML=head;
    nocomerciales.map((libro,index)=>{
        const newRow = tabla.insertRow();
        const titulo = newRow.insertCell(0);
        const autor = newRow.insertCell(1);
        const municipio = newRow.insertCell(2);
        const genero = newRow.insertCell(3);
        const opt = newRow.insertCell(4);
        titulo.innerHTML=libro.titulo;
        autor.innerHTML=libro.autor;
        municipio.innerHTML=libro.municipio;
        genero.innerHTML=libro.genero
        opt.innerHTML=`
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#Modal4"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>`;
    })
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index)=>botonEditar.onclick=editarNC(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminarnc(index));
})
btnDigitales.addEventListener('click',(event)=>{
    event.preventDefault();
    limpiarTabla();
    const head=`
    <tr>
        <th scope="col">Titulo</th>
        <th scope="col">Autor</th>
        <th scope="col">Municipio</th>
        <th scope="col">Genero</th>
        <th scope="col">Formato</th>
        <th scope="col"></th>
    </tr>`
    tablaHead.innerHTML=head;
    digitales.map((libro,index)=>{
        const newRow = tabla.insertRow();
        const titulo = newRow.insertCell(0);
        const autor = newRow.insertCell(1);
        const municipio = newRow.insertCell(2);
        const genero = newRow.insertCell(3);
        const formato = newRow.insertCell(4);
        const opt = newRow.insertCell(5);
        titulo.innerHTML=libro.titulo;
        autor.innerHTML=libro.autor;
        municipio.innerHTML=libro.municipio;
        genero.innerHTML=libro.genero;
        formato.innerHTML=libro.formato;
        opt.innerHTML=`
        <div class="btn-group" role="group" aria-label="Basic example">
            <button type="button" class="btn btn-info editar" data-toggle="modal" data-target="#Modal4"><i class="fa fa-pencil-square-o" aria-hidden="true"></i></button>
            <button type="button" class="btn btn-danger eliminar"><i class="fa fa-trash-o" aria-hidden="true"></i></button>
        </div>`;
    })
    Array.from(document.getElementsByClassName('editar')).forEach((botonEditar,index)=>botonEditar.onclick=editarD(index));
    Array.from(document.getElementsByClassName('eliminar')).forEach((botonEliminar,index)=>botonEliminar.onclick=eliminard(index));
})
//----------------------------Metodos Editar/Eliminar/LimpiarTabla----------------------------------------------
function editarC(index){
    return function handler() {
        btonSubmit.innerText = 'Editar';
    $('#Modal6').modal('hide');
        const libro = comerciales[index];
        console.log(libro)
        $('#portadaEC').val(libro.imagen);
        $('#tituloEC').val(libro.titulo);
        $('#autorEC').val(libro.autor);
        $('#municipioEC').val(libro.municipio);
        $('#generoEC').val(libro.genero);
        $('#montocup').val(libro.preciocup);
        $('#montomlc').val(libro.preciomlc);
        id=libro.idcomercial;
        checkNcomercial.checked=false;
        checkComercial.checked=false;
        checkDigital.checked=false
    }
}
function editarNC(index){
    return function handler() {
        btonSubmit.innerText = 'Editar';
    $('#Modal6').modal('hide');
        const libro = nocomerciales[index];
        console.log(libro)
        $('#portadaEC').val(libro.imagen);
        $('#tituloEC').val(libro.titulo);
        $('#autorEC').val(libro.autor);
        $('#municipioEC').val(libro.municipio);
        $('#generoEC').val(libro.genero);
        id=libro.idnocomerciales;
        checkComercial.checked=false;
        checkNcomercial.checked=false;
        checkDigital.checked=false
    }}
    function editarD(index){
        return function handler() {
            btonSubmit.innerText = 'Editar';
        $('#Modal6').modal('hide');
    
        const libro = digitales[index];
        console.log(libro)
        $('#portadaEC').val(libro.imagen);
        $('#tituloEC').val(libro.titulo);
        $('#autorEC').val(libro.autor);
        $('#municipioEC').val(libro.municipio);
        $('#generoEC').val(libro.genero);
        $('#formatoEC').val(libro.formato)
        id=libro.iddigitales;
        checkNcomercial.checked=false;
        checkComercial.checked=false
    }
    }
function eliminarc(index){
    return async function eliminando(){
        try {
            if (checkComercial.checked=true){
            const userdata=comerciales[index];
            const userdataJson=JSON.stringify(userdata)
            const respuesta=await fetch(`http://localhost:3000/librosc/`,{
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
                body: userdataJson,
            });
            comerciales.splice(index,1)
            if(respuesta.ok){
                btnComerciales.click();
            }
        }}catch(error){
            trow(error)
        }}}
        function eliminarnc(index){
            return async function eliminando(){
                try {
        if (checkNcomercial.checked=true){
            const userdata=nocomerciales[index];
            const userdataJson=JSON.stringify(userdata)
            const respuesta=await fetch(`http://localhost:3000/librosnc/`,{
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
                body: userdataJson,
            });
            nocomerciales.splice(index,1)
            if(respuesta.ok){
                btnNoComerciales.click();
            }
        }}catch(error){
            trow(error)
        }}}
        function eliminard(index){
            return async function eliminando(){
                try {
            const userdata=digitales[index];
            const userdataJson=JSON.stringify(userdata)
            const respuesta=await fetch(`http://localhost:3000/librosd/`,{
                method: "DELETE",
                headers: {
                "Content-Type": "application/json",
                },
                body: userdataJson,
            });
            digitales.splice(index,1)
            if(respuesta.ok){
                btnDigitales.click();
            }
        
        } catch (error) {
            console.log({error});
            $(".alert").show();
        }
        
    }
    }
function limpiarTabla(){
    tablaBody.innerHTML='';
}