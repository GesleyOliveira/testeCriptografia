import { useState, useEffect } from 'react';
import styles from './styles.module.css';
import { ShieldCheck } from 'lucide-react';
import axios from 'axios';

interface MessageItem {
  id: number;
  content: string;
  valor_hash: string;
  step: number;
  decrypted?: string;
  used?: boolean;
}

export function Home() {
  const [usuarioId, setUsuarioId] = useState<number | null>(null);
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [encryptedMessages, setEncryptedMessages] = useState<MessageItem[]>([]);
  const [decryptInput, setDecryptInput] = useState({ content: '', valor_hash: '' });
  const [error, setError] = useState('');

  useEffect(() => {
    const storedUserId = localStorage.getItem('usuario_id');
    if (storedUserId) {
      setUsuarioId(Number(storedUserId));
    } else {
      setError('Usuário não autenticado.');
      // Se quiser, pode redirecionar para login aqui também
    }
  }, []);

  useEffect(() => {
    if (!usuarioId) return;

    axios.get(`http://localhost:3000/mensagens/${usuarioId}`)
      .then(res => {
        const msgs = res.data.mensagens.map((m: any) => ({
          id: m.id,
          content: m.mensagemCriptografada,
          valor_hash: m.hash,
          step: 0,
          used: false,
        }));
        setEncryptedMessages(msgs);
      })
      .catch(() => setError('Erro ao buscar mensagens'));
  }, [usuarioId]);

  const handleEncrypt = async () => {
    setError('');
    if (!message || !step) {
      setError('Mensagem e passo são obrigatórios');
      return;
    }

    // Gerar hash local para enviar (pode ser uuid ou qualquer string única)
    const valor_hash = crypto.randomUUID();

    try {
      const res = await axios.post('http://localhost:3000/criptografar', {
        valor_hash,
        mensagem: message,
        usuario_id: usuarioId,
        passos: step,
      });

      // Resposta com a mensagem criptografada e hash
      const { mensagemCriptografada } = res.data;

      setEncryptedMessages(prev => [
        {
          id: Math.random(), // temporário, no seu caso pegue do DB se retornar
          content: mensagemCriptografada,
          valor_hash,
          step,
          used: false,
        },
        ...prev,
      ]);

      setMessage('');
      setStep(1);
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao criptografar');
    }
  };

  const handleDecrypt = async () => {
    setError('');
    const found = encryptedMessages.find(
      msg => msg.valor_hash === decryptInput.valor_hash && !msg.used
    );

    if (!found) {
      setError('Hash inválido ou já utilizado.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/descriptografar', {
        mensagemCriptografada: decryptInput.content,
        valor_hash: decryptInput.valor_hash,
        usuario_id: usuarioId,
        passos: found.step,
      });

      const { mensagemOriginal } = res.data;

      setEncryptedMessages(prev =>
        prev.map(msg =>
          msg.valor_hash === decryptInput.valor_hash
            ? { ...msg, used: true, decrypted: mensagemOriginal }
            : msg
        )
      );

      setDecryptInput({ content: '', valor_hash: '' });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Erro ao descriptografar');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a className={styles.logoLink} href="#">
          <ShieldCheck />
          <span>Cripto César</span>
        </a>
      </div>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Criptografar */}
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h2>Criptografar</h2>
        <input
          type="text"
          placeholder="Mensagem a criptografar"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <input
          type="number"
          placeholder="Passo (ex: 3)"
          value={step}
          min={1}
          onChange={(e) => setStep(Number(e.target.value))}
        />
        <button className={styles.button} type="button" onClick={handleEncrypt}>
          Criptografar
        </button>
      </form>

      {/* Mensagens Criptografadas */}
      <div className={styles.messageList}>
        <h3>Mensagens criptografadas</h3>
        {encryptedMessages.map((msg) => (
          <div key={msg.valor_hash} className={styles.messageItem}>
            <p><strong>Mensagem criptografada:</strong> {msg.content}</p>
            <p><strong>Hash:</strong> {msg.valor_hash}</p>
            {msg.decrypted && <p className={styles.decrypted}><strong>Descriptografado:</strong> {msg.decrypted}</p>}
            {msg.used && <p style={{ color: 'red' }}><strong>Hash já utilizado</strong></p>}
          </div>
        ))}
      </div>

      {/* Decriptografar */}
      <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
        <h2>Decriptografar</h2>
        <input
          type="text"
          placeholder="Mensagem criptografada"
          value={decryptInput.content}
          onChange={(e) => setDecryptInput({ ...decryptInput, content: e.target.value })}
        />
        <input
          type="text"
          placeholder="Hash"
          value={decryptInput.valor_hash}
          onChange={(e) => setDecryptInput({ ...decryptInput, valor_hash: e.target.value })}
        />
        <button className={styles.button} type="button" onClick={handleDecrypt}>
          Decriptografar
        </button>
      </form>
    </div>
  );
}

export default Home;
