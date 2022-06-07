import React, { useState, useEffect } from 'react';

function Home({sesion}) {
  const [msg, setMsg] = useState(sesion?"Sesion iniciada!":"Sesion cerrada!");
    return<center style={{padding:"50vh"}}><p className="title">{msg}</p></center>;
}

export default Home;