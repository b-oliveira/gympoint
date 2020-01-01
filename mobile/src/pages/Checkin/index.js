import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import Background from '../../components/Background';
import CheckinItem from '../../components/CheckinItem';

import { Container, SubmitButton, List } from './styles';

export default function Checkin() {
  const { id } = useSelector(state => state.auth.student);
  const [checkins, setCheckins] = useState([]);

  useEffect(() => {
    async function loadCheckins() {
      const response = await api.get(`/students/${id}/checkins`);

      setCheckins(response.data);
    }

    loadCheckins();
  }, [id]);

  return (
    <Background>
      <Container>
        <SubmitButton>Novo check-in</SubmitButton>

        <List
          data={checkins}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <CheckinItem data={item} />}
        />
      </Container>
    </Background>
  );
}

Checkin.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
