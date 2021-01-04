import React, { createContext, useCallback, useContext, useState } from 'react'
import { v4 as uuid } from 'uuid'
import ToastContainer from '../components/ToastContainer'

export interface ToastMessage {
  id: string
  type?: 'success' | 'error' | 'info'
  title: string
  description?: string
}

interface ToastContextData {
  addToast(message: Omit<ToastMessage, 'id'>): void
  removeToast(id: string): void
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData)

const ToastProvider: React.FC = ({ children }) => {
  const [toasts, setToasts] = useState<ToastMessage[]>([])

  const addToast = useCallback((message: Omit<ToastMessage, 'id'>) => {
    const id = uuid()

    const toast = {
      id,
      ...message
    }

    setToasts(previousValue => [...previousValue, toast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts(toasts => toasts.filter(toast => toast.id !== id))
  }, [])

  return (
    <ToastContext.Provider value={{ addToast, removeToast }}>
      {children}

      <ToastContainer toasts={toasts} />
    </ToastContext.Provider>
  )
}

function useToast(): ToastContextData {
  const context = useContext(ToastContext)

  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }

  return context
}

export { ToastProvider, useToast }
