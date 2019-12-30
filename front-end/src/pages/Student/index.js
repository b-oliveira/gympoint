import React, { useState, useEffect } from 'react';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import history from '~/services/history';

import { Container } from '~/components/Container';
import { SubHeader, SubHeaderTitle } from '~/components/SubHeader';
import { PrimaryButton, SecondaryButton } from '~/components/Button';
import { Table, TableColumn, TableRow } from '~/components/Table';
import { Divider } from '~/components/Divider';

export default function Student() {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudents(response.data);
    }

    loadStudents();
  }, []);

  return (
    <Container max-width="900px">
      <SubHeader>
        <SubHeaderTitle>Gerenciando alunos</SubHeaderTitle>
        <PrimaryButton
          onClick={() => history.push('/students/new')}
          width="142px"
        >
          <MdAdd color="#fff" size={20} />
          <span>CADASTRAR</span>
        </PrimaryButton>
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
