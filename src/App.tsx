import InvoicePage from './components/InvoicePage'
export const initialInvoice = {
  title: 'INVOICE',
  companyName: 'Arcblock',
  name: 'arcblock',
  companyAddress: '111',
  companyAddress2: '222',
  companyCountry: 'United States',
  billTo: 'Bill To:',
  clientName: '333',
  clientAddress: '444',
  clientAddress2: '555',
  clientCountry: 'United States',
  invoiceTitleLabel: 'Invoice#',
  invoiceTitle: '666666',
  invoiceDateLabel: 'Invoice Date',
  invoiceDate: '111',
  invoiceDueDateLabel: 'Due Date',
  invoiceDueDate: '22222',
  productLineDescription: 'Item Description',
  productLineQuantity: 'Qty',
  productLineQuantityRate: 'Rate',
  productLineQuantityAmount: 'Amount',
  productLines: [
    {
      description: 'Brochure Design',
      quantity: '2',
      rate: '100.00',
    },
  ],
  subTotalLabel: 'Sub Total',
  taxLabel: 'Sale Tax (10%)',
  totalLabel: 'TOTAL',
  currency: '$',
  termLabel: 'Terms & Conditions',
  term: 'Please make the payment by the due date.',
}

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
