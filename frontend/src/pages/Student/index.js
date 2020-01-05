import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { MdAdd, MdSearch } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import { Table, TableColumn, TableRow } from '~/components/Table';
import { Divider } from '~/components/Divider';

export default function Student() {
  const [students, setStudents] = useState([]);
  const [name, setName] = useState('');

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students', {
        params: {
          name,
        },
      });

      setStudents(response.data);
    }

    loadStudents();
  }, [name]);

  async function deleteStudent(id) {
    try {
      await api.delete(`students/${id}`);

      setStudents(students.filter(student => student.id !== id));

      toast.success('Registro excluído com sucesso!');
    } catch (_) {
      toast.error('Não foi possível realizar esta operação!');
    }
  }

  return (
    <Container max-width="900px">
      <SubHeader>
        <SubHeaderTitle>Gerenciando alunos</SubHeaderTitle>
        <div>
          <PrimaryButton
            onClick={() => history.push('/students/new')}
            width="142px"
          >
            <MdAdd color="#fff" size={20} />
            <span>CADASTRAR</span>
          </PrimaryButton>
          <Divider />
          <span>
            <MdSearch
              color="#999999"
              size={16}
              visibility={name === '' ? 'visible' : 'hidden'}
            />
            <input
              type="text"
              placeholder="Buscar aluno"
              onChange={e => setName(e.target.value)}
            />
          </span>
        </div>
      </SubHeader>
      <Table>
        <thead>
          <tr>
            <TableColumn text-align="left">NOME</TableColumn>
            <TableColumn text-align="left">E-MAIL</TableColumn>
            <TableColumn>IDADE</TableColumn>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <TableRow text-align="left">{student.name}</TableRow>
              <TableRow text-align="left">{student.email}</TableRow>
              <TableRow>{student.age}</TableRow>
              <TableRow text-align="right" max-width="60px">
                <div>
                  <SecondaryButton
                    color="#4D85EE"
                    onClick={() => history.push(`students/${student.id}/edit`)}
                  >
                    editar
                  </SecondaryButton>
                  <Divider />
                  <SecondaryButton
                    color="#DE3B3B"
                    onClick={() => deleteStudent(student.id)}
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
