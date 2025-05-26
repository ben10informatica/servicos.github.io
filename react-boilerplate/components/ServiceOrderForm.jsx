import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Select, MenuItem, FormControl, InputLabel } from '@mui/material';

export default function ServiceOrderForm({ onSubmit, initialData = {} }) {
  const [formData, setFormData] = useState({
    clientName: initialData.clientName || '',
    serviceDescription: initialData.serviceDescription || '',
    status: initialData.status || 'Em andamento',
    createdAt: initialData.createdAt || new Date().toLocaleDateString(),
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({
      clientName: '',
      serviceDescription: '',
      status: 'Em andamento',
      createdAt: new Date().toLocaleDateString(),
    });
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 3,
        bgcolor: 'background.paper',
        p: 3,
        borderRadius: 2,
        boxShadow: 3,
        border: '1px solid',
        borderColor: 'grey.300',
      }}
    >
      <Typography variant="h6" component="h2" gutterBottom>
         Ordem de Serviço
      </Typography>

      <TextField
        label="Nome do Cliente"
        name="clientName"
        value={formData.clientName}
        onChange={handleChange}
        required
        fullWidth
      />

      <TextField
        label="Descrição do Serviço"
        name="serviceDescription"
        value={formData.serviceDescription}
        onChange={handleChange}
        required
        multiline
        rows={2}
        fullWidth
      />

      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          name="status"
          value={formData.status}
          label="Status"
          onChange={handleChange}
        >
          <MenuItem value="Em andamento">Em andamento</MenuItem>
          <MenuItem value="Concluído">Concluído</MenuItem>
          <MenuItem value="Aguardando peças">Aguardando peças</MenuItem>
          <MenuItem value="Cancelado">Cancelado</MenuItem>
        </Select>
      </FormControl>

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Salvar Ordem de Serviço
      </Button>
    </Box>
  );
}