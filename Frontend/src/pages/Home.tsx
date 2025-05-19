import { useState } from 'react';
import styles from './styles.module.css';
import { ShieldCheck } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid'; // UUID para gerar hashes únicos

interface MessageItem {
  id: string;
  content: string;
  hash: string;
  step: number;
  decrypted?: string;
  used?: boolean;
}

export function Home() {
  const [message, setMessage] = useState('');
  const [step, setStep] = useState(1);
  const [encryptedMessages, setEncryptedMessages] = useState<MessageItem[]>([]);
  const [decryptInput, setDecryptInput] = useState({ content: '', hash: '' });

  const caesarCipher = (text: string, shift: number) => {
    return text.replace(/[a-z]/gi, (char) => {
      const start = char === char.toUpperCase() ? 65 : 97;
      return String.fromCharCode(
        ((char.charCodeAt(0) - start + shift + 26) % 26) + start
      );
    });
  };

  const handleEncrypt = () => {
    if (!message || !step) return;

    const encrypted = caesarCipher(message, step);
    const hash = uuidv4(); // gera um hash único

    const newMessage: MessageItem = {
      id: hash,
      content: encrypted,
      hash,
      step,
      used: false,
    };

    setEncryptedMessages(prev => [newMessage, ...prev]);
    setMessage('');
    setStep(1);
  };

  const handleDecrypt = () => {
    const found = encryptedMessages.find(
      msg => msg.hash === decryptInput.hash && !msg.used
    );

    if (!found) {
      alert('Hash inválido ou já utilizado.');
      return;
    }

    const decrypted = caesarCipher(decryptInput.content, -found.step);

    setEncryptedMessages(prev =>
      prev.map(msg =>
        msg.hash === decryptInput.hash ? { ...msg, used: true, decrypted } : msg
      )
    );

    setDecryptInput({ content: '', hash: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <a className={styles.logoLink} href="#">
          <ShieldCheck />
          <span>Cripto César</span>
        </a>
      </div>

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
          onChange={(e) => setStep(parseInt(e.target.value))}
        />
        <button className={styles.button} type="button" onClick={handleEncrypt}>
          Criptografar
        </button>
      </form>

      {/* Mensagens Criptografadas */}
      <div className={styles.messageList}>
        <h3>Mensagens criptografadas</h3>
        {encryptedMessages.map((msg) => (
          <div key={msg.id} className={styles.messageItem}>
            <p><strong>Mensagem criptografada:</strong> {msg.content}</p>
            <p><strong>Hash:</strong> {msg.hash}</p>
            <p><strong>Passo:</strong> {msg.step}</p>
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
          value={decryptInput.hash}
          onChange={(e) => setDecryptInput({ ...decryptInput, hash: e.target.value })}
        />
        <button className={styles.button} type="button" onClick={handleDecrypt}>
          Decriptografar
        </button>
      </form>
    </div>
  );
}

export default Home;
