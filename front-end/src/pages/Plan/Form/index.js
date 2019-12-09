import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';

import { Container, Content } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton } from '~/components/Button';
import { Divider } from '~/components/Divider';
import { FormContent } from './styles';

export default function Plan(data) {
  const { plan } = data.location;

  const [duration, setDuration] = useState(plan.duration);
  const [price, setPrice] = useState(plan.price);
  const [priceTotal, setPriceTotal] = useState();

  useEffect(() => {
    async function calculatePriceTotal() {
      setPriceTotal(duration * price);
    }

    calculatePriceTotal();
  }, [duration, price]);

  return (
    <Container max-width="900px">
      <Form initialData={plan}>
        <SubHeader>
          <SubHeaderTitle>Cadastro de plano</SubHeaderTitle>
          <div>
            <PrimaryButton>
              <Link to="plan" color="#fff">
                VOLTAR
              </Link>
            </PrimaryButton>
            <Divider />
            <PrimaryButton type="submit">SALVAR</PrimaryButton>
          </div>
        </SubHeader>
        <Content>
          <FormContent>
            <div>
              <strong>TÍTULO DO PLANO</strong>
            </div>
            <div>
              <Input name="title" type="text" />
            </div>
            <div>
              <strong>DURAÇÃO (em meses)</strong>
              <strong>PREÇO MENSAL</strong>
              <strong>PREÇO TOTAL</strong>
            </div>
            <div>
              <Input
                name="duration"
                type="text"
                onChange={e => setDuration(e.target.value)}
              />
              <Input
                name="price"
                type="text"
                onChange={e => setPrice(e.target.value)}
              />
              <Input
                name="priceTotal"
                type="text"
                value={priceTotal || ''}
                readOnly
              />
            </div>
          </FormContent>
        </Content>
      </Form>
    </Container>
  );
}
