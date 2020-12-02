import React from 'react'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'

const SignIn: React.FC = () => {
  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <form>
          <h1>Faça seu logon</h1>

          <Input name="email" placeholder="E-mail" type="email" icon={FiMail} />
          <Input
            name="password"
            placeholder="Senha"
            type="password"
            icon={FiLock}
          />

          <Button>Entrar</Button>

          <a href="/forgot">Esqueci minha senha</a>
        </form>

        <a href="">
          <FiLogIn />
          Criar conta
        </a>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
