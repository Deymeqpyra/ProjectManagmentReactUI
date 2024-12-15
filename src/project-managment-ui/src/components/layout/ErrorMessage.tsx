const ErrorMessage = ({ error }: { error: string }) => {
  return <p style={{color: "red"}}>Error: {error}</p>
}

export default ErrorMessage
