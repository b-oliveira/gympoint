import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '../../components/Background';
import HelpOrderItem from '../../components/HelpOrderItem';

import { Container, SubmitButton, List } from './styles';

export default function HelpOrder() {
  const { id } = useSelector(state => state.auth.student);
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${id}/help-orders`);

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, [id]);

  return (
    <Background>
      <Container>
        <SubmitButton loading={loading}>Novo pedido de auxílio</SubmitButton>

        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <HelpOrderItem data={item} />}
        />
      </Container>
    </Background>
  );
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
