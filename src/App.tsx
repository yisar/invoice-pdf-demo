import InvoicePage from './components/InvoicePage'
import {initialInvoice} from './data/initialData'

function App() {
  let data = initialInvoice

  return (
    <div className="app">
      <h1 className="center fs-30">React Invoice Generator</h1>
      <InvoicePage data={data} />
    </div>
  )
}

export default App
