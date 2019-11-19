import React from 'react';
import { useSelector } from 'react-redux';

import { Link } from 'react-router-dom';

import { Container, Content, Profile } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);

  return (
    <Container>
      <Content>
        <nav>
          {/* <img src="" alt="Gympoint" /> */}
          <Link to="/">ALUNOS</Link>
          <Link to="/">PLANOS</Link>

          <Link to="/">MATRÍCULAS</Link>
          <Link to="/">PEDIDOS DE AUXÍLIO</Link>
        </nav>

        <aside>
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <Link to="/">sair do sistema</Link>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
