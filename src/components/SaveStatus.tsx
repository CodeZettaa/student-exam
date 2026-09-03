interface SaveStatusProps {
  status: 'idle' | 'saving' | 'saved' | 'error'
  submitted?: boolean
}

export function SaveStatus({ status, submitted = false }: SaveStatusProps) {
  if (submitted) {
    return <p className="save-status saved">Submitted</p>
  }
  if (status === 'saving') {
    return <p className="save-status">Saving…</p>
  }
  if (status === 'saved') {
    return <p className="save-status saved">Saved</p>
  }
  if (status === 'error') {
    return <p className="save-status error">Saved locally — retrying cloud save</p>
  }
  return <p className="save-status muted">Answers are stored on this device</p>
}
