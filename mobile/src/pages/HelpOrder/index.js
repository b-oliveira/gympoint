import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import LogoHeader from '~/components/LogoHeader';
import Background from '../../components/Background';
import HelpOrderItem from '../../components/HelpOrderItem';

import { Container, SubmitButton, List } from './styles';

function HelpOrder({ navigation, isFocused }) {
  const { id } = useSelector(state => state.auth.student);
  const [helpOrders, setHelpOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get(`/students/${id}/help-orders`);

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, [isFocused]); // eslint-disable-line

  return (
    <Background>
      <Container>
        <SubmitButton
          loading={loading}
          onPress={() => {
            navigation.navigate('NewQuestion');
          }}
        >
          Novo pedido de auxílio
        </SubmitButton>

        <List
          data={helpOrders}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <HelpOrderItem data={item} />}
        />
      </Container>
    </Background>
  );
}
HelpOrder.navigationOptions = () => ({
  headerTitle: () => <LogoHeader />,
});

export default withNavigationFocus(HelpOrder);
