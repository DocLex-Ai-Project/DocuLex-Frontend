import { useEffect, useState } from "react";
// import axiosInstance from "../../../utils/axiosInstance";
import StatusBadge from "../StatusBagde"; // Ensure path is correct

// MUI Imports
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  CircularProgress,
  Box,
  Typography,
  Chip
} from "@mui/material";

interface Document {
  id: string;
  title: string;
  source: string; // e.g., "Manual Draft" (Jodit) or "Uploaded PDF"
  status: string;
  createdAt: string;
}

const DocumentsPage = () => {
  // Added some dummy data so you can see the table design immediately
  const [documents, setDocuments] = useState<Document[]>([
    { id: '1', title: 'Non-Disclosure Agreement', source: 'Manual Draft', status: 'Draft', createdAt: '2026-03-12T10:00:00Z' },
    { id: '2', title: 'Vendor Contract', source: 'Uploaded PDF', status: 'Pending Review', createdAt: '2026-03-13T08:30:00Z' },
  ]);
  const [loading, setLoading] = useState(false); // Set to false to see the dummy data

  const fetchDocuments = async () => {
    // try {
    //   setLoading(true);
    //   const res = await axiosInstance.get("/documents/my-documents");
    //   setDocuments(res.data);
    // } catch (error) {
    //   console.error("Error fetching documents", error);
    // } finally {
    //   setLoading(false);
    // }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Future handler for viewing documents
  const handleViewDocument = (doc: Document) => {
    if (doc.source === 'Manual Draft') {
      console.log("TODO: Convert Jodit HTML to PDF on the fly or open in specialized viewer for document ID:", doc.id);
    } else {
      console.log("Opening standard PDF viewer for document ID:", doc.id);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      
      <Typography variant="h4" component="h1" fontWeight="600" sx={{ mb: 3, color: '#1e293b' }}>
        My Documents
      </Typography>

      <TableContainer 
        component={Paper} 
        elevation={0} 
        sx={{ 
          border: '1px solid #e2e8f0', 
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', p: 8 }}>
            <CircularProgress size={40} sx={{ color: '#4f46e5' }} />
          </Box>
        ) : (
          <Table sx={{ minWidth: 650 }} aria-label="documents table">
            
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Source / Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Created</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569', pr: 4 }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 8, color: '#64748b' }}>
                    <Typography variant="body1">No documents uploaded yet</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow
                    key={doc.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s' }}
                  >
                    <TableCell component="th" scope="row" sx={{ fontWeight: 500, color: '#0f172a' }}>
                      {doc.title}
                    </TableCell>

                    <TableCell>
                      {/* Visual distinction for Manual Drafts vs Uploads */}
                      <Chip 
                        label={doc.source} 
                        size="small" 
                        variant="outlined"
                        color={doc.source === 'Manual Draft' ? 'primary' : 'default'}
                        sx={{ fontWeight: 500 }}
                      />
                    </TableCell>

                    <TableCell>
                      <StatusBadge status={doc.status} />
                    </TableCell>

                    <TableCell sx={{ color: '#64748b' }}>
                      {new Date(doc.createdAt).toLocaleDateString(undefined, {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric'
                      })}
                    </TableCell>

                    <TableCell align="right" sx={{ pr: 3 }}>
                      <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                        <Button 
                          size="small" 
                          variant="text" 
                          sx={{ color: '#4f46e5', '&:hover': { backgroundColor: '#e0e7ff' } }}
                          onClick={() => handleViewDocument(doc)}
                        >
                          View
                        </Button>
                        <Button 
                          size="small" 
                          variant="text" 
                          color="success"
                          sx={{ '&:hover': { backgroundColor: '#dcfce7' } }}
                        >
                          Review
                        </Button>
                        <Button 
                          size="small" 
                          variant="text" 
                          color="error"
                          sx={{ '&:hover': { backgroundColor: '#fee2e2' } }}
                        >
                          Delete
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </TableContainer>

    </div>
  );
};

export default DocumentsPage;