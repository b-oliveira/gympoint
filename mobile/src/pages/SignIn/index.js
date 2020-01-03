import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image } from 'react-native';

import { signInRequest } from '~/store/modules/auth/actions';

import logo from '~/assets/logo.png';

import Background from '~/components/Background';
import Input from '~/components/Input';
import { Container, Form, SubmitButton } from './styles';

export default function SignIn() {
  const dispatch = useDispatch();

  const [id, setId] = useState();

  const { loading } = useSelector(state => state.auth);

  function handleSubmit() {
    dispatch(signInRequest(id));
  }

  return (
    <Background>
      <Container>
        <Image source={logo} />
        <Form>
          <Input
            keyboardType="numeric"
            placeholder="Informe seu ID de cadastro"
            returnKeyType="send"
            value={id}
            onChangeText={setId}
          />

          <SubmitButton loading={loading} onPress={handleSubmit}>
            Entrar no sistema
          </SubmitButton>
        </Form>
      </Container>
    </Background>
  );
}
