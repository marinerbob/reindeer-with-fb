import { React } from 'react'
import { Spinner } from 'react-bootstrap'

export default function Loader() {
  return (
    <div>
      <Spinner
        style={{
          marginLeft: '47vw',
          marginTop: '33vh',
          fontSize: '200px',
        }}
        animation="border"
        variant="warning"
        name="loading..."
      />
    </div>
  )
}
