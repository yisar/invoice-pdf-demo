import { useState, useEffect } from 'react'
import { Font, PDFDownloadLink, Document as PdfDocument, Page as PdfPage, Text as PdfText, View as PdfView } from '@react-pdf/renderer'
import { format } from 'date-fns/format'
import compose from './compose'

Font.register({
  family: 'Nunito',
  fonts: [
    { src: 'https://fonts.gstatic.com/s/nunito/v12/XRXV3I6Li01BKofINeaE.ttf' },
    {
      src: 'https://fonts.gstatic.com/s/nunito/v12/XRXW3I6Li01BKofA6sKUYevN.ttf',
      fontWeight: 600,
    },
  ],
})

const Document = ({ pdfMode, children }: any) => {
  return <>{pdfMode ? <PdfDocument>{children}</PdfDocument> : <>{children}</>}</>
}

const Text2 = ({ className, value, pdfMode }: any) => {
  return (
    <>
      {pdfMode ? (
        <PdfText style={compose('span ' + (className ? className : ''))}>{value}</PdfText>
      ) : (
        <div
          className={'span ' + (className ? className : '')}
        >{value}</div>
      )}
    </>
  )
}

const Text = ({ className, pdfMode, children }: any) => {
  return (
    <>
      {pdfMode ? (
        <PdfText style={compose('span ' + (className ? className : ''))}>{children}</PdfText>
      ) : (
        <span className={'span ' + (className ? className : '')}>{children}</span>
      )}
    </>
  )
}

const View = ({ className, pdfMode, children }: any) => {
  return (
    <>
      {pdfMode ? (
        <PdfView style={compose('view ' + (className ? className : ''))}>{children}</PdfView>
      ) : (
        <div className={'view ' + (className ? className : '')}>{children}</div>
      )}
    </>
  )
}

const Page = ({ className, pdfMode, children }: any) => {
  return (
    <>
      {pdfMode ? (
        <PdfPage size="A4" style={compose('page ' + (className ? className : ''))}>
          {children}
        </PdfPage>
      ) : (
        <div className={'page ' + (className ? className : '')}>{children}</div>
      )}
    </>
  )
}

const Download = ({ data }: any) => {

  const title = data.invoiceTitle ? data.invoiceTitle.toLowerCase() : 'invoice'
  return (
    <div className={'download-pdf '}>
      <PDFDownloadLink
        key="pdf"
        document={<InvoicePage pdfMode={true} data={data} />}
        fileName={`${title}.pdf`}
        aria-label="Save PDF"
        title="Save PDF"
        className="download-pdf__pdf"
      ><p>Save PDF</p>
      </PDFDownloadLink>
    </div>
  )
}

