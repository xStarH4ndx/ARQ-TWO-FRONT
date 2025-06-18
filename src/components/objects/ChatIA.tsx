import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  CircularProgress,
} from '@mui/material';
import { useQuery, useLazyQuery } from '@apollo/client';
import ReactMarkdown from 'react-markdown';

import { LISTAR_INVENTARIO, OBTENER_PRODUCTO } from '../../api/queries/inventoryQueries';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatIAProps {
  casaId: string;
}

const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;
const API_URL = import.meta.env.VITE_OPENROUTER_URL;

const ChatIA: React.FC<ChatIAProps> = ({ casaId }) => {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { data: inventarioData } = useQuery(LISTAR_INVENTARIO, {
    variables: { casaId },
  });

  const [obtenerProducto] = useLazyQuery(OBTENER_PRODUCTO);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const handleSend = async (customInput?: string) => {
    const messageContent = customInput ?? input;
    if (!messageContent.trim()) return;

    const newMessages: Message[] = [...messages, { role: 'user', content: messageContent }];
    setMessages(newMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          'HTTP-Referer': 'http://localhost:5173',
          'X-Title': 'Chat Recetas IA',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'meta-llama/llama-4-maverick:free',
          messages: newMessages.map((msg) => ({
            role: msg.role,
            content: msg.content,
          })),
        }),
      });

      const data = await response.json();
      const reply = data.choices?.[0]?.message?.content || 'Sin respuesta de la IA.';
      setMessages([...newMessages, { role: 'assistant', content: reply }]);
    } catch (error) {
      console.error('Error al enviar mensaje:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRetry = () => {
    const lastUserMessage = [...messages].reverse().find((msg) => msg.role === 'user');
    if (lastUserMessage) {
      handleSend(lastUserMessage.content);
    }
  };

  const handlePedirRecetas = async () => {
    if (!inventarioData?.listarInventario) return;

    const productosAlimentos: string[] = [];

    for (const item of inventarioData.listarInventario) {
      try {
        const { data } = await obtenerProducto({ variables: { id: item.productoId } });
        if (data?.obtenerProducto?.categoria === 'Alimentos') {
          productosAlimentos.push(data.obtenerProducto.nombre);
        }
      } catch (error) {
        console.error('Error obteniendo producto:', error);
      }
    }

    if (productosAlimentos.length > 0) {
      const pregunta = `¿Qué recetas puedo hacer con lo que tengo?: ${productosAlimentos.join(', ')}`;
      handleSend(pregunta);
    } else {
      handleSend('No tengo alimentos en mi inventario actualmente.');
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        🍽️ Chat de Recetas con IA
      </Typography>

      <Paper
        elevation={3}
        sx={{
          height: 400,
          overflowY: 'auto',
          p: 2,
          mb: 3,
        }}
      >
        {messages.map((msg, index) => (
          <Box key={index} sx={{ mb: 2 }}>
            <Typography
              variant="subtitle2"
              color={msg.role === 'user' ? 'primary' : 'success.main'}
            >
              {msg.role === 'user' ? 'Tú' : 'IA'}:
            </Typography>
            <Typography variant="body2">
              <ReactMarkdown>{msg.content}</ReactMarkdown>
            </Typography>
          </Box>
        ))}
        {loading && (
          <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
            <CircularProgress size={20} sx={{ mr: 1 }} />
            <Typography variant="body2" color="text.secondary">
              La IA está pensando...
            </Typography>
          </Box>
        )}
        <div ref={bottomRef} />
      </Paper>

      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <TextField
          fullWidth
          label="Escribe una receta o pregunta..."
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" color="primary" onClick={() => handleSend()} disabled={loading}>
          Enviar
        </Button>
        <Button
          variant="contained"
          color="success"
          onClick={handlePedirRecetas}
          disabled={loading || !inventarioData?.listarInventario}
        >
          Pedir recetas
        </Button>
      </Box>

      <Box sx={{ textAlign: 'right' }}>
        <Button
          variant="outlined"
          color="secondary"
          onClick={handleRetry}
          disabled={loading || messages.filter((msg) => msg.role === 'user').length === 0}
        >
          Reintentar última pregunta
        </Button>
      </Box>
    </Container>
  );
};

export default ChatIA;
