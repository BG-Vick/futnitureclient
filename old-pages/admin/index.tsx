import React, { useState } from 'react'
import { useActions } from '@/hooks/redux'
import { Form } from '@/components/Form';
import { useTypedSelector } from '@/hooks/useTypedSelector';
import { AuthForm } from '@/components/AuthForm';
  


export default function Admin() {
  const user = useTypedSelector((state) => state.user)

  
  
  return (
    <>
    <AuthForm/>
    </>

  )
}
