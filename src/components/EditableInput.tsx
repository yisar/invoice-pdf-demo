import { FC } from 'react'
import { Text } from '@react-pdf/renderer'
import compose from '../styles/compose'

interface Props {
  className?: string
  placeholder?: string
  value?: string
  onChange?: (value: string) => void
  pdfMode?: boolean
}

const EditableInput: FC<Props> = ({ className, placeholder, value, onChange, pdfMode }) => {
  return (
    <>
      {pdfMode ? (
        <Text style={compose('span ' + (className ? className : ''))}>{value}</Text>
      ) : (
        <div
          className={'span ' + (className ? className : '')}
        >{value}</div>
      )}
    </>
  )
}

export default EditableInput
