import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { addMonths, parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
// import AsyncSelect from 'react-select/async';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton } from '~/components/Button';
import { Divider } from '~/components/Divider';
import { FormContent } from '~/components/FormContent';
import AsyncSelect from '~/components/AsyncSelect';
import DatePicker from '~/components/DatePicker';

const schema = Yup.object().shape({
  student: Yup.mixed().required('Selecione o estudante.'),
  plan: Yup.mixed().required('Selecione o plano.'),
  start_date: Yup.date()
    .typeError('Informe a data.')
    .required('Informe a data.'),
});

export default function Subscription({ match }) {
  console.tron.log(match);
  const [subscription, setSubscription] = useState({});
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    async function loadSubscription() {
      const { id } = match.params;

      if (id) {
        try {
          const { data } = await api.get(`subscriptions/${id}`);

          console.tron.log(data);

          setUpdate(true);
          setSubscription({
            ...data,
            start_date: parseISO(data.start_date),
            end_date: parseISO(data.end_date),
          });
        } catch (err) {
          toast.error(err.response.data.error);
          history.push('/subscriptions');
        }
      } else {
        setUpdate(false);
      }
    }

    loadSubscription();
  }, [match.params]);

  function calculatePriceTotal(duration, price) {
    console.tron.log(`calculatePriceTotal: ${duration} * ${price}`);

    if (duration && price) return duration * price;

    return null;
  }

  function calculateEndDate(start_date, duration) {
    console.tron.log(`calculateEndDate: ${start_date} ${duration}`);

    if (start_date && duration) {
      return addMonths(start_date, duration);
    }

    return null;
  }

  function changeStudent({ id, name }) {
    setSubscription({
      ...subscription,
      student: {
        id,
        name,
      },
    });
  }

  function changePlan({ id, title, duration, price }) {
    const { start_date } = subscription;

    setSubscription({
      ...subscription,
      plan: {
        id,
        title,
        duration,
        price,
      },
      end_date: calculateEndDate(start_date, duration),
      price: calculatePriceTotal(duration, price),
    });
  }

  function changeStartDate(start_date) {
    console.tron.log(start_date);
    const { duration } = subscription.plan || {};

    setSubscription({
      ...subscription,
      start_date,
      end_date: calculateEndDate(start_date, duration),
    });
  }

  async function loadStudents(name) {
    const { data } = await api.get('students', {
      params: {
        name,
      },
    });

    console.tron.log(data);

    return data;
  }

  async function loadPlans() {
    const { data } = await api.get('plans');

    console.tron.log(data);

    return data;
  }

  async function createSubscription({ student, plan, start_date }) {
    try {
      await api.post('subscriptions', {
        plan_id: plan.id,
        student_id: student.id,
        start_date,
      });

      toast.success('Registro cadastrado com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updateSubscription({ student, plan, start_date }) {
    try {
      const { id } = match.params;

      await api.put(`subscriptions/${id}`, {
        plan_id: plan.id,
        student_id: student.id,
        start_date,
      });

      toast.success('Registro atualizado com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container max-width="900px">
      <Form
        initialData={subscription}
        schema={schema}
        onSubmit={update ? updateSubscription : createSubscription}
      >
        <SubHeader>
          <SubHeaderTitle>
            {update ? 'Edição de matrícula' : 'Cadastro de matrícula'}
          </SubHeaderTitle>
          <div>
            <PrimaryButton
              type="button"
              background="#ccc"
              width="112px"
              onClick={() => history.push('/subscriptions')}
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
                <strong>ALUNO</strong>
                <AsyncSelect
                  name="student"
                  placeholder="Buscar aluno"
                  loadOptions={loadStudents}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.name}
                  value={subscription.student}
                  onChange={changeStudent}
                />
              </li>
            </ul>
            <ul>
              <li>
                <strong>PLANO</strong>
                <AsyncSelect
                  name="plan"
                  placeholder="Selecione o plano"
                  loadOptions={loadPlans}
                  defaultOptions
                  isSearchable={false}
                  getOptionValue={option => option.id}
                  getOptionLabel={option => option.title}
                  value={subscription.plan}
                  onChange={changePlan}
                />
              </li>
              <li>
                <strong>DURAÇÃO DE INÍCIO</strong>
                <DatePicker
                  name="start_date"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Escolha a data"
                  selected={subscription.start_date}
                  onChange={changeStartDate}
                />
              </li>
              <li>
                <strong>DATA DE TÉRMINO</strong>
                <DatePicker
                  name="end_date"
                  dateFormat="dd/MM/yyyy"
                  selected={subscription.end_date}
                  disabled
                />
              </li>
              <li>
                <strong>VALOR FINAL</strong>
                <Input name="price" type="number" disabled />
              </li>
            </ul>
          </FormContent>
        </Content>
      </Form>
    </Container>
  );
}
