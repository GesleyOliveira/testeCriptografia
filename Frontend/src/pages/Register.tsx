import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nome, senha }),
      });

      if (!response.ok) {
        throw new Error('Erro ao cadastrar');
      }

      // Redireciona para a página de login após o cadastro bem-sucedido
      navigate('/login');
    } catch (error) {
      console.error(error);
      alert('Falha ao cadastrar. Tente novamente.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.logo}>
          <a className={styles.logoLink} href="#">
            <KeyRound />
            <span>Cadastro</span>
          </a>
        </div>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
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
