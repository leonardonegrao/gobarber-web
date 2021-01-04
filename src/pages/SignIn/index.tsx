import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiLogIn, FiMail, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import { useAuth } from '../../hooks/AuthContext'
import { useToast } from '../../hooks/ToastContext'
import getValidationErrors from '../../utils/getValidationErrors'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'

interface SignInFormData {
  email: string
  password: string
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const history = useHistory()

  const auth = useAuth()
  const toast = useToast()

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().required('Senha é obrigatória')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await auth.signIn({
          email: data.email,
          password: data.password
        })

        history.push('/dashboard')
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)
        }

        toast.addToast({
          type: 'error',
          title: 'Erro na autenticação',
          description:
            'Ocorreu um erro ao tentar seu login. Cheque suas credenciais.'
        })
      }
    },
    [auth, toast, history]
  )

  return (
    <Container>
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
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
        </Form>

        <Link to="/signup">
          <FiLogIn />
          Criar conta
        </Link>
      </Content>
      <Background />
    </Container>
  )
}

export default SignIn
