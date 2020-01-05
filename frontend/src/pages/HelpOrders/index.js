import React, { useState, useEffect } from 'react';
import { Form, Textarea } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

import api from '~/services/api';

import { Container } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import { Table, TableColumn, TableRow } from '~/components/Table';
import { FormContent } from '~/components/FormContent';

const schema = Yup.object().shape({
  answer: Yup.string().required('Resposta é obrigatório.'),
});

export default function HelpOrders() {
  const [helpOrders, setHelpOrders] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedHelpOrder, setSelectedHelpOrder] = useState(null);

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders');

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

  useEffect(() => {
    setOpenModal(selectedHelpOrder !== null);
  }, [selectedHelpOrder]);

  async function handleAnswer({ answer }) {
    try {
      const { id } = selectedHelpOrder;

      await api.put(`help-orders/${id}/answer`, {
        answer,
      });

      setHelpOrders(helpOrders.filter(helpOrder => helpOrder.id !== id));
      setSelectedHelpOrder(null);

      toast.success('Resposta enviada com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

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
                  <SecondaryButton
                    color="#4D85EE"
                    onClick={() => setSelectedHelpOrder(helpOrder)}
                  >
                    responder
                  </SecondaryButton>
                </div>
              </TableRow>
            </tr>
          ))}
        </tbody>
      </Table>
      <Modal
        appElement={document.getElementById('root')}
        isOpen={openModal}
        onRequestClose={() => setSelectedHelpOrder(null)}
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            width: '450px',
            transform: 'translate(-50%, -50%)',
          },
        }}
      >
        <Form
          initialData={selectedHelpOrder}
          schema={schema}
          onSubmit={handleAnswer}
        >
          <FormContent>
            <ul>
              <li>
                <strong>PERGUNTA DO ALUNO</strong>
                <p>{selectedHelpOrder ? selectedHelpOrder.question : ''}</p>
              </li>
            </ul>
            <ul>
              <li>
                <strong>SUA RESPOSTA</strong>
                <Textarea name="answer" placeholder="exemplo@email.com" />
              </li>
            </ul>
            <PrimaryButton
              type="submit"
              width="100%"
              height="45px"
              justify-content="center"
            >
              Responder aluno
            </PrimaryButton>
          </FormContent>
        </Form>
      </Modal>
    </Container>
  );
}
