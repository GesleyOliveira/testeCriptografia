import { useState } from 'react';
import { Key } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <form>
      <div className={styles.logo}>
        <a className={styles.logoLink} href="#">
          <Key />
          <span>Login</span>
        </a>

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

        <button
          type="button"
          className={styles.button}
          onClick={() => navigate('/register')}
        >
          <span>Registrar</span>
        </button>
      </div>
    </form>
  );
}

export default Login;
