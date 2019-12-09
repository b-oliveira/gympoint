import React, { useState, useEffect } from 'react';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import { Table, TableColumn, TableRow } from '~/components/Table';
import { Divider } from '~/components/Divider';

export default function Plan() {
  const [plans, setPlan] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlan(response.data);
    }

    loadPlans();
  }, []);

  function updatePlan(plan) {
    history.push({
      pathname: '/teste',
      plan,
    });
  }

  function deletePlan(id) {
    console.tron.log(id);
  }

  return (
    <Container max-width="900px">
      <SubHeader>
        <SubHeaderTitle>Gerenciando planos</SubHeaderTitle>
        <PrimaryButton>CADASTRAR</PrimaryButton>
      </SubHeader>
      <Table>
        <thead>
          <tr>
            <TableColumn>TÍTULO</TableColumn>
            <TableColumn>DURAÇÃO</TableColumn>
            <TableColumn>VALOR p/ MÊS</TableColumn>
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <TableRow text-align="left">{plan.title}</TableRow>
              <TableRow>{plan.duration}</TableRow>
              <TableRow>{plan.price}</TableRow>
              <TableRow text-align="right" max-width="60px">
                <SecondaryButton
                  color="#4D85EE"
                  onClick={() => updatePlan(plan)}
                >
                  editar
                </SecondaryButton>
                <Divider />
                <SecondaryButton
                  color="#DE3B3B"
                  onClick={() => deletePlan(plan.id)}
                >
                  apagar
                </SecondaryButton>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
