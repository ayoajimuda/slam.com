import '../styles/components-css/PageHeader.css'

export default function PageHeader({ number, title, description }) {
  return (
    <div className="page-header">
      <p className="label">{number} / LEARN &amp; RIDE</p>
      <h1 className="page-header-title">{title}</h1>
      <p className="page-header-description">{description}</p>
    </div>
  )
}
