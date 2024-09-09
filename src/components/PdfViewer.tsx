import { Fragment } from "react/jsx-runtime";
import { Document, Page } from "react-pdf";
import { useCallback, useState } from "react";
import type { PDFDocumentProxy } from 'pdfjs-dist';
import 'react-pdf/dist/Page/TextLayer.css';
import 'react-pdf/dist/Page/AnnotationLayer.css';

interface PdfViewerProps {
  url: string;
}

const options = {
  cMapUrl: '/cmaps/',
  standardFontDataUrl: '/standard_fonts/'
}


function highlightPattern(text: string, pattern: string) {
  return text.replace(pattern, (value) => `<mark>${value}</mark>`);
}

export default function PdfViewer({ url }: PdfViewerProps) {
  if (!url) return <div>Please provide a valid url.</div>;

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(0);
  const [searchText, setSearchText] = useState<string>('');

  const onDocumentLoadSuccess = ({ numPages }: PDFDocumentProxy) => {
    setNumPages(numPages);
  }


  const textRenderer = useCallback(({ str }: { str: string }) => highlightPattern(str, searchText), [searchText]);

  return (
    <Fragment>
      PDF
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBlock: '1rem' }}>
        <div>
          <button disabled={currentPage === 1} onClick={() => setCurrentPage(currentPage - 1)}>Previous</button>
          <button disabled={currentPage === numPages} onClick={() => setCurrentPage(currentPage + 1)}>Next</button>
        </div>
        <div>
          <input placeholder="Search" type="text" onChange={(e) => setSearchText(e.target.value)} />
        </div>
      </div>

      <div style={{ width: '100%', border: '1px solid black' }}>
        <Document
          options={options}
          onLoadSuccess={onDocumentLoadSuccess}
          file={url}
        >
          <Page
            pageNumber={currentPage}
            customTextRenderer={textRenderer}
          />
        </Document>
      </div>
    </Fragment>
  )
}
