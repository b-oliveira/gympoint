import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton } from '~/components/Button';
import { Divider } from '~/components/Divider';
import { FormContent } from '~/components/FormContent';

const schema = Yup.object().shape({
  title: Yup.string().required('É obrigatório informar o título.'),
  duration: Yup.number()
    .typeError('Informe um valor númerico.')
    .positive('Informe um valor positivo.')
    .required(),
  price: Yup.number()
    .typeError('Informe um valor númerico.')
    .positive('Informe um valor positivo.')
    .required(),
});

export default function Plan() {
  const [plan, setPlan] = useState([]);
  const [priceTotal, setPriceTotal] = useState();
  const [update, setUpdate] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function loadPlan() {
      if (id) {
        try {
          const { data } = await api.get(`plans/${id}`);

          setUpdate(true);
          setPlan(data);
        } catch (err) {
          toast.error(err.response.data.error);
          history.push('/plans');
        }
      } else {
        setUpdate(false);
        setPlan([]);
      }
    }
    loadPlan();
  }, [id]);

  useEffect(() => {
    function calculatePriceTotal() {
      setPriceTotal(plan.duration * plan.price);
    }

    calculatePriceTotal();
  }, [plan.duration, plan.price]);

  async function createPlan({ title, duration, price }) {
    try {
      await api.post('plans', {
        title,
        duration,
        price,
      });

      toast.success('Registro cadastrado com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updatePlan({ title, duration, price }) {
    try {
      await api.put(`plans/${id}`, {
        title,
        duration,
        price,
      });

      toast.success('Registro atualizado com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container max-width="900px">
      <Form
        initialData={plan}
        schema={schema}
        onSubmit={update ? updatePlan : createPlan}
      >
        <SubHeader>
          <SubHeaderTitle>
            {update ? 'Edição de plano' : 'Cadastro de plano'}
          </SubHeaderTitle>
          <div>
            <PrimaryButton
              type="button"
              background="#ccc"
              width="112px"
              onClick={() => history.push('/plans')}
            >
              <MdKeyboardArrowLeft color="#fff" size={20} />
              VOLTAR
            </PrimaryButton>
            <Divider />
            <PrimaryButton type="submit" width="112px">
              <MdDone color="#fff" size={20} />
              SALVAR
            </PrimaryButton>
          </div>
        </SubHeader>
        <Content>
          <FormContent>
            <ul>
              <li>
                <strong>TÍTULO DO PLANO</strong>
                <Input name="title" type="text" />
              </li>
            </ul>
            <ul>
              <li>
                <strong>DURAÇÃO (em meses)</strong>
                <Input
                  name="duration"
                  type="number"
                  onChange={e =>
                    setPlan({
                      ...plan,
                      duration: e.target.value,
                    })
                  }
                />
              </li>
              <li>
                <strong>PREÇO MENSAL</strong>
                <Input
                  name="price"
                  type="number"
                  onChange={e =>
                    setPlan({
                      ...plan,
                      price: e.target.value,
                    })
                  }
                />
              </li>
              <li>
                <strong>PREÇO TOTAL</strong>
                <Input
                  name="priceTotal"
                  type="number"
                  value={priceTotal || ''}
                  disabled
                />
              </li>
            </ul>
          </FormContent>
        </Content>
      </Form>
    </Container>
  );
}
