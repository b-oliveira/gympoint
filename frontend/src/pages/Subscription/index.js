import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdCheckCircle, MdAdd } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import api from '~/services/api';
import history from '~/services/history';

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

      const data = response.data.map(subscription => {
        const start_date_formatted = format(
          parseISO(subscription.start_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );

        const end_date_formatted = format(
          parseISO(subscription.end_date),
          "d 'de' MMMM 'de' yyyy",
          {
            locale: pt,
          }
        );

        return {
          ...subscription,
          start_date_formatted,
          end_date_formatted,
        };
      });

      setSubscription(data);
    }

    loadSubscriptions();
  }, []);

  async function deleteSubscription(id) {
    try {
      await api.delete(`subscriptions/${id}`);

      setSubscription(
        subscriptions.filter(subscription => subscription.id !== id)
      );

      toast.success('Registro excluído com sucesso!');
    } catch (_) {
      toast.error('Não foi possível realizar esta operação!');
    }
  }

  return (
    <Container>
      <SubHeader>
        <SubHeaderTitle>Gerenciando matrículas</SubHeaderTitle>
        <PrimaryButton
          onClick={() => history.push('/subscriptions/new')}
          width="142px"
        >
          <MdAdd color="#fff" size={20} />
          CADASTRAR
        </PrimaryButton>
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
                  <SecondaryButton
                    color="#4D85EE"
                    onClick={() =>
                      history.push(`subscriptions/${subscription.id}/edit`)
                    }
                  >
                    editar
                  </SecondaryButton>
                  <Divider />
                  <SecondaryButton
                    color="#DE3B3B"
                    onClick={() =>
                      confirmAlert({
                        customUI: alert => {
                          return (
                            <div className="custom-ui">
                              <strong>
                                {`Tem certeza que deseja excluir a inscrição
                                do aluno ${subscription.student.name}?`}
                              </strong>
                              <PrimaryButton
                                onClick={() => {
                                  deleteSubscription(subscription.id);
                                  alert.onClose();
                                }}
                              >
                                Sim, tenho certeza
                              </PrimaryButton>
                            </div>
                          );
                        },
                      })
                    }
                  >
                    apagar
                  </SecondaryButton>
                </div>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
