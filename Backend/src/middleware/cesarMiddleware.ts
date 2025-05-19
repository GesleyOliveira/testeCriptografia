import { Request, Response, NextFunction } from 'express';
import { promisePool } from '../db/db';

export const cifraDeCesarMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  const { hash, mensagem, usuario_id } = req.body;

  if (typeof hash !== 'string' || typeof mensagem !== 'string' || typeof usuario_id !== 'number') {
    res.status(400).json({
      error: 'Esperado: hash (string), mensagem (string) e usuario_id (number).'
    });
    return;
  }

  try {
    // 1. Verifica se o hash existe e está válido
    const [hashResult] = await promisePool.query(
      'SELECT id, passos, valido FROM hashes WHERE id = ? AND valido = TRUE',
      [hash]
    ) as any;

    if (hashResult.length === 0) {
      res.status(400).json({ error: 'Hash inválido ou já utilizado.' });
      return;
    }

    const { passos } = hashResult[0];

    // 2. Cifra de César
    const cifra = (texto: string, deslocamento: number): string => {
      return texto.split('').map(char => {
        if (/[a-z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 97 + deslocamento) % 26) + 97);
        }
        if (/[A-Z]/.test(char)) {
          return String.fromCharCode(((char.charCodeAt(0) - 65 + deslocamento) % 26) + 65);
        }
        return char;
      }).join('');
    };

    const mensagemCriptografada = cifra(mensagem, passos);

    // 3. Salva a mensagem
    await promisePool.query(
      'INSERT INTO mensagens (mensagem, valor_hash, usuario_id) VALUES (?, ?, ?)',
      [mensagemCriptografada, hash, usuario_id]
    );

    // 4. Invalida o hash
    await promisePool.query(
      'UPDATE hashes SET valido = FALSE WHERE id = ?',
      [hash]
    );

    // 5. Continua o fluxo
    req.body.mensagemCriptografada = mensagemCriptografada;
    next();
  } catch (err) {
    console.error('Erro no middleware de cifra:', err);
    res.status(500).json({ error: 'Erro interno ao criptografar a mensagem.' });
  }
};
