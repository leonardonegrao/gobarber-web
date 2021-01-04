import React, { useCallback, useRef } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { FiArrowLeft, FiMail, FiUser, FiLock } from 'react-icons/fi'
import { FormHandles } from '@unform/core'
import { Form } from '@unform/web'
import * as Yup from 'yup'
import getValidationErrors from '../../utils/getValidationErrors'
import api from '../../services/api'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { useToast } from '../../hooks/ToastContext'
import { Container, Content, Background } from './styles'

import logo from '../../assets/logo.svg'

interface SignUpFormData {
  name: string
  email: string
  password: string
}

const SignUp: React.FC = () => {
  const formRef = useRef<FormHandles>(null)
  const toast = useToast()
  const history = useHistory()

  const handleSubmit = useCallback(
    async (data: SignUpFormData) => {
      try {
        formRef.current?.setErrors({})

        const schema = Yup.object().shape({
          name: Yup.string().required('Nome é obrigatório'),
          email: Yup.string()
            .email('Digite um e-mail válido')
            .required('E-mail é obrigatório'),
          password: Yup.string().min(8, 'A senha deve ter pelo menos 8 digitos')
        })

        await schema.validate(data, {
          abortEarly: false
        })

        await api.post('/users', data)

        history.push('/')

        toast.addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu login no GoBarber.'
        })
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err)

          formRef.current?.setErrors(errors)

          return
        }

        toast.addToast({
          type: 'error',
          title: 'Erro no cadastro',
          description: 'Ocorreu um erro no cadastro, por favor tente novamente.'
        })
      }
    },
    [toast, history]
  )

  return (
    <Container>
      <Background />
      <Content>
        <img src={logo} alt="GoBarber" />

        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu cadastro</h1>

          <Input name="name" placeholder="Nome" type="text" icon={FiUser} />
          <Input name="email" placeholder="E-mail" type="email" icon={FiMail} />
          <Input
            name="password"
            placeholder="Senha"
            type="password"
            icon={FiLock}
          />

          <Button>Cadastrar</Button>
        </Form>

        <Link to="/">
          <FiArrowLeft />
          Voltar para logon
        </Link>
      </Content>
    </Container>
  )
}

export default SignUp
