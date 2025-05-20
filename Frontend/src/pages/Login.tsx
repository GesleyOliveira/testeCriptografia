import { useState } from 'react';
import { Key } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await axios.post('http://localhost:3000/login', {
        nome: username,
        senha: password,
      });

      const usuarioId = res.data.usuario_id;

      // Salva o usuário no localStorage
      localStorage.setItem('usuario_id', String(usuarioId));

      // Vai para a home
      navigate('/home');
    } catch (err: any) {
      alert(err.response?.data?.error || 'Erro no login');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <a className={styles.logoLink} href="#">
            <Key />
            <span>Login</span>
          </a>
        </div>

        <input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit">
          <span>Entrar</span>
        </button>

        <p className={styles.registerText}>
          Não tem conta?{' '}
          <a onClick={() => navigate('/register')} className={styles.link}>
            Registre-se
          </a>
        </p>
      </form>
    </div>
  );
}

export default Login;
