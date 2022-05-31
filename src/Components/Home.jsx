import React, { useState, useEffect } from 'react';

function Home({sesion}) {
  const [msg, setMsg] = useState(sesion?"Sesion iniciada!":"Sesion cerrada!");

        useEffect(() => {
        if(sesion){
            try{
                fetch('http://localhost:4000/').then((res) => res.json())
                .then((json) => {
                console.log(json);
                setMsg(json.hola);
                })
                }
                catch (err) {
                console.error('err', err);
                alert(err);
                }
            }
    },[]);
    return<center style={{padding:"50vh"}}><p className="title">{msg}</p></center>;
}

export default Home;