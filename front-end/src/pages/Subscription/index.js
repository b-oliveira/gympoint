import React, { useState, useEffect } from 'react';
import { MdCheckCircle } from 'react-icons/md';

import api from '~/services/api';

import {
  Container,
  Header,
  Table,
  TableColumn,
  TableRow,
  Actions,
  Button,
  Divider,
} from './styles';

export default function Subscription() {
  const [schedule, setSchedule] = useState([]);

  useEffect(() => {
    async function loadSchedule() {
      const response = await api.get('subscriptions');

      setSchedule(response.data);
    }

    loadSchedule();
  }, []);

  return (
    <Container>
      <Header>
        <strong>Gerenciando matrículas</strong>
        <button type="button">CADASTRAR</button>
      </Header>
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
          {schedule.map(teste => (
            <tr key={teste.id}>
              <TableRow text-align="left">{teste.student.name}</TableRow>
              <TableRow>{teste.plan.title}</TableRow>
              <TableRow>{teste.start_date_formatted}</TableRow>
              <TableRow>{teste.end_date_formatted}</TableRow>
              <TableRow>
                {teste.active ? (
                  <MdCheckCircle color="#42cb59" size={20} />
                ) : (
                  <MdCheckCircle color="#dddddd" size={20} />
                )}
              </TableRow>
              <TableRow text-align="right" max-width="60px">
                <Actions>
                  <Button color="#4D85EE">editar</Button>
                  <Divider />
                  <Button color="#DE3B3B">apagar</Button>
                </Actions>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
