import React from 'react'
import { useTransition } from 'react-spring'
import { ToastMessage } from '../../hooks/ToastContext'
import Toast from './Toast'
import { Container } from './styles'

interface ToastContainerProps {
  toasts: ToastMessage[]
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts }) => {
  const toastsWithTransitions = useTransition(toasts, toast => toast.id, {
    from: { right: '-120%', opacity: 0 },
    enter: { right: '0%', opacity: 1 },
    leave: { right: '-120%', opacity: 0 }
  })

  return (
    <Container>
      {toastsWithTransitions
        .filter(({ item }) => item)
        .map(({ item, key, props }) => (
          <Toast key={key} toast={item} style={props} />
        ))}
    </Container>
  )
}

export default ToastContainer
