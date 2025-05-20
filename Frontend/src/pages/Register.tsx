import { useState } from 'react';
import { KeyRound } from 'lucide-react';
import styles from './styles.module.css';
import { useNavigate } from 'react-router-dom';

export function Register() {
  const [nome, setNome] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação simples no frontend
    if (!nome.trim() || !senha.trim()) {
      setErrorMsg('Por favor, preencha nome e senha.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://localhost:3000/cadastrar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, senha }),
      });

      const data = await response.json();

      if (!response.ok) {
        // Exibe a mensagem de erro retornada pelo backend
        setErrorMsg(data.error || 'Erro ao cadastrar');
        setLoading(false);
        return;
      }

      // Sucesso: redireciona para login
      navigate('/login');
    } catch (error) {
      console.error(error);
      setErrorMsg('Falha ao cadastrar. Tente novamente.');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <div className={styles.logo}>
          <button
            type="button"
            onClick={() => navigate('/')}
            className={styles.logoLink}
            aria-label="Voltar para home"
          >
            <KeyRound />
            <span>Cadastro</span>
          </button>
        </div>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          disabled={loading}
          required
          aria-required="true"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          disabled={loading}
          required
          aria-required="true"
        />

        {errorMsg && <p className={styles.errorMsg}>{errorMsg}</p>}

        <button
          className={styles.button}
          type="submit"
          disabled={loading}
          aria-busy={loading}
        >
          <span>{loading ? 'Cadastrando...' : 'Cadastrar'}</span>
        </button>

        <p className={styles.registerText}>
          Já possui uma conta?{' '}
          <button
            type="button"
            onClick={() => navigate('/login')}
            className={styles.link}
          >
            Voltar ao login
          </button>
        </p>
      </form>
    </div>
  );
}

export default Register;
