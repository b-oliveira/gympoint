import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import { MdKeyboardArrowLeft, MdDone } from 'react-icons/md';
import * as Yup from 'yup';
import { parseISO } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';

import { Container, Content } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton } from '~/components/Button';
import { Divider } from '~/components/Divider';
import { FormContent } from '~/components/FormContent';
import DatePicker from '~/components/DatePicker';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome é obrigatório.'),
  email: Yup.string()
    .email('Insira um e-mail válido')
    .required('O e-mail é obrigatório'),
  birth_date: Yup.date().required('A data de nascimento é obrigatório.'),
  weight: Yup.number()
    .typeError('O valor é inválido.')
    .positive('O valor deve ser positivo.')
    .required('O peso é obrigatório.'),
  height: Yup.number()
    .typeError('O valor é inválido.')
    .positive('O valor deve ser positivo.')
    .required('A altura é obrigatório.'),
});

export default function StudentForm() {
  const [student, setStudent] = useState([]);
  const [update, setUpdate] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    async function loadPlan() {
      if (id) {
        try {
          const { data } = await api.get(`students/${id}`);

          setUpdate(true);
          setStudent({
            ...data,
            birth_date: parseISO(data.birth_date),
          });
        } catch (err) {
          toast.error(err.response.data.error);
          history.push('/students');
        }
      } else {
        setUpdate(false);
        setStudent([]);
      }
    }
    loadPlan();
  }, [id]);

  async function createStudent({ name, email, birth_date, weight, height }) {
    try {
      await api.post('students', {
        name,
        email,
        birth_date,
        weight,
        height,
      });

      toast.success('Registro cadastrado com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  async function updateStudent({ name, email, birth_date, weight, height }) {
    try {
      await api.put(`students/${id}`, {
        name,
        email,
        birth_date,
        weight,
        height,
      });

      toast.success('Registro atualizado com sucesso!');
    } catch (err) {
      toast.error(err.response.data.error);
    }
  }

  return (
    <Container max-width="900px">
      <Form
        initialData={student}
        schema={schema}
        onSubmit={update ? updateStudent : createStudent}
      >
        <SubHeader>
          <SubHeaderTitle>
            {update ? 'Edição de aluno' : 'Cadastro de aluno'}
          </SubHeaderTitle>
          <div>
            <PrimaryButton
              type="button"
              background="#ccc"
              width="112px"
              onClick={() => history.push('/students')}
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
                <strong>NOME COMPLETO</strong>
                <Input name="name" type="text" />
              </li>
            </ul>
            <ul>
              <li>
                <strong>ENDEREÇO DE E-MAIL</strong>
                <Input name="email" type="email" />
              </li>
            </ul>
            <ul>
              <li>
                <strong>DATA DE NASCIMENTO</strong>
                <DatePicker
                  name="birth_date"
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Escolha a data"
                  selected={student.birth_date}
                  onChange={date =>
                    setStudent({
                      ...student,
                      birth_date: date,
                    })
                  }
                />
              </li>
              <li>
                <strong>PESO (em kg)</strong>
                <Input
                  name="weight"
                  type="number"
                  onChange={e =>
                    setStudent({
                      ...student,
                      weight: e.target.value,
                    })
                  }
                />
              </li>
              <li>
                <strong>ALTURA</strong>
                <Input
                  name="height"
                  type="number"
                  onChange={e =>
                    setStudent({
                      ...student,
                      height: e.target.value,
                    })
                  }
                />
              </li>
            </ul>
          </FormContent>
        </Content>
      </Form>
    </Container>
  );
}
