import React from 'react';
import { Form, Input } from '@rocketseat/unform';

export default function SignIn() {
  function handleSubmit(data) {
    console.tron.log(data);
  }

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <strong>SEU E-MAIL</strong>
        <Input name="email" type="email" placeholder="exemplo@email.com" />
        <strong>SUA SENHA</strong>
        <Input name="password" type="password" placeholder="*************" />
        <button type="submit">Entrar no sistema</button>
      </Form>
    </>
  );
}
