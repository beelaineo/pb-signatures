import * as React from 'react'
//useSWR allows the use of SWR inside function components
import useSWR from 'swr'
import sanityClient from '@sanity/client'
import groq from 'groq'

const { useRef, useState, useEffect } = React

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
  const [showManualCopy, setShowManualCopy] = useState(false)
  const [showManualCopyMobile, setShowManualCopyMobile] = useState(false)
  const signatureHTML = useRef<HTMLDivElement>(null)
  const signatureMobile = useRef<HTMLDivElement>(null)
  const manualCopyTextarea = useRef<HTMLTextAreaElement>(null)

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

  // Cross-browser clipboard copy function with HTML support
  const copyToClipboard = async (html: string): Promise<boolean> => {
    try {
      // Modern approach: Use the Clipboard API if available
      if (navigator.clipboard && window.ClipboardItem && window.isSecureContext) {
        try {
          const type = 'text/html';
          const blob = new Blob([html], { type });
          const data = [new ClipboardItem({ [type]: blob })];
          await navigator.clipboard.write(data);
          return true;
        } catch (err) {
          console.error('Clipboard API HTML write failed:', err);
          // Fall back to text-only clipboard API
          try {
            await navigator.clipboard.writeText(html);
            return true;
          } catch (textErr) {
            console.error('Clipboard API text write failed:', textErr);
          }
        }
      }

      // Fallback for browsers without Clipboard API
      // Create a temporary div to hold the HTML content
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = html;
      tempDiv.setAttribute('contenteditable', 'true');
      tempDiv.style.position = 'fixed';
      tempDiv.style.left = '-9999px';
      tempDiv.style.top = '0';
      document.body.appendChild(tempDiv);
      
      // Select the content
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(tempDiv);
      selection?.removeAllRanges();
      selection?.addRange(range);
      
      // Execute copy command
      const successful = document.execCommand('copy');
      
      // Clean up
      selection?.removeAllRanges();
      document.body.removeChild(tempDiv);
      
      return successful;
    } catch (err) {
      console.error('Primary clipboard methods failed:', err);
      
      // Try IE-specific approach
      try {
        // For Internet Explorer
        if ((window as any).clipboardData && (window as any).clipboardData.setData) {
          // IE specific code path to prevent textarea being shown while dialog is visible
          (window as any).clipboardData.setData('Text', html);
          return true;
        }
      } catch (ieErr) {
        console.error('IE clipboard method failed:', ieErr);
      }
      
      // Last resort fallback - use textarea for plain text
      try {
        const textarea = document.createElement('textarea');
        textarea.value = html;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        const successful = document.execCommand('copy');
        document.body.removeChild(textarea);
        return successful;
      } catch (finalErr) {
        console.error('Final clipboard fallback failed:', finalErr);
        return false;
      }
    }
  };

  // Special method for Safari and iOS
  const copyHtmlViaSafariMethod = (html: string): boolean => {
    try {
      // Create an iframe (works better in Safari)
      const iframe = document.createElement('iframe');
      iframe.style.position = 'absolute';
      iframe.style.top = '-9999px';
      document.body.appendChild(iframe);
      
      // Write the HTML content to the iframe document
      const doc = iframe.contentDocument;
      doc?.open();
      doc?.write(html);
      doc?.close();
      
      // Create a range and select the contents
      const range = doc?.createRange();
      range?.selectNodeContents(doc?.body as Node);
      
      // Get the selection from the iframe window
      const selection = iframe.contentWindow?.getSelection();
      selection?.removeAllRanges();
      selection?.addRange(range as Range);
      
      // Execute copy command in the iframe's window context
      const successful = document.execCommand('copy');
      
      // Clean up
      document.body.removeChild(iframe);
      
      return successful;
    } catch (err) {
      console.error('Safari iframe method failed:', err);
      return false;
    }
  };

  const updateText = async () => {
    if (signatureHTML.current) {
      const emailHTML = renderEmailSignature(signatureHTML.current.outerHTML);
      setClipboardText(emailHTML);
      
      // Try multiple methods in sequence until one succeeds
      let success = await copyToClipboard(emailHTML);
      
      // If the main method fails, try the Safari-specific method
      if (!success) {
        success = copyHtmlViaSafariMethod(emailHTML);
      }
      
      setCopied(success);
      
      // If all methods fail, show manual copy option
      if (!success) {
        setShowManualCopy(true);
      } else {
        setShowManualCopy(false);
        // Reset the copied state after 3 seconds
        setTimeout(() => setCopied(false), 3000);
      }
    }
  }

  const updateTextMobile = async () => {
    if (signatureMobile.current) {
      const mobileHTML = signatureMobile.current.outerHTML;
      const emailHTML = renderEmailSignature(mobileHTML);
      console.log('Setting mobile clipboard text with HTML length:', emailHTML.length);
      setClipboardTextMobile(emailHTML);
      
      // Try multiple methods in sequence until one succeeds
      let success = await copyToClipboard(emailHTML);
      
      // If the main method fails, try the Safari-specific method
      if (!success) {
        success = copyHtmlViaSafariMethod(emailHTML);
      }
      
      setCopiedMobile(success);
      
      // If all methods fail, show manual copy option
      if (!success) {
        setShowManualCopyMobile(true);
      } else {
        setShowManualCopyMobile(false);
        // Reset the copied state after 3 seconds
        setTimeout(() => setCopiedMobile(false), 3000);
      }
    } else {
      console.error('Mobile signature ref is not available');
    }
  }

  useEffect(() => {
    console.log('clipboardText', clipboardText)
    console.log('clipboardTextMobile', clipboardTextMobile)
  }, [clipboardText, clipboardTextMobile])

  const offices = settings.locations

  return (
  <>
  <h4 style={{fontSize: '13px', fontFamily: 'sans-serif', paddingBottom: '1rem'}}>Simplified Signature (formatted HTML)</h4>
  <div ref={signatureMobile} style={{ padding: 0, fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}>
    <table cellPadding={0} cellSpacing={0} border={0} className="vertical-align" style={{minHeight: '120px', maxHeight: '120px', borderCollapse: 'collapse', height: '100%'}}>
      <tbody>
        <tr>
          <td valign="middle" style={{fontSize: '11px', lineHeight: '13px', paddingTop: 0, marginRight: '8px', paddingRight: '12px', verticalAlign: 'middle'}}>
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
          <td valign="middle" style={{borderLeft: '2px solid #000', marginLeft: '8px', paddingLeft: '12px', verticalAlign: 'middle'}}>
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
                      <div style={{paddingTop: '8px'}}>
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
  <button
    style={{ cursor: 'pointer', fontSize: '10px', border: '1px solid black', padding: '10px', margin: '10px 0', maxWidth: '320px' }}
    onClick={updateTextMobile}
  >
    {!copiedMobile ? 'Copy simplified signature to clipboard' : 'Copied!'}
  </button>
  
  {showManualCopyMobile && (
    <div style={{marginTop: '10px', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f8f8f8'}}>
      <p style={{fontSize: '12px', margin: '0 0 10px 0'}}>
        Automatic copy failed. Please manually select all text in the box below and copy (Ctrl+C or Cmd+C):
      </p>
      <textarea
        onClick={(e) => (e.target as HTMLTextAreaElement).select()}
        style={{width: '100%', height: '100px', padding: '5px'}}
        value={clipboardTextMobile}
        readOnly
      />
    </div>
  )}
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