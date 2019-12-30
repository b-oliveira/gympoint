import React, { useState, useEffect } from 'react';

import api from '~/services/api';

import { Container } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { SecondaryButton } from '~/components/Button';
import { Table, TableColumn, TableRow } from '~/components/Table';

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders');

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

  return (
    <Container max-width="700px">
      <SubHeader>
        <SubHeaderTitle>Pedidos de auxílio</SubHeaderTitle>
      </SubHeader>
      <Table>
        <thead>
          <tr>
            <TableColumn text-align="left">ALUNO</TableColumn>
            <TableColumn />
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(helpOrder => (
            <tr key={helpOrder.id}>
              <TableRow text-align="left">{helpOrder.student.name}</TableRow>
              <TableRow text-align="right" max-width="20px">
                <div>
                  <SecondaryButton color="#4D85EE">responder</SecondaryButton>
                </div>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
