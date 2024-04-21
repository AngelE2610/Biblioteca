const cors = require('cors')
const express = require('express')
const { Client } =require('pg')

const app = express()
const port = 3000
app.use(cors());
app.use(express.json());

//-------------Rutas-Handler-----------------------------------------------------------
//==================POST================================================================
app.post('/users', (req, res) => {
    saveUsersInBD(req.body.nombre,req.body.password)
    res.send('se envio un usuario a la base de datos')
  })
app.post('/librosnc', (req, res) => {
  const reqData=req.body;
  saveNoComercialesInBD(reqData.titulo,reqData.autor,reqData.municipio,reqData.genero,reqData.imagen)
  res.send('se envio un libro no comercial a la base de datos')
})
app.post('/librosd', (req, res) => {
  const reqData=req.body;
  saveDigitalesInBD(reqData.titulo,reqData.autor,reqData.municipio,reqData.genero,reqData.formato,reqData.imagen)
  res.send('se envio un libro digital a la base de datos')
})
app.post('/librosc', (req, res) => {
  const reqData=req.body;
  saveComercialesInBD(reqData.titulo,reqData.autor,reqData.municipio,reqData.genero,reqData.preciocup,reqData.preciomlc,reqData.imagen)
  res.send('se envio un libro comercial a la base de datos')
})
//=======================GET========================================================
app.get('/users',async (req,res)=>{
    const usuarios=await getUsersInBD()
    res.send(usuarios)
})
app.get('/librosnc',async (req,res)=>{
    const librosnc=await getNoComercialesInBD()
    res.send(librosnc)
})
app.get('/librosd',async (req,res)=>{
  const librosd=await getDigitalesInBD()
  res.send(librosd)
})
app.get('/librosc',async (req,res)=>{
  const librosc=await getComercialesInBD()
  res.send(librosc)
})
//============================DELETE=================================================
app.delete('/librosc',async (req,res)=>{
  const reqData=req.body;
  deleteComercialesInBD(reqData.titulo,reqData.autor)
  res.send('se elimino un libro comercial de la base de datos')
})
app.delete('/librosnc',async (req,res)=>{
  const reqData=req.body;
  deleteNoComercialesInBD(reqData.titulo,reqData.autor)
  res.send('se elimino un libro no comercial de la base de datos')
})
app.delete('/librosd',async (req,res)=>{
  const reqData=req.body;
  deleteDigitalesInBD(reqData.titulo,reqData.autor)
  res.send('se elimino un libro digitales de la base de datos')
})
//============================PUT================================================
app.put('/librosnc', (req, res) => {
  const reqData=req.body;
  editNoComercialesInBD(reqData.titulo,reqData.autor,reqData.municipio,reqData.genero,reqData.imagen,reqData.idnocomercial)
  res.send('se modifico un libro no comercial en la base de datos')
})
app.put('/librosc', (req, res) => {
  const reqData=req.body;
  editComercialesInBD(reqData.titulo,reqData.autor,reqData.municipio,reqData.genero,reqData.preciocup,reqData.preciomlc,reqData.imagen,reqData.idcomercial)
  res.send('se modifico un libro no comercial en la base de datos')
})
app.put('/librosd', (req, res) => {
  const reqData=req.body;
  editDigitalesInBD(reqData.titulo,reqData.autor,reqData.municipio,reqData.genero,reqData.formato,reqData.imagen,reqData.iddigital)
  res.send('se modifico un libro no comercial en la base de datos')
})
//-------------------------------------------------------------------------------------
//----------------------------Server-------------------------------------------------
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
//-----------------------------------------------------------------------------------
//---------------------CONEXION-QUERYS-----------------------------------------------
async function saveUsersInBD(nombre,password){
    
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "insert into users values('"+nombre+"','"+password+"')";
  const res = await client.query(querytoInsert)
  await client.end()
}
async function getUsersInBD(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const res = await client.query('select * from users')
  await client.end()
  return res.rows;
}
async function saveNoComercialesInBD(titulo,autor,municipio,genero,imagen){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "insert into librosnc (titulo,autor,municipio,genero,imagen) values('"
  +titulo+"','"+autor+"','"+municipio+"','"+genero+"','"+imagen+"')";
  const res = await client.query(querytoInsert)
  await client.end()
}
async function getNoComercialesInBD(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const res = await client.query('select * from librosnc')
  await client.end()
  return res.rows;
}
async function editNoComercialesInBD(titulo,autor,municipio,genero,imagen,id){
debugger;
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "update librosnc set titulo='"+titulo+"',autor='"+autor+"',municipio='"+municipio+"',genero='"+genero+"',imagen='"+imagen+"' where idnocomerciales="+id;
  const res = await client.query(querytoInsert)
  await client.end()
}
async function saveDigitalesInBD(titulo,autor,municipio,genero,formato,imagen){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "insert into librosd (titulo,autor,municipio,genero,formato,imagen) values('"
  +titulo+"','"+autor+"','"+municipio+"','"+genero+"','"+formato+"','"+imagen+"')";
  const res = await client.query(querytoInsert)
  await client.end()
}
async function getDigitalesInBD(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const res = await client.query('select * from librosd')
  await client.end()
  return res.rows;
}
async function editDigitalesInBD(titulo,autor,municipio,genero,formato,imagen,id){
    const client = new Client({
      host: 'localhost',
      port: 5432,
      database: 'Libros',
      user: 'postgres',
      password: 'angel',
    })
    await client.connect()
    const querytoInsert= "update librosd set titulo='"+titulo+"',autor='"+autor+"',municipio='"+municipio+"',genero='"+genero+"',formato='"+formato+"',imagen='"+imagen+"' where iddigitales="+id;
    const res = await client.query(querytoInsert)
    await client.end()
  }
async function saveComercialesInBD(titulo,autor,municipio,genero,preciocup,preciomlc,imagen){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "insert into librosc (titulo,autor,municipio,genero,preciocup,preciomlc,imagen)values('"
  +titulo+"','"+autor+"','"+municipio+"','"+genero+"','"+preciocup+"','"+preciomlc+"','"+imagen+"')";
  const res = await client.query(querytoInsert)
  await client.end()
}
async function getComercialesInBD(){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const res = await client.query('select * from librosc')
  await client.end()
  return res.rows;
}
async function editComercialesInBD(titulo,autor,municipio,genero,preciocup,preciomlc,imagen,id){
  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "update librosc set titulo='"+titulo+"',autor='"+autor+"',municipio='"+municipio+"',genero='"+genero+"',preciocup='"+preciocup+"',preciomlc='"+preciomlc+"',imagen='"+imagen+"' where idcomercial="+id;
  const res = await client.query(querytoInsert)
  await client.end()
}
async function deleteComercialesInBD(titulo,autor){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "delete from librosc where titulo='"+titulo+"'and autor='"+autor+"'";
  
  const res = await client.query(querytoInsert)
  await client.end()
}
async function deleteNoComercialesInBD(titulo,autor){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "delete from librosnc where titulo='"+titulo+"'and autor='"+autor+"'";
  
  const res = await client.query(querytoInsert)
  await client.end()
}
async function deleteDigitalesInBD(titulo,autor){

  const client = new Client({
    host: 'localhost',
    port: 5432,
    database: 'Libros',
    user: 'postgres',
    password: 'angel',
  })
  await client.connect()
  const querytoInsert= "delete from librosd where titulo='"+titulo+"'and autor='"+autor+"'";
  
  const res = await client.query(querytoInsert)
  await client.end()
}
//-----------------------------------------------------------------