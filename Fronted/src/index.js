const contrasena = document.querySelector('#password');
const nombre = document.querySelector('#nombre');
const btnAutenticar = document.querySelector('#btn-guardar');
const btnBuscarLC=document.querySelector('#btn-guardarLC');
const titulo=document.querySelector('#titulo');
const autor=document.querySelector('#autor');
const genero=document.querySelector('#genero');
const municipio=document.querySelector('#municipio');
const btn_buscarNC=document.querySelector('#btn-guardarNC');
const bodyModalNC=document.querySelector('#bodyModalNC');
const checkBoxCup=document.querySelector('#cup');
const checkBoxMlc=document.querySelector('#mlc');
const montocup=document.querySelector('#montocup');
const montomlc=document.querySelector('#montomlc');
const format=document.querySelector('#formato');
const btnBuscarLDigital=document.querySelector('#btn-buscarlDigital');




const urlLibrosNC='http://localhost:3000/librosnc';
const urlLibrosC='http://localhost:3000/librosc';
const urlLibrosD='http://localhost:3000/librosd';
const urlUsers='http://localhost:3000/users';
let l_Comerciales=[];
let l_Digitales=[];
let l_No_Comerciales=[];
let personal=[];
//----------------------------------Autenticar personal-------------------------------------------
async function autenticar(){
    const response=await fetch(urlUsers)
    personal = await response.json()
    personal.forEach((persona)=>{
        if(nombre.value!=persona.nombre){
            return;
        }else{
        ((contrasena.value===persona.password)&&(nombre.value===persona.nombre))?window.open('http://127.0.0.1:5500/Fronted/gestion.html','_self')
        :((contrasena.value===persona.password)&&(nombre.value!=persona.nombre))?window.alert('Nombre no valido')
        :((contrasena.value!=persona.password)&&(nombre.value===persona.nombre))?window.alert('Password incorrecta')
        :window.alert('Nombre y password incorrecta');
        }
    })
}
//--------------------------------------Buscar Comercial-----------------------------------------------
async function buscarLibroComercial(){
    let datos={
        tituloC:$('#tituloC').val(),
        autorC:$('#autorC').val(),
    }
        
    if(validarDatos(datos)){
        try{
            const respuesta=await fetch(urlLibrosC);
            const librosCServer=await respuesta.json();
            if(Array.isArray(librosCServer)){
                l_Comerciales=librosCServer
            }
            let pagoCup=Number(montocup.value);
            let pagoMlc=Number(montomlc.value);
            let libroAencontrar=undefined;
            if(checkBoxCup.checked==true){
                console.log('ta entrando a cup');
                console.log(pagoCup);
                libroAencontrar=l_Comerciales.find((libro)=>{
                return((libro.titulo===$('#tituloC').val())&&((libro.autor===$('#autorC').val())||($('#autorC').val()==''))&&((libro.genero===$('#generoC').val())||($('#generoC').val()==''))&&((libro.municipio===$('#municipioC').val())||($('#municipioC').val()==''))&&(parseInt(libro.preciocup)<=pagoCup));
            });}
            if(checkBoxMlc.checked==true){
                libroAencontrar=l_Comerciales.find((libro)=>{
                return((libro.titulo===$('#tituloC').val())&&((libro.autor===$('#autorC').val())||($('#autorC').val()==''))&&((libro.genero===$('#generoC').val())||($('#generoC').val()==''))&&((libro.municipio===$('#municipioC').val())||($('#municipioC').val()==''))&&(parseInt(libro.preciomlc)<=pagoMlc));
                });
            }; 
            if(libroAencontrar!=undefined){ 
                const htmlModal=
                    `
                    <div class="col-6">
                    <img width="100%" height="100%" src="${libroAencontrar.imagen}" alt="Imagen de la portada del libro">
                    <h5>Precio CUP: ${parseInt(libroAencontrar.preciocup)}<h5>
                    <h5>Precio MLC: ${parseInt(libroAencontrar.preciomlc)}<h5>
                    </div>
                    <div class="col-6">
                    <h1 class="modaltexto"><strong>Titulo:<strong></h1>
                    <h3 >${libroAencontrar.titulo.toUpperCase()}</h3>
                    <h1 class="modaltexto"><strong>Autor:<strong></h1>
                    <h3 >${libroAencontrar.autor.toUpperCase()}</h3>
                    </div>`;
                bodyModalNC.innerHTML=htmlModal;
                $('#ModalNComercial').modal('show');
                resetModal();
                return;
            }else{
                window.alert('no se encuentra el libro en el listado');
                resetModal();
                return;
            }
        }catch (error){
            console.log({error})
        }
    }else{
        btnBuscarLC.dataset.dismiss=null;
    }
}
//--------------------------------------Buscar No Comercial----------------------------------------------------
async function buscarNComercial(){
    try{
        const respuesta=await fetch(urlLibrosNC);
        const librosNCServer=await respuesta.json();
        if(Array.isArray(librosNCServer)){
            l_No_Comerciales=librosNCServer
        }
        const libroAencontrar=l_No_Comerciales.find((libro)=>{
            return((libro.titulo===$('#tituloNC').val())&&((libro.autor===$('#autorNC').val())||($('#autorNC').val()==''))&&((libro.municipio===$('#municipioNC').val())||($('#municipioNC').val()==''))&&((libro.genero===$('#generoNC').val())||($('#generoNC').val()=='')));
        }) 
        let datos={
            tituloNC:$('#tituloNC').val(),
            autorNC:$('#autorNC').val(),
        }
        if(validarDatos(datos)){
            if(libroAencontrar!=undefined){ 
                const htmlModal=
                    `
                    <div class="col-6">
                    <img width="100%" height="100%" src="${libroAencontrar.imagen}" alt="Imagen de la portada del libro">
                    </div>
                    <div class="col-6">
                    <h1 class="modaltexto"><strong>Titulo:<strong></h1>
                    <h3 >${libroAencontrar.titulo.toUpperCase()}</h3>
                    <h1 class="modaltexto"><strong>Autor:<strong></h1>
                    <h3 >${libroAencontrar.autor.toUpperCase()}</h3>
                    </div>`;
                bodyModalNC.innerHTML=htmlModal;
                $('#ModalNComercial').modal('show');
                resetModal();
                return;
            }else{
                window.alert('no se encuentra el libro en el listado');
                resetModal();
                return;
            }
        }else{
            btn_buscarNC.dataset.dismiss=null;
        }
    }catch (error){
        console.log({error});
    }
}
//--------------------------------------Buscar Digital---------------------------------------------------------
async function buscarLibroDigital(){
    try{
        const respuesta=await fetch(urlLibrosD);
        const librosDServer=await respuesta.json();
        if(Array.isArray(librosDServer)){
            l_Digitales=librosDServer
        }
        const libroAencontrar=l_Digitales.find((libro)=>{
            return((libro.titulo===$('#tituloD').val())&&(libro.formato===format.value)&&((libro.autor===$('#autorD').val())||($('#autorD').val()==''))&&((libro.municipio===$('#municipioD').val())||($('#municipioD').val()==''))&&((libro.genero===$('#generoD').val())||($('#generoD').val()=='')));
        }) 
        let datos={
            tituloD:$('#tituloD').val(),
            autorD:$('#autorD').val(),
        }
        if(validarDatos(datos)){
            if(libroAencontrar!=undefined){ 
                const htmlModal=
                    `
                    <div class="col-6">
                    <img width="100%" height="100%" src="${libroAencontrar.imagen}" alt="Imagen de la portada del libro">
                    </div>
                    <div class="col-6">
                    <h1 class="modaltexto"><strong>Titulo:<strong></h1>
                    <h3 >${libroAencontrar.titulo.toUpperCase()}</h3>
                    <h1 class="modaltexto"><strong>Autor:<strong></h1>
                    <h3 >${libroAencontrar.autor.toUpperCase()}</h3>
                    </div>`;
                bodyModalNC.innerHTML=htmlModal;
                $('#ModalNComercial').modal('show');
                resetModal();
                return;
            }else{
                window.alert('no se encuentra el libro en el listado');
                resetModal();
                return;
            }
        }else{
            btnBuscarLDigital.dataset.dismiss=null;
        }
    }catch (error){
        console.log({error});
    }
}
//-------------------------ResetModal/ValidarDatos---------------------------------------------------------------
function resetModal(){
    $('.form-control').val('');
    $('.form-control').removeClass('is-valid');
    $('.form-control').removeClass('is-invalid');
    $(".alert-warning").hide();
    $('.Modal').modal('toggle');
}
function validarDatos(datos){
    if(typeof datos!=='object') return false;
    let respuesta=true;
    for(let llave in datos){
        if(datos[llave].length ===0){
            document.getElementById(llave).classList.add('is-invalid');
            respuesta =false
        }else{
            document.getElementById(llave).classList.remove('is-invalid');
            document.getElementById(llave).classList.add('is-valid');
        }
    }
    if(respuesta===false)$(".alert").show();
    if(respuesta===true)$(".alert").hide();
    return respuesta;
}

btn_buscarNC.onclick=buscarNComercial;
btnAutenticar.onclick= autenticar;
btnBuscarLC.onclick=buscarLibroComercial;
btnBuscarLDigital.onclick=buscarLibroDigital;