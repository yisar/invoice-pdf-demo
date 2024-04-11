import { Text } from '@react-pdf/renderer'
import compose from '../styles/compose'


const EditableInput = ({ className, value, pdfMode }:any) => {
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
