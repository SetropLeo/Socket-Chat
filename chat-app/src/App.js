import React from 'react';
import socket from 'socket.io-client';

const socketClient = socket(`http://localhost:3301`)

const App = () => {
  const [novaMensagem, setNovaMensagem] = React.useState('');
  const [mensagens, setMensagens] = React.useState([]);
  const [nome, setNome] = React.useState('');

  socketClient.on('novaMensagem', (mensagem) => {
    setMensagens([...mensagens, mensagem]);
  })


  const handleMessage = () => {
    setMensagens([...mensagens, "Eu: " + novaMensagem])

    socketClient.emit('enviaMensagem', `${nome}: ${novaMensagem}`)
  }

  return (
    <div>
      <label>Sua mensagem:</label>
      <input type="text" onChange={(event => setNovaMensagem(event.target.value))} />
      <label>Seu nome:</label>
      <input type="text" onChange={(event) => setNome(event.target.value)} />
      <button onClick={handleMessage}>Enviar mensagem</button>

      {mensagens.map((msg, index) => (
        <p key={index}>{msg}</p>
      ))}
    </div>
  );
};

export default App;