const InvoicePage = ({ data, pdfMode, onChange }: any) => {
  const [invoice, setInvoice] = useState(data as any)
  const [subTotal, setSubTotal] = useState(0)
  const [saleTax, setSaleTax] = useState(0)

  const dateFormat = 'MMM dd, yyyy'
  const invoiceDate = invoice.invoiceDate !== '' ? new Date(invoice.invoiceDate) : new Date()
  const invoiceDueDate =
    invoice.invoiceDueDate !== ''
      ? new Date(invoice.invoiceDueDate)
      : new Date(invoiceDate.valueOf())

  if (invoice.invoiceDueDate === '') {
    invoiceDueDate.setDate(invoiceDueDate.getDate() + 30)
  }

  const calculateAmount = (quantity: string, rate: string) => {
    const quantityNumber = parseFloat(quantity)
    const rateNumber = parseFloat(rate)
    const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

    return amount.toFixed(2)
  }

  useEffect(() => {
    let subTotal = 0

    invoice.productLines.forEach((productLine: any) => {
      const quantityNumber = parseFloat(productLine.quantity)
      const rateNumber = parseFloat(productLine.rate)
      const amount = quantityNumber && rateNumber ? quantityNumber * rateNumber : 0

      subTotal += amount
    })

    setSubTotal(subTotal)
  }, [invoice.productLines])

  useEffect(() => {
    const match = invoice.taxLabel.match(/(\d+)%/)
    const taxRate = match ? parseFloat(match[1]) : 0
    const saleTax = subTotal ? (subTotal * taxRate) / 100 : 0

    setSaleTax(saleTax)
  }, [subTotal, invoice.taxLabel])

  useEffect(() => {
    if (onChange) {
      onChange(invoice)
    }
  }, [onChange, invoice])

  return (
    <Document pdfMode={pdfMode}>
      <Page className="invoice-wrapper" pdfMode={pdfMode}>
        {!pdfMode && <Download data={invoice} setData={(d: any) => setInvoice(d)} />}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50" pdfMode={pdfMode}>
            <Text2
              className="fs-20 bold"
              placeholder="Your Company"
              value={invoice.companyName}
              pdfMode={pdfMode}
            />
            <Text2
              placeholder="Your Name"
              value={invoice.name}
              pdfMode={pdfMode}
            />
            <Text2
              placeholder="Company's Address"
              value={invoice.companyAddress}
              pdfMode={pdfMode}
            />
            <Text2
              placeholder="City, State Zip"
              value={invoice.companyAddress2}
              pdfMode={pdfMode}
            />
            <Text2
              value={invoice.companyCountry}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-50" pdfMode={pdfMode}>
            <Text2
              className="fs-45 right bold"
              placeholder="Invoice"
              value={invoice.title}
              pdfMode={pdfMode}
            />
          </View>
        </View>

        <View className="flex mt-40" pdfMode={pdfMode}>
          <View className="w-55" pdfMode={pdfMode}>
            <Text2
              className="bold dark mb-5"
              value={invoice.billTo}
              pdfMode={pdfMode}
            />
            <Text2
              placeholder="Your Client's Name"
              value={invoice.clientName}
              pdfMode={pdfMode}
            />
            <Text2
              placeholder="Client's Address"
              value={invoice.clientAddress}
              pdfMode={pdfMode}
            />
            <Text2
              placeholder="City, State Zip"
              value={invoice.clientAddress2}
              pdfMode={pdfMode}
            />
            <Text2
              value={invoice.clientCountry}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-45" pdfMode={pdfMode}>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text2
                  className="bold"
                  value={invoice.invoiceTitleLabel}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text2
                  placeholder="INV-12"
                  value={invoice.invoiceTitle}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text2
                  className="bold"
                  value={invoice.invoiceDateLabel}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text2
                  value={format(invoiceDate, dateFormat)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
            <View className="flex mb-5" pdfMode={pdfMode}>
              <View className="w-40" pdfMode={pdfMode}>
                <Text2
                  className="bold"
                  value={invoice.invoiceDueDateLabel}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-60" pdfMode={pdfMode}>
                <Text2
                  value={format(invoiceDueDate, dateFormat)}
                  pdfMode={pdfMode}
                />
              </View>
            </View>
          </View>
        </View>

        <View className="mt-30 bg-dark flex" pdfMode={pdfMode}>
          <View className="w-48 p-4-8" pdfMode={pdfMode}>
            <Text2
              className="white bold"
              value={invoice.productLineDescription}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text2
              className="white bold right"
              value={invoice.productLineQuantity}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-17 p-4-8" pdfMode={pdfMode}>
            <Text2
              className="white bold right"
              value={invoice.productLineQuantityRate}
              pdfMode={pdfMode}
            />
          </View>
          <View className="w-18 p-4-8" pdfMode={pdfMode}>
            <Text2
              className="white bold right"
              value={invoice.productLineQuantityAmount}
              pdfMode={pdfMode}
            />
          </View>
        </View>

        {invoice.productLines.map((productLine: any, i: number) => {
          return pdfMode && productLine.description === '' ? (
            <Text key={i}></Text>
          ) : (
            <View key={i} className="row flex" pdfMode={pdfMode}>
              <View className="w-48 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text2
                  className="dark"
                  placeholder="Enter item name/description"
                  value={productLine.description}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text2
                  className="dark right"
                  value={productLine.quantity}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-17 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text2
                  className="dark right"
                  value={productLine.rate}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-18 p-4-8 pb-10" pdfMode={pdfMode}>
                <Text className="dark right" pdfMode={pdfMode}>
                  {calculateAmount(productLine.quantity, productLine.rate)}
                </Text>
              </View>
            </View>
          )
        })}

        <View className="flex" pdfMode={pdfMode}>
          <View className="w-50 mt-10" pdfMode={pdfMode}>
          </View>
          <View className="w-50 mt-20" pdfMode={pdfMode}>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text2
                  value={invoice.subTotalLabel}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {subTotal?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex" pdfMode={pdfMode}>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text2
                  value={invoice.taxLabel}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text className="right bold dark" pdfMode={pdfMode}>
                  {saleTax?.toFixed(2)}
                </Text>
              </View>
            </View>
            <View className="flex bg-gray p-5" pdfMode={pdfMode}>
              <View className="w-50 p-5" pdfMode={pdfMode}>
                <Text2
                  className="bold"
                  value={invoice.totalLabel}
                  pdfMode={pdfMode}
                />
              </View>
              <View className="w-50 p-5 flex" pdfMode={pdfMode}>
                <Text2
                  className="dark bold right ml-30"
                  value={invoice.currency}
                  pdfMode={pdfMode}
                />
                <Text className="right bold dark w-auto" pdfMode={pdfMode}>
                  {(typeof subTotal !== 'undefined' && typeof saleTax !== 'undefined'
                    ? subTotal + saleTax
                    : 0
                  ).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-20" pdfMode={pdfMode}>
          <Text2
            className="bold w-100"
            value={invoice.termLabel}
            pdfMode={pdfMode}
          />
          <Text2
            className="w-100"
            value={invoice.term}
            pdfMode={pdfMode}
          />
        </View>
      </Page>
    </Document>
  )
}

export default InvoicePage
