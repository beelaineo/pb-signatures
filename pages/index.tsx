import * as React from 'react'
//useSWR allows the use of SWR inside function components
import useSWR from 'swr'
import CopyToClipboard from 'react-copy-html-to-clipboard'
const { useRef, useState } = React

const Signature = ({ signature }) => {
  const [clipboardText, setClipboardText] = useState('')
  const [copied, setCopied] = useState(false)
  const signatureHTML = useRef<HTMLDivElement>(null)

  const renderEmailSignature = (html) => {
    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html><head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    </head>
    <body style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">${html}</body></html>`
  }

  const updateText = () => {
    console.log(renderEmailSignature(signatureHTML.current?.outerHTML))
    setClipboardText(renderEmailSignature(signatureHTML.current?.outerHTML))
    setCopied(true)
  }

  return (
  <>
  <div ref={signatureHTML} style={{ margin: 30, padding: 20, border: '1px solid #e1e1e1', fontFamily: '"Gill Sans", "Gill Sans MT", Helvetica, Arial, sans-serif' }}>
    {/* <div className='desktop-view'>
    <table cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td style={{verticalAlign: 'top'}}>
            <span style={{fontWeight: 600, fontSize: '10px', lineHeight: '10px'}}>{signature.name}</span><br /><br />
            <div className='meta' style={{fontWeight: 400, fontSize: '8.5px', lineHeight: '11.5px'}}>
              <span>{signature.role}</span>
              {signature.phone && (
              <>
                <br />
                <span>{signature.phone_label} <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:${signature.phone.replace(/\s/g, '')}`}>{signature.phone}</a></span>
              </>
              )}
              <br />
              <a style={{color: '#000', lineHeight: '10px', textDecoration: 'unset'}} href="https://www.photobombproduction.com/" target="_blank">photobombproduction.com</a>
            </div>
          </td>
          <td style={{verticalAlign: 'top'}}>
            <div style={{fontWeight: 300, fontSize: '7.5px', lineHeight: '10px', borderLeft: '0.5px solid #000', marginLeft: 16, paddingLeft: 16}}>
              <span style={{fontWeight: 600, color: '#000', textDecoration: 'unset'}}>Photobomb Production NYC</span><br />
              <span>360</span> <span>W</span> <span>34</span> <span>St</span> <span>Suite 8R</span><br />
              <span>New</span> <span>York,</span> <span>NY</span> <span>10001</span><br />
              Office: <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:+16464775559`}>+1 646 477 5559</a><br /><br /><br />
              <div style={{marginBottom: '5px'}} className="insta-link">
                <img style={{marginBottom: '-2px'}} alt="Instagram" height="8" src="https://github.com/beelaineo/pb-signatures/blob/main/assets/insta.png?raw=true" />
                <a style={{color: '#000', textDecoration: 'unset', paddingLeft: 2}} href="https://instagram.com/photobombproduction" target="_blank">photobombproduction</a>
              </div>
            </div>
          </td>
          <td style={{verticalAlign: 'top'}}>
            <div style={{fontWeight: 300, fontSize: '7.5px', lineHeight: '10px', paddingLeft: 16}}>
              <span style={{fontWeight: 600, color: '#000', textDecoration: 'unset'}}>Photobomb Production LA</span><br />
              <span>12030</span> <span>Viewcrest</span> <span>Road</span><br />
              <span>Studio</span> <span>City,</span> <span>CA</span> <span>91604</span><br />
              Office: <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:+13235405700`}>+1 323 540 5700</a><br /><br />
              <span style={{fontWeight: 600}}>Invoicing</span><br />
              <a style={{color: '#000', textDecoration: 'unset'}} href="mailto:invoices@photobombproduction.com" target="_blank">invoices@photobombproduction.com</a>
            </div>
          </td>
          <td style={{verticalAlign: 'top'}}>
            <div style={{fontWeight: 300, fontSize: '7.5px', lineHeight: '10px', paddingLeft: 0}}>
              <span style={{fontWeight: 600, color: '#000', textDecoration: 'unset'}}>Photobomb Production LDN</span><br />
              <span>15</span> <span>Poland</span> <span>St</span><br />
              <span>London,</span> <span>WIF 8QE</span><br />
              Office: <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:+442079936051`}>+44 20 7993 6051</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div> */}
    <div className='mobile-view'>
    <table cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td style={{paddingRight: 16, verticalAlign: 'top'}}>
            <span style={{fontWeight: 600, fontSize: '10px', lineHeight: '10px'}}>{signature.name}</span><br /><br />
            <div className='meta' style={{fontWeight: 400, fontSize: '8.5px', lineHeight: '12px'}}>
              <span>{signature.role}</span>
              {signature.phone && (
              <>
                <br />
                <span>{signature.phone_label} <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:${signature.phone.replace(/\s/g, '')}`}>{signature.phone}</a></span>
              </>
              )}<br />
              <a style={{color: '#000', lineHeight: '10px', textDecoration: 'unset'}} href="https://www.photobombproduction.com/" target="_blank">photobombproduction.com</a>
              {!signature.phone && (<br />)}
              <br /><br /><br /><br />
              <div style={{marginBottom: '5px'}} className="insta-link">
                <img style={{marginBottom: '-2px'}} alt="Instagram" height="8" src="https://github.com/beelaineo/pb-signatures/blob/main/assets/insta.png?raw=true" />
                <a style={{color: '#000', textDecoration: 'unset', paddingLeft: 2, fontWeight: 300}} href="https://instagram.com/photobombproduction" target="_blank">photobombproduction</a>
              </div>
              <span style={{fontWeight: 600}}>Invoicing</span><br />
              <a style={{color: '#000', textDecoration: 'unset', fontWeight: 300}} href="mailto:invoices@photobombproduction.com" target="_blank">invoices@photobombproduction.com</a>
            </div>
          </td>
          <td style={{fontWeight: 300, fontSize: '7.5px', lineHeight: '10px', borderLeft: '0.5px solid #000', paddingTop: 5, paddingLeft: 16, verticalAlign: 'top'}}>
            <div style={{fontWeight: 300, fontSize: '7.5px', lineHeight: '10px'}}>
              <span style={{fontWeight: 600}}>Photobomb Production NYC</span><br />
              <span>360</span> <span>W</span> <span>34</span> <span>St</span> <span>Suite 8R</span><br />
              <span>New</span> <span>York,</span> <span>NY</span> <span>10001</span><br />
              Office: <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:+16464775559`}>+1 646 477 5559</a><br /><span style={{lineHeight: '12px'}}><br /></span>
            </div>
            <div style={{fontWeight: 300, fontSize: '7.5px', lineHeight: '10px'}}>
              <span style={{fontWeight: 600}}><span>Photobomb</span> <span>Production</span> <span>L</span><span>A</span></span><br />
              <span>12030</span> <span>Viewcrest</span> Road<br />
              <span>Studio</span> <span>City,</span> <span>CA</span> <span>91604</span><br />
              Office: <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:+13235405700`}>+1 323 540 5700</a><br /><span style={{lineHeight: '12px'}}><br /></span>
            </div>
            <div style={{fontWeight: 300, fontSize: '7.5px', lineHeight: '10px', paddingBottom: 5}}>
              <span style={{fontWeight: 600}}>Photobomb Production LDN</span><br />
              <span>15</span> <span>Poland</span> St<br />
              <span>London,</span> <span>WIF</span> <span>8QE</span><br />
              Office: <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:+442079936051`}>+44 20 7993 6051</a><br />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    </div>
  </div>
  <CopyToClipboard
    text={clipboardText}
    options={{ asHtml: true }}
    onCopy={(text, result) => {
      console.log(`on copied: ${result}`, text)
    }}
  >
    <button
      style={{ cursor: 'pointer', fontSize: '10px', border: '1px solid black', padding: '10px', margin: '0 auto', maxWidth: '320px' }}
      onMouseDown={updateText}
    >
      {!copied ? 'Copy above signature to clipboard' : 'Copied!'}
    </button>
  </CopyToClipboard>
  </>
  )
}

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json())

export default function Index() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR('/api/staticdata', fetcher)

  //Handle the error state
  if (error) return <div>Failed to load</div>
  //Handle the loading state
  if (!data) return <div>Loading...</div>
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  const signatures = JSON.parse(data).entries
  console.log(signatures)
  return (
    <>
    <div className="hello">
      <h1>Photobomb Email Signatures</h1>

      <style jsx>{`
      .hello {
        font-family: Helvetica, Arial, sans-serif;
        background: #eee;
        padding: 10px;
        text-align: center;
        transition: 100ms ease-in background;
      }
      .hello:hover {
        background: #ccc;
      }
    `}</style>
    </div>
    <div style={{ flexDirection: 'column', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {signatures.map((signature) => <Signature signature={signature} key={signature.id} />)}
    </div>
    </>
  )
}