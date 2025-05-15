import { useState } from 'react';
import { Key } from 'lucide-react';
import styles from './styles.module.css';

export function Login() {
  const [username, setUsername] = useState('');

  return (
    <>
      <form >
        <div className={styles.logo}>
          <a className={styles.logoLink} href='#'>
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
            type="text"
            placeholder="Senha"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button className={`${styles.button}`}>
            <span>Entrar</span>
          </button>
        </div>
      </form>
    </>
  );
}

export default Login;

