import { Request, Response, NextFunction } from 'express';
import { promisePool } from '../db/db';

export const cifraDeCesarMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { valor_hash, mensagem, usuario_id, passos } = req.body;

  if (
    typeof valor_hash !== 'string' ||
    typeof passos !== 'number' ||
    typeof mensagem !== 'string' ||
    typeof usuario_id !== 'number'
  ) {
    res.status(400).json({
      error: 'Esperado: hash (string), mensagem (string), passos (number) e usuario_id (number).'
    });
    return;
  }

  try {
    // Tenta buscar o hash no banco
    const [hashResult] = await promisePool.query(
      'SELECT valor_hash, passos, valido FROM hashes WHERE valor_hash = ?',
      [valor_hash]
    ) as any;

    let passosUsar = passos;

    if (hashResult.length === 0) {
      // Se não existir, insere com valido = TRUE
      await promisePool.query(
        'INSERT INTO hashes (valor_hash, passos, valido) VALUES (?, ?, TRUE)',
        [valor_hash, passos]
      );
    } else {
      const hash = hashResult[0];
      if (!hash.valido) {
        res.status(400).json({ error: 'Hash já foi utilizado.' });
        return;
      }
      passosUsar = hash.passos;
    }

    // Função para cifrar a mensagem
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

    const mensagemCriptografada = cifra(mensagem, passosUsar);

    // Insere a mensagem criptografada
    await promisePool.query(
      'INSERT INTO mensagens ( mensagem, valor_hash, usuario_id) VALUES ( ?, ?, ?)',
      [ mensagemCriptografada, valor_hash, usuario_id]
    );

    // Marca o hash como usado
    await promisePool.query(
      'UPDATE hashes SET valido = FALSE WHERE valor_hash = ?',
      [valor_hash]
    );

    req.body.mensagemCriptografada = mensagemCriptografada;
    next();

  } catch (err) {
    console.error('Erro no middleware de cifra:', err);
    res.status(500).json({ error: 'Erro interno ao criptografar a mensagem.' });
  }
};
