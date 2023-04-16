import React from 'react'
import { useForm } from 'react-hook-form'

type FormData = {
  inputField: string
}

const MyForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onChange',
  })

  const onSubmit = (data: FormData) => {
    alert(`送信した内容: ${data.inputField}`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="inputField">Input Field:</label>
      <input
        id="inputField"
        type="text"
        {...register('inputField', {
          required: 'This field is required',
          maxLength: {
            value: 5,
            message: 'Input should be 5 characters or less',
          },
        })}
      />
      {errors.inputField && (
        <p className="error-message">{errors.inputField.message}</p>
      )}

      <button type="submit">Submit</button>
    </form>
  )
}

export default MyForm
