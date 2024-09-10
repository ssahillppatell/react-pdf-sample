import PdfViewer from "./components/PdfViewer"

function App() {
  const query = new URLSearchParams(window.location.search)
  const url = decodeURIComponent(query.get("url") || "sample.pdf")

  return (
    <>
      <h1>React Pdf Sample</h1>
      <PdfViewer url={url} />
    </>
  )
}

export default App
