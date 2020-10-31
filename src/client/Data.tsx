import React from 'react'

interface Props {
  fetch: (input: RequestInfo, init?: RequestInit | undefined) => Promise<Response>
  userCode: string
}

const Default: React.FC<Props> = (props: Props) => {
  const [data, setData] = React.useState<any[] | null>(null)
  React.useEffect(() => {
    props
      .fetch(`/api?user_code=${props.userCode}`)
      .then((resp) => resp.json())
      .then((resp_data) => {
        setData(resp_data)
      })
      .catch((error) => {
        console.error(error)
        setData(null)
      })
  }, [props.userCode])

  return data ? <div>{JSON.stringify(data)}</div> : <div>Loading...</div>
}

export default Default
