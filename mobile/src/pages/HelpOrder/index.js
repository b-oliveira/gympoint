import React from 'react';

import Icon from 'react-native-vector-icons/MaterialIcons';

import Background from '../../components/Background';

// import { Container } from './styles';

export default function HelpOrder() {
  return <Background />;
}

HelpOrder.navigationOptions = {
  tabBarLabel: 'Pedir ajuda',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="live-help" size={20} color={tintColor} />
  ),
};
