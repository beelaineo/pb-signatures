import * as React from 'react'
//useSWR allows the use of SWR inside function components
import useSWR from 'swr'
import sanityClient from '@sanity/client'
import CopyToClipboard from 'react-copy-html-to-clipboard'
import groq from 'groq'

const { useRef, useState } = React

const logoImage = (
  <img height="50px" alt="Photobomb Production Logo" src="https://pb-signatures.vercel.app/logo.png" />
)

// const instagramIcon = (
//   <img height="6px" width="6px" style={{lineHeight: 0, marginBottom: -2}} src="https://pb-signatures.vercel.app/insta.png" alt="Instagram Icon" />
// )

const Signature = ({ signature, settings }) => {
  const [clipboardText, setClipboardText] = useState('')
  const [clipboardTextMobile, setClipboardTextMobile] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedMobile, setCopiedMobile] = useState(false)
  const signatureHTML = useRef<HTMLDivElement>(null)
  const signatureMobile = useRef<HTMLDivElement>(null)

  const renderEmailSignature = (html) => {
    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html>
    <head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    <!--[if mso]>
    <style>
      table {border-collapse:collapse;border-spacing:0;border:none;margin:0;}
      div, td {padding:0;}
      div {margin:0 !important;}
    </style>
    <noscript>
    <xml>
      <o:OfficeDocumentSettings>
        <o:PixelsPerInch>96</o:PixelsPerInch>
      </o:OfficeDocumentSettings>
    </xml>
    </noscript>
    <![endif]-->
    <style>
      /* Reset styles for email clients */
      body, table, td, p, a, li, blockquote {
        -webkit-text-size-adjust: 100%;
        -ms-text-size-adjust: 100%;
      }
      table, td {
        mso-table-lspace: 0pt;
        mso-table-rspace: 0pt;
      }
      img {
        -ms-interpolation-mode: bicubic;
      }
      /* Outlook-specific vertical alignment fix */
      table.vertical-align {
        height: 100%;
      }
      .vertical-align td {
        vertical-align: middle;
      }
    </style>
    </head>
    <body style="margin:0; padding:0; background-color:#ffffff;">${html}</body>
    </html>`
  }

  const updateText = () => {
    console.log(renderEmailSignature(signatureHTML.current?.outerHTML))
    setClipboardText(renderEmailSignature(signatureHTML.current?.outerHTML))
    setCopied(true)
  }

  const updateTextMobile = () => {
    if (signatureMobile.current) {
      // Get the HTML content
      const mobileHTML = signatureMobile.current.outerHTML
      // Generate the email signature HTML
      const emailHTML = renderEmailSignature(mobileHTML)
      // Log for debugging
      console.log('Setting mobile clipboard text with HTML length:', emailHTML.length)
      // Update state with the full HTML content
      setClipboardTextMobile(emailHTML)
    } else {
      console.error('Mobile signature ref is not available')
    }
  }

  const offices = settings.locations

  return (
  <>
  <h4 style={{fontSize: '13px', fontFamily: 'sans-serif', paddingBottom: '1rem'}}>Gmail and Apple Mail Signature (formatted HTML)</h4>
  <div ref={signatureHTML} style={{ padding: 0, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
    <table cellPadding={0} cellSpacing={0} border={0} className="vertical-align" style={{minHeight: '180px', borderCollapse: 'collapse', height: '100%'}}>
      <tbody>
        <tr>
          <td valign="middle" style={{fontSize: '10px', lineHeight: '13px', paddingTop: 0, paddingRight: '8px', verticalAlign: 'middle'}}>
            <span style={{fontFamily: '"Lucida Sans", "Gill Sans", "Verdana", Arial, sans-serif', fontWeight: 700, fontSize: '14px', lineHeight: '18px'}}>{signature.name}</span><br /><br />
            <div style={{fontWeight: 400, fontSize: '10px', lineHeight: '13px'}}>
              <span>{signature.role}</span>
              {signature.phone && (
              <>
                <br />
                <span><a style={{color: '#000', textDecoration: 'none'}} href={`tel:${signature.phone.replace(/\s/g, '')}`}>{signature.phone}</a></span>
              </>
              )}
              <br />
            </div>
            <br />
            <img width={150} alt="Photobomb Production Logo" src="https://pb-signatures.vercel.app/logo.png" style={{display: 'block'}} />
            <br />
            {settings.insta && settings.insta_link && (
              <>
              <div>
                <a style={{color: '#000', textDecoration: 'none', fontSize: '10px', lineHeight: '13px'}} href={settings.insta_link} target="_blank">@{settings.insta}</a>
              </div>
              </>
            )}
            <a style={{color: '#000', lineHeight: '13px', textDecoration: 'none', fontSize: '10px'}} href="https://www.photobombproduction.com/" target="_blank">www.photobombproduction.com</a>
          </td>
          <td style={{width: '2px', backgroundColor: '#000000', padding: '0'}}>&nbsp;</td>
          <td valign="middle" style={{marginLeft: '8px', paddingLeft: '8px', verticalAlign: 'middle'}}>
            <table cellPadding={0} cellSpacing={0} border={0} className="vertical-align" style={{borderCollapse: 'collapse', height: '100%'}}>
              <tbody>
                {offices.map((office, i) => {
                  return (
                    <tr key={i}>
                      <td valign="middle" style={{fontWeight: 400, fontSize: '10px', lineHeight: '13px', paddingTop: i > 0 ? '10px' : 0, verticalAlign: 'middle'}}>
                        <span style={{fontWeight: 600, color: '#000', textDecoration: 'none'}}>{office.name}</span><br />
                        <p style={{whiteSpace: 'pre', margin: 0}}>{office.address}</p>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CopyToClipboard
    style={{ alignSelf: 'start', margin: '10px 0 10px 0'}}
    text={clipboardText}
    options={{ asHtml: true }}
    onCopy={(result) => {
      console.log(`on copied: ${result}`)
      setCopied(true)
    }}
  >
    <button
      style={{ cursor: 'pointer', fontSize: '10px', border: '1px solid black', padding: '10px', margin: '0 auto', maxWidth: '320px' }}
      onMouseDown={updateText}
    >
      {!copied ? 'Copy above signature to clipboard' : 'Copied!'}
    </button>
  </CopyToClipboard>
  {/* <h4 style={{fontSize: '13px', fontFamily: 'sans-serif', paddingBottom: '1rem', paddingTop: '1rem'}}>Mobile: Apple iOS Mail Signature (plain text)</h4>
  <div ref={signatureMobile} style={{ padding: 0, fontSize: 10, fontFamily: '"Gill Sans", "Gill Sans MT", Helvetica, Arial, sans-serif' }}>
    <table cellPadding={0} cellSpacing={0} border={0} className="vertical-align" style={{borderCollapse: 'collapse', height: '100%'}}>
      <tbody>
        <tr>
          <td valign="middle" style={{padding: 0, verticalAlign: 'middle'}}>
            <img width={150} alt="Photobomb Production Logo" src="https://pb-signatures.vercel.app/logo.png" style={{display: 'block', paddingBottom: '10px'}} />
            <br />
            <span style={{ fontWeight: 600, fontSize: 11}}>{signature.name}</span><br /><br />
            <span>{signature.role}</span><br />
            {signature.phone && (
              <><span>{signature.phone_label} <a style={{ color: '#000', textDecoration: 'none' }} href={`tel:${signature.phone.replace(/\s/g, '')}`}>{signature.phone}</a></span></>
            )}
            {signature.insta && signature.insta_link && (
              <>
                <br />
                <span><a style={{color: '#000', textDecoration: 'none'}} href={signature.insta_link} target="_blank">IG: @{signature.insta}</a></span>
              </>
            )}
            <br />
            <a style={{color: '#000', lineHeight: '10px', textDecoration: 'none'}} href="https://www.photobombproduction.com/" target="_blank">photobombproduction.com</a>
            <br />
            <br />
            <a style={{color: '#000', textDecoration: 'none'}} href={settings.insta_link} target="_blank">{`IG: @${settings.insta}`}</a>
            <br />
            <a style={{fontWeight: 600, color: '#000', textDecoration: 'none'}} href={settings.invoice_link} rel="noopener noreferrer" target="_blank">{settings.invoice_label}</a>
            <br />
            <br />
            {offices.map((office, i) => {
              return (
                <div key={i}>
                  <span style={{fontSize: '9px', fontWeight: 600, color: '#000', textDecoration: 'none'}}>{office.name}</span>
                  <br />
                  <p style={{whiteSpace: 'pre', fontSize: '8px', margin: 0}}>{office.address}</p>
                  {i < (offices.length - 1) && (
                  <>
                    <br />
                  </>)}
                </div>
              )
            })}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CopyToClipboard
    style={{ alignSelf: 'start', margin: '10px 0 10px 0'}}
    text={clipboardTextMobile}
    options={{ asHtml: true }}
    onCopy={(result) => {
      console.log(`on copied: ${result}`)
      setCopiedMobile(true)
    }}
  >
    <button
      style={{ cursor: 'pointer', fontSize: '10px', border: '1px solid black', padding: '10px', margin: '0 auto', maxWidth: '320px' }}
      onMouseDown={updateTextMobile}
    >
      {!copiedMobile ? 'Copy above signature to clipboard' : 'Copied!'}
    </button>
  </CopyToClipboard>
  <hr /> */}
  <h4 style={{fontSize: '13px', fontFamily: 'sans-serif', paddingBottom: '1rem'}}>Simplified Signature (formatted HTML)</h4>
  <div ref={signatureMobile} style={{ padding: 0, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
    <table cellPadding={0} cellSpacing={0} border={0} className="vertical-align" style={{minHeight: '120px', borderCollapse: 'collapse', height: '100%'}}>
      <tbody>
        <tr>
          <td valign="middle" style={{fontSize: '11px', lineHeight: '13px', paddingTop: 0, paddingRight: '12px', verticalAlign: 'middle'}}>
            <span style={{fontFamily: '"Lucida Sans", "Gill Sans", "Verdana", Arial, sans-serif', fontWeight: 700, fontSize: '16px', lineHeight: '18px'}}>{signature.name}</span><br />
            <div style={{fontWeight: 400, fontSize: '11px', lineHeight: '13px'}}>
              <span style={{fontSize: '11px', lineHeight: '13px', display: 'inline-block'}}>{signature.role}</span>
              {signature.phone && (
              <>
                <br />
                <a style={{color: '#000', textDecoration: 'none', fontSize: '11px', lineHeight: '13px'}} href={`tel:${signature.phone.replace(/\s/g, '')}`}>{signature.phone}</a>
              </>
              )}
              <br />
            </div>
            <img width={170} alt="Photobomb Production Logo" src="https://pb-signatures.vercel.app/logo.png" style={{display: 'block', paddingTop: '8px'}} />
          </td>
          <td style={{width: '2px', backgroundColor: '#000000', padding: '0', margin: '0 2px'}}></td>
          <td valign="middle" style={{marginLeft: '8px', paddingLeft: '12px', verticalAlign: 'middle'}}>
            <table cellPadding={0} cellSpacing={0} border={0} className="vertical-align" style={{borderCollapse: 'collapse', height: '100%'}}>
              <tbody>
                <tr>
                  <td valign="middle" style={{fontWeight: 400, fontSize: '12px', lineHeight: '13px'}}>
                    {offices.map((office, i) => (
                      <div key={i} style={{paddingBottom: '8px'}}>
                        <span style={{fontWeight: 600, color: '#000', textDecoration: 'none'}}>{office.name}</span><br />
                      </div>
                    ))}
                    
                    {settings.insta && settings.insta_link && (
                      <div>
                        <a style={{color: '#000', textDecoration: 'none', fontSize: '11px', lineHeight: '13px'}} href={settings.insta_link} target="_blank">{`@${settings.insta}`}</a>
                        <br />
                        <a style={{color: '#000', lineHeight: '13px', textDecoration: 'none', fontSize: '11px'}} href="https://www.photobombproduction.com/" target="_blank">www.photobombproduction.com</a>
                      </div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <CopyToClipboard
    style={{ alignSelf: 'start', margin: '10px 0 10px 0'}}
    text={clipboardTextMobile}
    options={{ asHtml: true }}
    onCopy={(result) => {
      console.log(`Simplified signature copied: ${result}`)
      setCopiedMobile(true)
      // Reset the copied state after 3 seconds
      setTimeout(() => setCopiedMobile(false), 3000)
    }}
  >
    <button
      style={{ cursor: 'pointer', fontSize: '10px', border: '1px solid black', padding: '10px', margin: '0 auto', maxWidth: '320px' }}
      onClick={updateTextMobile}
    >
      {!copiedMobile ? 'Copy simplified signature to clipboard' : 'Copied!'}
    </button>
  </CopyToClipboard>
  </>
  )
}

//Write a fetcher function to wrap the native fetch function and return the result of a call to url in json format
const fetcher = (url) => fetch(url).then((res) => res.json())

const client = sanityClient({
  projectId: "k9f4bb0p",
  dataset: "production",
  useCdn: false
})

export default function Index() {
  //Set up SWR to run the fetcher function when calling "/api/staticdata"
  //There are 3 possible states: (1) loading when data is null (2) ready when the data is returned (3) error when there was an error fetching the data
  const { data, error } = useSWR(groq`{"signatures": *[_type == "person"], "settings": *[_type == "settings"][0]{..., locations[]->}}`, query =>
    client.fetch(query)
  )

  //Handle the error state
  if (error) return <div>Failed to load</div>
  //Handle the loading state
  if (!data) return <div>Loading...</div>

  console.log(data)
  //Handle the ready state and display the result contained in the data object mapped to the structure of the json file
  const signatures = data.signatures
  const settings = data.settings

  console.log(signatures)

  return (
    <>
    <div className="hello">
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
        {logoImage}
        <h1>Photobomb Email Signatures</h1>
      </div>

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
    <div>
    </div>
    <div style={{ flexDirection: 'column', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '2rem' }}>
      {signatures.map((signature) => <Signature signature={signature} settings={settings} key={signature._id} />)}
    </div>
    </>
  )
}