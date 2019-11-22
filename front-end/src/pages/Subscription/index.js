import React, { useState, useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';

import api from '~/services/api';

import { Container } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import { Table, TableColumn, TableRow } from '~/components/Table';
import { Divider } from '~/components/Divider';

export default function Subscription() {
  const [subscriptions, setSubscription] = useState([]);

  useEffect(() => {
    async function loadSubscriptions() {
      const response = await api.get('subscriptions');

      setSubscription(response.data);
    }

    loadSubscriptions();
  }, []);

  return (
    <Container>
      <SubHeader>
        <SubHeaderTitle>Gerenciando matrículas</SubHeaderTitle>
        <PrimaryButton>CADASTRAR</PrimaryButton>
      </SubHeader>
      <Table>
        <thead>
          <tr>
            <TableColumn text-align="left">ALUNO</TableColumn>
            <TableColumn>PLANO</TableColumn>
            <TableColumn>INÍCIO</TableColumn>
            <TableColumn>TÉRMINO</TableColumn>
            <TableColumn>ATIVO</TableColumn>
          </tr>
        </thead>
        <tbody>
          {subscriptions.map(subscription => (
            <tr key={subscription.id}>
              <TableRow text-align="left">{subscription.student.name}</TableRow>
              <TableRow>{subscription.plan.title}</TableRow>
              <TableRow>{subscription.start_date_formatted}</TableRow>
              <TableRow>{subscription.end_date_formatted}</TableRow>
              <TableRow>
                {subscription.active ? (
                  <MdCheckCircle color="#42cb59" size={20} />
                ) : (
                  <MdCheckCircle color="#dddddd" size={20} />
                )}
              </TableRow>
              <TableRow text-align="right" max-width="60px">
                <div>
                  <SecondaryButton color="#4D85EE">editar</SecondaryButton>
                  <Divider />
                  <SecondaryButton color="#DE3B3B">apagar</SecondaryButton>
                </div>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
