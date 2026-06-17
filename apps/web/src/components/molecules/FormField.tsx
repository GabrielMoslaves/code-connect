import { type InputHTMLAttributes } from 'react'
import { Label } from '../atoms/Label'
import { Input } from '../atoms/Input'

type FormFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string
  name: string
}

export function FormField({ label, name, id, ...props }: FormFieldProps) {
  const fieldId = id ?? name
  return (
    <div className="flex flex-col">
      <Label htmlFor={fieldId}>{label}</Label>
      <Input id={fieldId} name={name} {...props} />
    </div>
  )
}
