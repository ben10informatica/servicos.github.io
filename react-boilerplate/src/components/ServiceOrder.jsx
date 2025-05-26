import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Button,
  Stack,
  Snackbar,
  Alert,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ServiceOrderList from './ServiceOrderList';
import ServiceOrderForm from './ServiceOrderForm';

export default function ServiceOrder() {
  const [activeTab, setActiveTab] = useState('cliente');
  const [clientInfo, setClientInfo] = useState({ name: '', phone: '', mobile: '', email: '' });
  const [vehicleInfo, setVehicleInfo] = useState({ plate: '', brand: '', model: '', color: '', year: '', km: '', chassis: '' });
  const [orderInfo, setOrderInfo] = useState({ number: '', entryDate: new Date().toISOString().split('T')[0], finishDate: '', employee: '' });
  const [problemDescription, setProblemDescription] = useState('');
  const [productsServices, setProductsServices] = useState('');
  const [observations, setObservations] = useState('');
  const [paymentInfo, setPaymentInfo] = useState({ discountAmount: 0, discountPercentage: 0, advancePayment: 0, totalAmount: 0 });
  const [orders, setOrders] = useState([]);
  const [showQuickForm, setShowQuickForm] = useState(false);

  // Estados para Snackbar
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const savedOrders = localStorage.getItem('serviceOrders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('serviceOrders', JSON.stringify(orders));
  }, [orders]);

  const showNotification = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleSave = () => {
    if (!clientInfo.name) {
      showNotification('Por favor, informe o nome do cliente.', 'error');
      setActiveTab('cliente');
      return;
    }
    if (!vehicleInfo.plate) {
      showNotification('Por favor, informe a placa do veículo.', 'error');
      setActiveTab('veiculo');
      return;
    }
    const newOrder = {
      id: Date.now(),
      clientInfo,
      vehicleInfo,
      orderInfo,
      problemDescription,
      productsServices,
      observations,
      paymentInfo,
      status: 'Em andamento',
      createdAt: new Date().toLocaleDateString()
    };
    setOrders([...orders, newOrder]);
    setClientInfo({ name: '', phone: '', mobile: '', email: '' });
    setVehicleInfo({ plate: '', brand: '', model: '', color: '', year: '', km: '', chassis: '' });
    setOrderInfo({ number: '', entryDate: new Date().toISOString().split('T')[0], finishDate: '', employee: '' });
    setProblemDescription('');
    setProductsServices('');
    setObservations('');
    setPaymentInfo({ discountAmount: 0, discountPercentage: 0, advancePayment: 0, totalAmount: 0 });
    showNotification('Ordem de serviço salva com sucesso!', 'success');
  };

  const handleQuickSave = (orderData) => {
    // Transform formData from ServiceOrderForm to match order structure
    const newOrder = {
      id: Date.now(),
      clientInfo: { name: orderData.clientName, phone: '', mobile: '', email: '' },
      vehicleInfo: { plate: '', brand: '', model: '', color: '', year: '', km: '', chassis: '' },
      orderInfo: { number: '', entryDate: new Date().toISOString().split('T')[0], finishDate: '', employee: '' },
      problemDescription: orderData.serviceDescription,
      productsServices: '',
      observations: '',
      paymentInfo: { discountAmount: 0, discountPercentage: 0, advancePayment: 0, totalAmount: 0 },
      status: orderData.status || 'Em andamento',
      createdAt: orderData.createdAt || new Date().toLocaleDateString()
    };
    setOrders([...orders, newOrder]);
    setShowQuickForm(false);
    showNotification('Ordem de serviço salva com sucesso!', 'success');
  };

  const handleDelete = (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta ordem de serviço?')) {
      setOrders(orders.filter(order => order.id !== id));
      showNotification('Ordem de serviço excluída com sucesso!', 'info');
    }
  };

  const handleClose = () => {
    if (window.confirm('Deseja sair sem salvar as alterações?')) {
      window.history.back();
    }
  };

  return (
    <Box maxWidth="1200px" mx="auto" bgcolor="background.paper" borderRadius={2} boxShadow={3} overflow="hidden">
      <Box bgcolor="primary.main" color="primary.contrastText" px={4} py={3} display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h4" fontWeight="bold" letterSpacing={1}>
          Sistema de Ordens de Serviço
        </Typography>
        <Button
          variant="contained"
          color="error"
          startIcon={<CloseIcon />}
          onClick={handleClose}
        >
          Fechar
        </Button>
      </Box>

      <Box p={4} display={showQuickForm ? 'none' : 'block'}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={4} flexWrap="wrap" gap={2}>
          <Typography variant="h5" color="primary.main" fontWeight="bold">
            Nova Ordem de Serviço
          </Typography>
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSave}
            >
              Gravar Dados
            </Button>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
              onClick={() => setShowQuickForm(!showQuickForm)}
            >
              {showQuickForm ? 'Fechar Formulário Rápido' : 'Formulário Rápido'}
            </Button>
          </Stack>
        </Box>
      </Box>

      {showQuickForm && (
        <Box mb={4} p={3} border={2} borderColor="secondary.light" bgcolor="secondary.lighter" borderRadius={2} boxShadow={1}>
          <ServiceOrderForm onSubmit={handleQuickSave} />
        </Box>
      )}

      <Box px={4} pb={2}>
        <ServiceOrderList orders={orders} onDelete={handleDelete} />
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
}
