import React from 'react';
import { Image } from 'react-native';

import logo from '../../assets/logo.png';

import Background from '../../components/Background';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn() {
  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <FormInput
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
          />

          <SubmitButton>Entrar no sistema</SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
