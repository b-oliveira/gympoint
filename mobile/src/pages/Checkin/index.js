import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '../../components/Background';
import CheckinItem from '../../components/CheckinItem';

import { Container, SubmitButton, List } from './styles';

export default function Checkin() {
  const { id } = useSelector(state => state.auth.student);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/students/${id}/checkins`);

      setCheckins(response.data);
    }

    loadCheckins();
  }, [id]);

  async function handleSubmit() {
    try {
      setLoading(true);

      const { data } = await api.post(`/students/${id}/checkins`);

      Alert.alert('Checkin', 'Check-in realizado com sucesso!');

      setCheckins([data, ...checkins]);
      setLoading(false);
    } catch (err) {
      Alert.alert('Checkin', err.response.data.error);
      setLoading(false);
    }
  }

  return (
    <Background>
      <Container>
        <SubmitButton onPress={handleSubmit} loading={loading}>
          Novo check-in
        </SubmitButton>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CheckinItem data={item} />}
        />
      </Container>
    </Background>
  );
}

Checkin.navigationOptions = () => ({
  headerTitle: 'Check-ins',
});
