import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';

import api from '~/services/api';
import history from '~/services/history';

import { formatPrice } from '~/util/format';

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

      const data = response.data.map(plan => {
        const { duration } = plan;

        const durationFormatted = `${duration} ${
          duration === 1 ? 'Mês' : 'Meses'
        }`;
        const priceFormatted = formatPrice(plan.price);

        return {
          ...plan,
          durationFormatted,
          priceFormatted,
        };
      });

      setPlan(data);
    }

    loadPlans();
  }, []);

  function createPlan() {
    history.push(`/plans/new`);
  }

  function updatePlan(plan) {
    history.push(`/plans/${plan.id}/edit`);
  }

  async function deletePlan(id) {
    try {
      await api.delete(`plans/${id}`);

      setPlan(plans.filter(plan => plan.id !== id));

      toast.success('Registro excluído com sucesso!');
    } catch (_) {
      toast.error('Não foi possível realizar esta operação!');
    }
  }

  return (
    <Container max-width="900px">
      <SubHeader>
        <SubHeaderTitle>Gerenciando planos</SubHeaderTitle>
        <PrimaryButton width="142px" onClick={() => createPlan()}>
          <MdAdd color="#fff" size={20} />
          CADASTRAR
        </PrimaryButton>
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
              <TableRow>{plan.durationFormatted}</TableRow>
              <TableRow>{plan.priceFormatted}</TableRow>
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
                  onClick={() =>
                    confirmAlert({
                      customUI: alert => {
                        return (
                          <div className="custom-ui">
                            <strong>
                              {`Tem certeza que deseja excluir o plano ${plan.title}?`}
                            </strong>

                            <PrimaryButton
                              onClick={() => {
                                deletePlan(plan.id);
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
              </TableRow>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
