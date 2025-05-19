import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/users/register', { name, email, password });
      alert('Cadastro realizado com sucesso! Faça login.');
      navigate('/'); // redireciona para página de login
    } catch (error: any) {
      if (error.response && error.response.data && error.response.data.message) {
        alert(`Erro: ${error.response.data.message}`);
      } else {
        alert('Erro ao realizar cadastro.');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro</h2>
      <input
        type="text"
        placeholder="Nome"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="E-mail"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
        minLength={6}
      />
      <button type="submit">Cadastrar</button>
    </form>
  );
};

export default Register;
