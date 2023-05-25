import * as React from 'react'
//useSWR allows the use of SWR inside function components
import useSWR from 'swr'
import sanityClient from '@sanity/client'
import CopyToClipboard from 'react-copy-html-to-clipboard'
import groq from 'groq'

const { useRef, useState } = React

const instagramIcon = (
  <img height="6px" width="6px" style={{lineHeight: 0, marginBottom: -2}} src="https://pb-signatures.vercel.app/insta.png" />
)

const Signature = ({ signature, settings }) => {
  const [clipboardText, setClipboardText] = useState('')
  const [clipboardTextMobile, setClipboardTextMobile] = useState('')
  const [copied, setCopied] = useState(false)
  const [copiedMobile, setCopiedMobile] = useState(false)
  const signatureHTML = useRef<HTMLDivElement>(null)
  const signatureMobile = useRef<HTMLDivElement>(null)

  const renderEmailSignature = (html) => {
    return `<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
    <html><head>
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
    <meta name="viewport" content="width=device-width,initial-scale=1">
    <meta name="x-apple-disable-message-reformatting">
    <title></title>
    </head>
    <body id="body" style="-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">${html}</body></html>`
  }

  const updateText = () => {
    console.log(renderEmailSignature(signatureHTML.current?.outerHTML))
    setClipboardText(renderEmailSignature(signatureHTML.current?.outerHTML))
    setCopied(true)
  }

  const updateTextMobile = () => {
    console.log('Mobile Clipboard:', signatureMobile.current?.outerHTML)
    setClipboardTextMobile(signatureMobile.current?.outerHTML)
    setCopiedMobile(true)
  }

  const offices = settings.locations

  return (
  <>
  <h4 style={{fontSize: '13px', fontFamily: 'sans-serif', paddingBottom: '1rem'}}>Desktop: Gmail and Apple Mail Signature (formatted HTML)</h4>
  <div ref={signatureHTML} style={{ padding: 0, fontFamily: '"Gill Sans", "Gill Sans MT", Helvetica, Arial, sans-serif' }}>
    <table cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td style={{verticalAlign: 'top', fontSize: '7px', lineHeight: '8px', paddingTop: 0}}>
            <span style={{fontWeight: 600, fontSize: '8px', lineHeight: '7px'}}>{signature.name}</span><br /><br /><br /><br />
            <div className='meta' style={{fontWeight: 400, fontSize: '7px', lineHeight: '8px'}}>
              <span>{signature.role}</span>
              {signature.phone && (
              <>
                <br />
                <span>{signature.phone_label} <a style={{color: '#000', textDecoration: 'unset'}} href={`tel:${signature.phone.replace(/\s/g, '')}`}>{signature.phone}</a></span>
              </>
              )}
              {signature.insta && signature.insta_link && (
                <>
                  <br />
                  <span><a style={{color: '#000', textDecoration: 'unset'}} href={signature.insta_link} target="_blank">{instagramIcon} {signature.insta}</a></span>
                </>
              )}
              <br />
              <a style={{color: '#000', lineHeight: '8px', textDecoration: 'unset'}} href="https://www.photobombproduction.com/" target="_blank">photobombproduction.com</a>
            </div>
          </td>
          {offices.map((office, i) => {
            return (
              <td style={{verticalAlign: 'top'}} key={i}>
              <div style={{fontWeight: 300, fontSize: '6px', lineHeight: '8px', borderLeft: i == 0 ? '1px solid #000' : 'none', marginLeft: 8, paddingLeft: 8, paddingTop: 0}}>
                <span style={{fontWeight: 600, color: '#000', textDecoration: 'unset'}}>{office.name}</span><br />
                <p style={{whiteSpace: 'pre', margin: 0}}>{office.address}</p><br /><br />
                {i == 0 && settings.insta && settings.insta_link && (
                  <>
                    <br />
                    <div style={{marginBottom: '5px'}} className="insta-link">
                      {instagramIcon}
                      <a style={{fontWeight: 600, color: '#000', textDecoration: 'unset', paddingLeft: 2}} href={settings.insta_link} target="_blank">{settings.insta}</a>
                    </div>
                  </>
                )}
                {i == 1 && settings.invoice_label && settings.invoice_link && (
                  <>
                  <br />
                  <a style={{fontWeight: 600, color: '#000', textDecoration: 'unset'}} href={settings.invoice_link} rel="noopener noreferrer" target="_blank">{settings.invoice_label}</a>
                  </>
                )}
              </div>
            </td>
            )
          })}
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
  <h4 style={{fontSize: '13px', fontFamily: 'sans-serif', paddingBottom: '1rem', paddingTop: '1rem'}}>Mobile: Apple iOS Mail Signature (plain text)</h4>
  <div ref={signatureMobile} style={{ padding: 0, fontSize: 10, fontFamily: '"Gill Sans", "Gill Sans MT", Helvetica, Arial, sans-serif' }}>
  <span style={{ fontWeight: 600, fontSize: 11}}>{signature.name}</span><br /><br />
  <span>{signature.role}</span><br />
  {signature.phone && (
    <><span>{signature.phone_label} <a style={{ color: '#000', textDecoration: 'unset' }} href={`tel:${signature.phone.replace(/\s/g, '')}`}>{signature.phone}</a></span></>
  )}
  {signature.insta && signature.insta_link && (
    <>
      <br />
      <span><a style={{color: '#000', textDecoration: 'unset'}} href={signature.insta_link} target="_blank">IG: @{signature.insta}</a></span>
      </>
  )}
      <br />
      <a style={{color: '#000', lineHeight: '8px', textDecoration: 'unset'}} href="https://www.photobombproduction.com/" target="_blank">photobombproduction.com</a>
      <br />
      <br />
      <a style={{color: '#000', textDecoration: 'unset'}} href={settings.insta_link} target="_blank">{`IG: @${settings.insta}`}</a>
      <br />
      <a style={{fontWeight: 600, color: '#000', textDecoration: 'unset'}} href={settings.invoice_link} rel="noopener noreferrer" target="_blank">{settings.invoice_label}</a>
      <br />
      <br />
      {offices.map((office, i) => {
        return (
          <div key={i}>
            <span style={{fontSize: 8, fontWeight: 600, color: '#000', textDecoration: 'unset'}}>{office.name}</span>
            <br />
            <p style={{whiteSpace: 'pre', fontSize: 8, margin: 0}}>{office.address}</p>
            {i < (offices.length - 1) && (
            <>
              <br />
            </>)}
          </div>
        )
      })}
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
  <hr />
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
    <div>
    </div>
    <div style={{ flexDirection: 'column', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', padding: '2rem' }}>
      {signatures.map((signature) => <Signature signature={signature} settings={settings} key={signature._id} />)}
    </div>
    </>
  )
}