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
    <div className={styles.container}>
      <form className={styles.form}>
        <div className={styles.logo}>
          <a className={styles.logoLink} href="#">
            <KeyRound />
            <span>Cadastro</span>
          </a>
        </div>

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

        <p className={styles.registerText}>
          Já possui uma conta?{' '}
          <a onClick={() => navigate('/login')} className={styles.link}>
            Voltar ao login
          </a>
        </p>
      </form>
    </div>
  );
}

export default Register;
