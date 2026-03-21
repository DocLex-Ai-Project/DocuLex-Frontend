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

// Define the expected document types
interface DocumentType {
  id: string;
  source: "EDITOR" | "UPLOAD" | "DRIVE" | "MANUAL"; 
  content?: string;
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

    const res = await axiosInstance.get(`/api/documents/${docId}`, {
      responseType: "blob", // 🔥 IMPORTANT
    });

    const file = new Blob([res.data], { type: "application/pdf" });

    const url = URL.createObjectURL(file);

    setPdfUrl(url);

    setDocument({
      id: docId,
      source: "UPLOAD",
    });

  } catch (error) {
    console.error("Failed to fetch PDF:", error);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (id && open) {
      fetchDocument(id);
    } else {
      // Clear document state when closed so it doesn't flash old data next time
      setDocument(null); 
    }
  }, [id, open]);

  return (
    <Dialog 
      open={open} 
      onClose={close} 
      fullWidth 
      maxWidth="md"
      PaperProps={{
        sx: { minHeight: '60vh' } // Ensures the dialog isn't tiny while loading
      }}
    >
      <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        Document Viewer
        <IconButton onClick={close} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0, backgroundColor: '#f8fafc' }}>
        {loading ? (
          <div className="flex justify-center items-center h-full p-10 min-h-[400px]">
            <CircularProgress sx={{ color: '#4f46e5' }} />
          </div>
        ) : (
          <div className="w-full h-full min-h-[500px] bg-white">
            
            {/* ✅ JODIT EDITOR / MANUAL DRAFTS -> Render HTML directly */}
       {/* HTML */}
{(document?.source === "EDITOR" || document?.source === "MANUAL") && document.content && (
  <div
    className="p-8 max-w-4xl mx-auto prose prose-slate"
    dangerouslySetInnerHTML={{ __html: document.content }}
  />
)}

{/* PDF */}
{pdfUrl && (
  <iframe
    src={pdfUrl}
    title="Document Viewer"
    width="100%"
    height="600px"
    style={{ border: "none" }}
  />
)}

            {/* Fallback if no content is found */}
            {document && !document.content && document.source === "MANUAL" && (
              <div className="flex justify-center items-center h-[500px] text-gray-500">
                No content available for this document.
              </div>
            )}
            
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DialogView;