//useSWR allows the use of SWR inside function components
import useSWR from 'swr'


const Signature = ({ signature }) => (
  <div style={{ margin: 30, padding: 20, border: '1px solid #e1e1e1', fontFamily: '"Gill Sans", "Gill Sans MT", Helvetica, Arial, sans-serif' }}>
    <style jsx>{`
        table {
          cell-spacing: 0;
          cell-padding: 0;
        }
        table td {
          vertical-align: top;
        }
        #mobile {
          display: none;
        }
        @media screen and (max-width: 540px) {
          #mobile {
            display: block;
          }
          #desktop {
            display: none;
          }
        }
      `}</style>
    <table id="desktop" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td>
            <span style={{fontWeight: 600, fontSize: '9px', lineHeight: '9px'}}>{signature.name}</span><br /><br />
            <div className='meta' style={{fontWeight: 400, fontSize: '8px', lineHeight: '11px'}}>
              <span>{signature.role}</span>
              {signature.phone && (
              <>
                <br />
                <span>{signature.phone_label} <a style={{color: 'inherit', textDecoration: 'unset'}} href={`tel:${signature.phone.replace(" ", "")}`}>{signature.phone}</a></span>
              </>
              )}
              <br />
              <a style={{color: 'inherit', lineHeight: '10px', textDecoration: 'unset'}} href="https://www.photobombproduction.com/" target="_blank">photobombproduction.com</a>
            </div>
          </td>
          <td>
            <div style={{fontWeight: 300, fontSize: '6.5px', lineHeight: '9px', borderLeft: '0.5px solid #000', marginLeft: 16, paddingLeft: 16}}>
              <span style={{fontWeight: 600}}>Photobomb Production NYC</span><br />
              360 W 34 St Suite 8R<br />
              New York, NY 10001<br />
              Office: +1 646 477 5559<br /><br /><br /><br />
              <div style={{marginBottom: '5px'}} className="insta-link">
                <img style={{marginBottom: '-2px'}} alt="Instagram" height="8" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1OS42IDU5LjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5LjYgNTkuNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDEyMTI0MDE2NTQ1NjMyNTk2NTU4MDAwMDAxMDc0MzU1ODE1Mjg3NDc3NTY4NF8pO30KPC9zdHlsZT4KPGc+Cgk8ZGVmcz4KCQk8cmVjdCBpZD0iU1ZHSURfMV8iIHk9IjAiIHdpZHRoPSI1OS42IiBoZWlnaHQ9IjU5LjYiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMDAwMDAxNTY1NDkzMDA4NDAyNjc1MzM0MzAwMDAwMTA1OTkzNzA4MzcxNjE1NzU4MzJfIj4KCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8xXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxwYXRoIHN0eWxlPSJjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDE1NjU0OTMwMDg0MDI2NzUzMzQzMDAwMDAxMDU5OTM3MDgzNzE2MTU3NTgzMl8pOyIgZD0iTTI5LjgsNTQuMgoJCUMyOS44LDU0LjMsMjkuOCw1NC4zLDI5LjgsNTQuMmMzLjgsMCw3LjUtMC4xLDExLjMtMC4xYzEuNywwLDMuNC0wLjIsNS4xLTAuN2MxLjgtMC41LDMuNC0xLjQsNC43LTIuN2MxLjctMS43LDIuNS0zLjgsMi45LTYuMQoJCWMwLjMtMiwwLjQtNC4xLDAuNC02LjJjMC0zLjUsMC03LDAtMTAuNGMwLTMtMC4xLTYuMS0wLjEtOS4xYzAtMS43LTAuMi0zLjUtMC42LTUuMmMtMC43LTMtMi40LTUuMy01LjEtNi43CgkJYy0xLjctMC45LTMuNS0xLjMtNS40LTEuNGMtMi4yLTAuMS00LjUtMC4yLTYuNy0wLjJjLTUuNiwwLTExLjMsMC4xLTE2LjksMC4xYy0xLjgsMC0zLjYsMC4xLTUuNCwwLjVjLTIuNywwLjYtNC45LDItNi41LDQuMwoJCWMtMS4yLDEuOC0xLjcsMy44LTEuOSw1LjljLTAuMiwyLjEtMC4yLDQuMi0wLjMsNi4zYzAsMy43LDAsNy40LDAsMTEuMmMwLDIuNiwwLjEsNS4yLDAuMSw3LjdjMCwxLjUsMC4yLDIuOSwwLjUsNC4zCgkJYzAuNiwyLjcsMiw0LjgsNC4zLDYuNGMxLjgsMS4yLDMuOCwxLjcsNS44LDEuOWMyLjEsMC4yLDQuMiwwLjIsNi4zLDAuM0MyNC45LDU0LjMsMjcuNCw1NC4yLDI5LjgsNTQuMiBNNTkuNiwyMi45djE0LjYKCQljMCwwLjEsMCwwLjIsMCwwLjNjLTAuMSwxLjUtMC4xLDMuMS0wLjIsNC42Yy0wLjEsMS45LTAuNCwzLjctMC45LDUuNWMtMC45LDMuMi0yLjcsNS45LTUuMyw4Yy0yLjUsMi01LjUsMy04LjcsMy40CgkJYy0yLjEsMC4yLTQuMiwwLjMtNi4yLDAuNGMtMC4yLDAtMC40LDAtMC41LDAuMUgyMi41Yy0wLjEsMC0wLjItMC4xLTAuMy0wLjFjLTEsMC0yLDAtMi45LTAuMWMtMi4zLTAuMS00LjYtMC4yLTYuOS0wLjgKCQljLTMuNi0wLjktNi42LTIuOS04LjktNS45Yy0xLjktMi42LTIuOC01LjYtMy4xLTguN2MtMC4yLTEuOS0wLjItMy44LTAuMy01LjhjMC0wLjIsMC0wLjMsMC0wLjVWMjEuNmMwLTAuMSwwLTAuMiwwLTAuMwoJCWMwLjEtMS40LDAuMS0yLjgsMC4yLTQuMWMwLjEtMS44LDAuMy0zLjYsMC45LTUuNGMxLjEtNCwzLjUtNyw3LTkuMWMyLjUtMS41LDUuMy0yLjIsOC4yLTIuNGMxLjctMC4xLDMuNS0wLjEsNS4yLTAuMgoJCWMwLjEsMCwwLjIsMCwwLjQtMC4xaDE1LjRjMC4xLDAsMC4zLDAuMSwwLjQsMC4xYzEuMSwwLDIuMiwwLjEsMy4zLDAuMWMyLjYsMC4xLDUuMywwLjMsNy44LDEuMmMzLjQsMS4yLDYuMSwzLjMsOCw2LjMKCQljMS43LDIuNiwyLjQsNS42LDIuNiw4LjdjMC4xLDIsMC4yLDQuMSwwLjIsNi4xQzU5LjYsMjIuNiw1OS42LDIyLjcsNTkuNiwyMi45Ii8+Cgk8cGF0aCBzdHlsZT0iY2xpcC1wYXRoOnVybCgjU1ZHSURfMDAwMDAxNTY1NDkzMDA4NDAyNjc1MzM0MzAwMDAwMTA1OTkzNzA4MzcxNjE1NzU4MzJfKTsiIGQ9Ik0yOS44LDE5LjljLTUuNiwwLTkuOCw0LjUtMTAsOS41CgkJYy0wLjIsNS44LDQuNCwxMC4zLDkuOSwxMC4zYzUuNCwwLDkuOS00LjQsOS45LTkuOEMzOS43LDI0LjEsMzUuMiwxOS45LDI5LjgsMTkuOSBNNDUuMSwyOS42YzAuMSw4LjQtNi41LDE1LjItMTQuNywxNS41CgkJYy04LjUsMC4zLTE1LjUtNi40LTE1LjktMTQuN2MtMC4zLTguNSw2LjQtMTUuNywxNC44LTE1LjlDMzcuOSwxNC4zLDQ0LjksMjAuOSw0NS4xLDI5LjYiLz4KCTxwYXRoIHN0eWxlPSJjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDE1NjU0OTMwMDg0MDI2NzUzMzQzMDAwMDAxMDU5OTM3MDgzNzE2MTU3NTgzMl8pOyIgZD0iTTQyLjEsMTMuOWMwLTIsMS42LTMuNiwzLjYtMy42CgkJYzIsMCwzLjYsMS42LDMuNSwzLjZjMCwxLjktMS42LDMuNS0zLjYsMy41QzQzLjcsMTcuNSw0Mi4xLDE1LjksNDIuMSwxMy45Ii8+CjwvZz4KPC9zdmc+Cg==" />
                <a style={{color: 'inherit', textDecoration: 'unset', paddingLeft: 2}} href="https://instagram.com/photobombproduction" target="_blank">photobombproduction</a>
              </div>
            </div>
          </td>
          <td>
            <div style={{fontWeight: 300, fontSize: '6.5px', lineHeight: '9px', paddingLeft: 16}}>
              <span style={{fontWeight: 600}}>Photobomb Production LA</span><br />
              12030 Viewcrest Road<br />
              Studio City, CA 91604<br />
              Office: +1 323 540 5700<br /><br /><br />
              <span style={{fontWeight: 600}}>Invoicing</span><br />
              <a style={{color: 'inherit', textDecoration: 'unset'}} href="mailto:invoices@photobombproduction.com" target="_blank">invoices@photobombproduction.com</a>
            </div>
          </td>
          <td>
            <div style={{fontWeight: 300, fontSize: '6.5px', lineHeight: '9px', paddingLeft: 0}}>
              <span style={{fontWeight: 600}}>Photobomb Production LDN</span><br />
              15 Poland St<br />
              London, WIF 8QE<br />
              Office: +44 20 7993 6051
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <table id="mobile" cellPadding={0} cellSpacing={0}>
      <tbody>
        <tr>
          <td style={{paddingRight: 16}}>
            <span style={{fontWeight: 600, fontSize: '9px', lineHeight: '9px'}}>{signature.name}</span><br /><br />
            <div className='meta' style={{fontWeight: 400, fontSize: '8px', lineHeight: '11px'}}>
              <span>{signature.role}</span>
              {signature.phone && (
              <>
                <br />
                <span>{signature.phone_label} <a style={{color: 'inherit', textDecoration: 'unset'}} href={`tel:${signature.phone.replace(" ", "")}`}>{signature.phone}</a></span>
              </>
              )}<br />
              <a style={{color: 'inherit', lineHeight: '10px', textDecoration: 'unset'}} href="https://www.photobombproduction.com/" target="_blank">photobombproduction.com</a>
              <br /><br /><br />
              <div style={{marginBottom: '5px'}} className="insta-link">
                <img style={{marginBottom: '-2px'}} alt="Instagram" height="8" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDI2LjMuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9IkxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCA1OS42IDU5LjYiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDU5LjYgNTkuNjsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDEyMTI0MDE2NTQ1NjMyNTk2NTU4MDAwMDAxMDc0MzU1ODE1Mjg3NDc3NTY4NF8pO30KPC9zdHlsZT4KPGc+Cgk8ZGVmcz4KCQk8cmVjdCBpZD0iU1ZHSURfMV8iIHk9IjAiIHdpZHRoPSI1OS42IiBoZWlnaHQ9IjU5LjYiLz4KCTwvZGVmcz4KCTxjbGlwUGF0aCBpZD0iU1ZHSURfMDAwMDAxNTY1NDkzMDA4NDAyNjc1MzM0MzAwMDAwMTA1OTkzNzA4MzcxNjE1NzU4MzJfIj4KCQk8dXNlIHhsaW5rOmhyZWY9IiNTVkdJRF8xXyIgIHN0eWxlPSJvdmVyZmxvdzp2aXNpYmxlOyIvPgoJPC9jbGlwUGF0aD4KCTxwYXRoIHN0eWxlPSJjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDE1NjU0OTMwMDg0MDI2NzUzMzQzMDAwMDAxMDU5OTM3MDgzNzE2MTU3NTgzMl8pOyIgZD0iTTI5LjgsNTQuMgoJCUMyOS44LDU0LjMsMjkuOCw1NC4zLDI5LjgsNTQuMmMzLjgsMCw3LjUtMC4xLDExLjMtMC4xYzEuNywwLDMuNC0wLjIsNS4xLTAuN2MxLjgtMC41LDMuNC0xLjQsNC43LTIuN2MxLjctMS43LDIuNS0zLjgsMi45LTYuMQoJCWMwLjMtMiwwLjQtNC4xLDAuNC02LjJjMC0zLjUsMC03LDAtMTAuNGMwLTMtMC4xLTYuMS0wLjEtOS4xYzAtMS43LTAuMi0zLjUtMC42LTUuMmMtMC43LTMtMi40LTUuMy01LjEtNi43CgkJYy0xLjctMC45LTMuNS0xLjMtNS40LTEuNGMtMi4yLTAuMS00LjUtMC4yLTYuNy0wLjJjLTUuNiwwLTExLjMsMC4xLTE2LjksMC4xYy0xLjgsMC0zLjYsMC4xLTUuNCwwLjVjLTIuNywwLjYtNC45LDItNi41LDQuMwoJCWMtMS4yLDEuOC0xLjcsMy44LTEuOSw1LjljLTAuMiwyLjEtMC4yLDQuMi0wLjMsNi4zYzAsMy43LDAsNy40LDAsMTEuMmMwLDIuNiwwLjEsNS4yLDAuMSw3LjdjMCwxLjUsMC4yLDIuOSwwLjUsNC4zCgkJYzAuNiwyLjcsMiw0LjgsNC4zLDYuNGMxLjgsMS4yLDMuOCwxLjcsNS44LDEuOWMyLjEsMC4yLDQuMiwwLjIsNi4zLDAuM0MyNC45LDU0LjMsMjcuNCw1NC4yLDI5LjgsNTQuMiBNNTkuNiwyMi45djE0LjYKCQljMCwwLjEsMCwwLjIsMCwwLjNjLTAuMSwxLjUtMC4xLDMuMS0wLjIsNC42Yy0wLjEsMS45LTAuNCwzLjctMC45LDUuNWMtMC45LDMuMi0yLjcsNS45LTUuMyw4Yy0yLjUsMi01LjUsMy04LjcsMy40CgkJYy0yLjEsMC4yLTQuMiwwLjMtNi4yLDAuNGMtMC4yLDAtMC40LDAtMC41LDAuMUgyMi41Yy0wLjEsMC0wLjItMC4xLTAuMy0wLjFjLTEsMC0yLDAtMi45LTAuMWMtMi4zLTAuMS00LjYtMC4yLTYuOS0wLjgKCQljLTMuNi0wLjktNi42LTIuOS04LjktNS45Yy0xLjktMi42LTIuOC01LjYtMy4xLTguN2MtMC4yLTEuOS0wLjItMy44LTAuMy01LjhjMC0wLjIsMC0wLjMsMC0wLjVWMjEuNmMwLTAuMSwwLTAuMiwwLTAuMwoJCWMwLjEtMS40LDAuMS0yLjgsMC4yLTQuMWMwLjEtMS44LDAuMy0zLjYsMC45LTUuNGMxLjEtNCwzLjUtNyw3LTkuMWMyLjUtMS41LDUuMy0yLjIsOC4yLTIuNGMxLjctMC4xLDMuNS0wLjEsNS4yLTAuMgoJCWMwLjEsMCwwLjIsMCwwLjQtMC4xaDE1LjRjMC4xLDAsMC4zLDAuMSwwLjQsMC4xYzEuMSwwLDIuMiwwLjEsMy4zLDAuMWMyLjYsMC4xLDUuMywwLjMsNy44LDEuMmMzLjQsMS4yLDYuMSwzLjMsOCw2LjMKCQljMS43LDIuNiwyLjQsNS42LDIuNiw4LjdjMC4xLDIsMC4yLDQuMSwwLjIsNi4xQzU5LjYsMjIuNiw1OS42LDIyLjcsNTkuNiwyMi45Ii8+Cgk8cGF0aCBzdHlsZT0iY2xpcC1wYXRoOnVybCgjU1ZHSURfMDAwMDAxNTY1NDkzMDA4NDAyNjc1MzM0MzAwMDAwMTA1OTkzNzA4MzcxNjE1NzU4MzJfKTsiIGQ9Ik0yOS44LDE5LjljLTUuNiwwLTkuOCw0LjUtMTAsOS41CgkJYy0wLjIsNS44LDQuNCwxMC4zLDkuOSwxMC4zYzUuNCwwLDkuOS00LjQsOS45LTkuOEMzOS43LDI0LjEsMzUuMiwxOS45LDI5LjgsMTkuOSBNNDUuMSwyOS42YzAuMSw4LjQtNi41LDE1LjItMTQuNywxNS41CgkJYy04LjUsMC4zLTE1LjUtNi40LTE1LjktMTQuN2MtMC4zLTguNSw2LjQtMTUuNywxNC44LTE1LjlDMzcuOSwxNC4zLDQ0LjksMjAuOSw0NS4xLDI5LjYiLz4KCTxwYXRoIHN0eWxlPSJjbGlwLXBhdGg6dXJsKCNTVkdJRF8wMDAwMDE1NjU0OTMwMDg0MDI2NzUzMzQzMDAwMDAxMDU5OTM3MDgzNzE2MTU3NTgzMl8pOyIgZD0iTTQyLjEsMTMuOWMwLTIsMS42LTMuNiwzLjYtMy42CgkJYzIsMCwzLjYsMS42LDMuNSwzLjZjMCwxLjktMS42LDMuNS0zLjYsMy41QzQzLjcsMTcuNSw0Mi4xLDE1LjksNDIuMSwxMy45Ii8+CjwvZz4KPC9zdmc+Cg==" />
                <a style={{color: 'inherit', textDecoration: 'unset', paddingLeft: 2}} href="https://instagram.com/photobombproduction" target="_blank">photobombproduction</a>
              </div>
              <span style={{fontWeight: 600}}>Invoicing</span><br />
              <a style={{color: 'inherit', textDecoration: 'unset'}} href="mailto:invoices@photobombproduction.com" target="_blank">invoices@photobombproduction.com</a>
            </div>
          </td>
          <td style={{fontWeight: 300, fontSize: '6.5px', lineHeight: '9px', borderLeft: '0.5px solid #000', paddingLeft: 16}}>
            <div>
              <span style={{fontWeight: 600}}>Photobomb Production NYC</span><br />
              360 W 34 St Suite 8R<br />
              New York, NY 10001<br />
              Office: +1 646 477 5559<br /><br />
            </div>
            <div style={{fontWeight: 300, fontSize: '6.5px', lineHeight: '9px'}}>
              <span style={{fontWeight: 600}}>Photobomb Production LA</span><br />
              12030 Viewcrest Road<br />
              Studio City, CA 91604<br />
              Office: +1 323 540 5700<br /><br />
            </div>
            <div style={{fontWeight: 300, fontSize: '6.5px', lineHeight: '9px'}}>
              <span style={{fontWeight: 600}}>Photobomb Production LDN</span><br />
              15 Poland St<br />
              London, WIF 8QE<br />
              Office: +44 20 7993 6051
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
)


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