import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  return (
    <form>
      <div className={styles.logo}>
        <a className={styles.logoLink} href="#">
          <KeyRound />
          <span>Cadastro</span>
        </a>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit">
          <span>Cadastrar</span>
        </button>

        <button
          type="button"
          className={styles.button}
          onClick={() => navigate('/login')}
        >
          <span>Voltar ao login</span>
        </button>
      </div>
    </form>
  );
}

export default Register;
