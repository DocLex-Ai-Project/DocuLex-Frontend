import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Button,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  Paper,
  CircularProgress,
  Tooltip,
} from "@mui/material";
// Assuming you have these icons or you can install @mui/icons-material
import { Add as AddIcon, Description as DocIcon, Assessment as AIIcon } from "@mui/icons-material";

// import { getMyDocuments } from "../../../services/document.service";

// 1. Updated Interfaces to match your exact API payload
interface AiResult {
  id: string;
  decision: string;
  score: number;
  feedback: string;
  createdAt: string;
  documentId: string;
}

interface Document {
  id: string;
  title: string;
  source: string;
  status: string;
  createdAt: string;
  content: string | null;
  filePath: string;
  userId: string;
  lawyerId: string | null;
  lawyerDecision: string | null;
  lawyerFeedback: string | null;
  lawyerSuggestion: string | null;
  revisedContent: string | null;
  reviewedAt: string | null;
  aiResult: AiResult | null;
}

const MyDocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      // const data = await getMyDocuments();
      // setDocuments(data);
      
      // Temporary mock data mapping to your provided JSON for testing the UI
      setDocuments(mockData); 
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  // Helper: Clean up the timestamp from the filename (e.g., "1773039638539-SalarySlip.pdf" -> "SalarySlip.pdf")
  const cleanTitle = (title: string) => {
    const parts = title.split('-');
    return parts.length > 1 ? parts.slice(1).join('-') : title;
  };

  // Helper: Determine Chip color based on status
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'default';
      case 'REVIEW_REQUESTED': return 'warning';
      case 'REVIEWED': return 'success';
      default: return 'primary';
    }
  };

  // Helper: Determine AI Score color
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 50) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <Typography variant="h4" fontWeight="bold" sx={{ color: '#1e293b' }}>
            My Documents
          </Typography>
          <Typography variant="body2" sx={{ color: '#64748b', mt: 0.5 }}>
            Manage your legal drafts and uploaded files
          </Typography>
        </div>

        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          sx={{ 
            backgroundColor: '#4f46e5', 
            textTransform: 'none',
            fontWeight: 600,
            padding: '8px 20px',
            borderRadius: '8px',
            '&:hover': { backgroundColor: '#4338ca' }
          }}
        >
          Create Document
        </Button>
      </div>

      {/* Table Container */}
      <TableContainer 
        component={Paper} 
        elevation={0}
        className="border border-gray-200 shadow-sm rounded-xl overflow-hidden"
      >
        {loading ? (
          <div className="flex justify-center items-center p-12">
            <CircularProgress size={40} sx={{ color: '#4f46e5' }} />
          </div>
        ) : (
          <Table sx={{ minWidth: 700 }}>
            <TableHead sx={{ backgroundColor: '#f8fafc' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Document Title</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Type</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>AI Score</TableCell>
                <TableCell sx={{ fontWeight: 600, color: '#475569' }}>Created At</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600, color: '#475569' }}>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={6} align="center" sx={{ py: 8 }}>
                    <Typography color="textSecondary">No documents found.</Typography>
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc) => (
                  <TableRow 
                    key={doc.id}
                    hover
                    sx={{ '&:last-child td, &:last-child th': { border: 0 }, transition: 'background-color 0.2s' }}
                  >
                    {/* Title */}
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
                          <DocIcon fontSize="small" />
                        </div>
                        <Typography variant="body2" fontWeight="500" sx={{ color: '#0f172a' }}>
                          {cleanTitle(doc.title)}
                        </Typography>
                      </div>
                    </TableCell>

                    {/* Source */}
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b', fontSize: '0.85rem', fontWeight: 500 }}>
                        {doc.source}
                      </Typography>
                    </TableCell>

                    {/* Status */}
                    <TableCell>
                      <Chip 
                        label={doc.status.replace('_', ' ')} 
                        size="small" 
                        color={getStatusColor(doc.status)}
                        sx={{ fontWeight: 600, fontSize: '0.75rem', borderRadius: '6px' }}
                      />
                    </TableCell>

                    {/* AI Score */}
                    <TableCell>
                      {doc.aiResult ? (
                        <Tooltip title={doc.aiResult.feedback} arrow placement="top">
                          <div className={`flex items-center gap-1.5 font-bold ${getScoreColor(doc.aiResult.score)} cursor-pointer`}>
                            <AIIcon fontSize="small" />
                            {doc.aiResult.score}%
                          </div>
                        </Tooltip>
                      ) : (
                        <Typography variant="body2" sx={{ color: '#94a3b8' }}>
                          Pending
                        </Typography>
                      )}
                    </TableCell>

                    {/* Date */}
                    <TableCell>
                      <Typography variant="body2" sx={{ color: '#64748b' }}>
                        {new Date(doc.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric'
                        })}
                      </Typography>
                    </TableCell>

                    {/* Actions */}
                    <TableCell align="right">
                      <div className="flex justify-end gap-2">
                        <Button 
                          size="small" 
                          sx={{ color: '#4f46e5', minWidth: 'auto', '&:hover': { backgroundColor: '#e0e7ff' } }}
                        >
                          View
                        </Button>
                        <Button 
                          size="small" 
                          color="error"
                          sx={{ minWidth: 'auto', '&:hover': { backgroundColor: '#fee2e2' } }}
                        >
                          Delete
                        </Button>
                      </div>
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

export default MyDocumentsPage;

// Mock data strictly for immediate UI testing, matching your JSON payload
const mockData: Document[] = [
  // ... (Your JSON payload would go here if testing, otherwise rely on the API fetch)
];