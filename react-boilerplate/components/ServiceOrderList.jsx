import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Typography, Box } from '@mui/material';

export default function ServiceOrderList({ orders, onDelete, onSelectOrder, selectedOrderId }) {
  if (!orders || orders.length === 0) {
    return (
      <Box sx={{ p: 3, textAlign: 'center', bgcolor: 'background.paper', borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h6" gutterBottom>Nenhuma ordem de serviço encontrada.</Typography>
        -----------------------------------------------------------
        <Typography variant="body2">Adicione uma nova ordem de serviço para começar.</Typography>
      </Box>
    );
  }

  return (
    <TableContainer component={Paper} sx={{ mt: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Cliente</TableCell>
            <TableCell>Descrição do Serviço</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Data de Criação</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((order) => (
            <TableRow
              key={order.id}
              onClick={() => onSelectOrder(order.id)}
              selected={selectedOrderId === order.id}
              sx={{ cursor: 'pointer' }}
            >
              <TableCell>{order.clientInfo?.name}</TableCell>
              <TableCell>{order.problemDescription}</TableCell>
              <TableCell>{order.status}</TableCell>
              <TableCell>{order.createdAt || new Date().toLocaleDateString()}</TableCell>
              <TableCell align="right">
                <Button variant="outlined" color="error" onClick={(e) => { e.stopPropagation(); onDelete(order.id); }}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}