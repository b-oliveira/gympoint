import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { withNavigationFocus } from 'react-navigation';
import { Alert } from 'react-native';
import PropTypes from 'prop-types';

import api from '~/services/api';

import LogoHeader from '~/components/LogoHeader';
import Background from '~/components/Background';
import Button from '~/components/Button';
import CheckinItem from '~/components/CheckinItem';
import Loading from '~/components/Loading';

import { Container, List } from './styles';

function Checkin({ isFocused }) {
  const { id } = useSelector(state => state.auth.student);
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);

  async function loadCheckins() {
    try {
      const { data } = await api.get(`/students/${id}/checkins`);

      setCheckins(data);
    } catch (err) {
      Alert.alert('Check-in', err.response.data.error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (isFocused) {
      setLoading(true);
      loadCheckins();
    }
  }, [isFocused]); // eslint-disable-line

  async function handleSubmit() {
    try {
      setLoading(true);

      await api.post(`/students/${id}/checkins`);

      Alert.alert('Check-in', 'Check-in realizado com sucesso!');

      loadCheckins();
    } catch (err) {
      Alert.alert('Check-in', err.response.data.error);

      setLoading(false);
    }
  }

  return (
    <Background>
      {loading ? (
        <Loading />
      ) : (
        <Container>
          <Button onPress={handleSubmit}>Novo check-in</Button>
          <List
            data={checkins}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <CheckinItem data={item} />}
          />
        </Container>
      )}
    </Background>
  );
}

Checkin.navigationOptions = () => ({
  headerTitle: () => <LogoHeader />,
});

Checkin.propTypes = {
  isFocused: PropTypes.bool.isRequired,
};

export default withNavigationFocus(Checkin);
