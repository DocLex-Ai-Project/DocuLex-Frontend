import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axiosInstance from "../../../../utils/axiosInstance";

interface DocumentType {
  id: string;
  source: "EDITOR" | "UPLOAD" | "DRIVE" | "MANUAL";
  content?: string; // HTML (editor or OCR)
  contentType?: string;
}

interface DialogViewProps {
  open: boolean;
  close: () => void;
  id: string;
}

const DialogView = ({ open, close, id }: DialogViewProps) => {
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [loading, setLoading] = useState(false);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);

  const fetchDocument = async (docId: string) => {
    try {
      setLoading(true);

      // ✅ 1. Fetch metadata
      const metaRes = await axiosInstance.get(`/api/documents/${docId}`);
      const doc = metaRes.data;

      setDocument(doc);

      // ✅ 2. If NO content → fetch PDF
      if (!doc.content && (doc.source === "UPLOAD" || doc.source === "DRIVE")) {
        const res = await axiosInstance.get(
          `/api/documents/${docId}/file`,
          {
            responseType: "arraybuffer", // 🔥 FIX
          }
        );

        const blob = new Blob([res.data], {
          type: "application/pdf",
        });

        const url = URL.createObjectURL(blob);
        setPdfUrl(url);
      } else {
        setPdfUrl(null);
      }
    } catch (error) {
      console.error("Failed to fetch document:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (id && open) {
      fetchDocument(id);
    } else {
      setDocument(null);
      setPdfUrl(null);
    }
  }, [id, open]);


  useEffect(() => {
    return () => {
      if (pdfUrl) URL.revokeObjectURL(pdfUrl);
    };
  }, [pdfUrl]);

  
  const generateHtml = (content: string) => `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 40px;
            line-height: 1.6;
            color: #111827;
            background: #ffffff;
          }
          h1, h2, h3 {
            margin-top: 20px;
            font-weight: bold;
          }
          p {
            margin: 10px 0;
          }
          ul {
            padding-left: 20px;
          }
          table {
            border-collapse: collapse;
            width: 100%;
            margin-top: 20px;
          }
          table, th, td {
            border: 1px solid #ddd;
            padding: 8px;
          }
        </style>
      </head>
      <body>
        ${content}
      </body>
    </html>
  `;

  return (
    <Dialog
      open={open}
      onClose={close}
      fullWidth
      maxWidth="md"
      PaperProps={{
        sx: { minHeight: "60vh" },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        Document Viewer
        <IconButton onClick={close} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, backgroundColor: "#f8fafc" }}>
        {loading ? (
          <div className="flex justify-center items-center h-full p-10 min-h-[400px]">
            <CircularProgress sx={{ color: "#4f46e5" }} />
          </div>
        ) : (
          <div className="w-full h-full min-h-[500px] bg-white">

            
            {document?.content && (
              <iframe
                title="HTML Document"
                width="100%"
                height="600px"
                style={{ border: "none" }}
                srcDoc={generateHtml(document.content)}
              />
            )}

           
            {!document?.content && pdfUrl && (
              <iframe
                src={pdfUrl}
                title="PDF Viewer"
                width="100%"
                height="600px"
                style={{ border: "none" }}
              />
            )}

            {!loading && !document?.content && !pdfUrl && (
              <div className="flex justify-center items-center h-[500px] text-gray-500">
                No document preview available.
              </div>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogView;