import { useEffect, useState } from "react";
import {
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
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Dialog,
  DialogContent,
  LinearProgress,
  Stack,
} from "@mui/material";
import {
  Add as AddIcon,
  Description as DocIcon,
  Assessment as AIIcon,
  AutoFixHigh as MagicIcon,
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  Gavel as GavelIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

import axiosInstance from "../../../utils/axiosInstance";
import DialogView from "./DialogView";

// ================= TYPES =================
// Aligned with your provided Enum
type DocumentStatus = "DRAFT" | "AI_REVIEWED" | "REVIEW_REQUESTED" | "APPROVED" | "REJECTED";

interface AiResult {
  id: string;
  score: number;
  feedback: string;
  riskLevel?: string;
  missingFields?: string[];
  summary?: string;
}

interface Document {
  id: string;
  title: string;
  source: "UPLOAD" | "MANUAL";
  status: DocumentStatus;
  createdAt: string;
  aiResult: AiResult | null;
}

// ================= COMPONENT =================

const MyDocumentsPage = () => {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Local state to track which ID is currently being processed by AI
  const [processingId, setProcessingId] = useState<string | null>(null);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<Document | null>(null);
  const [DocID, setDocID] = useState<string>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [aiDialogOpen, setAiDialogOpen] = useState(false);
const [aiData, setAiData] = useState<any>(null);
const [aiLoading, setAiLoading] = useState(false);
const [aiError, setAiError] = useState<string | null>(null);

  const open = Boolean(anchorEl);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, doc: Document) => {
    setAnchorEl(event.currentTarget);
    setSelectedDoc(doc);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // --- API CALLS ---

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const data = await axiosInstance.get('/api/documents/my-documents');
      setDocuments(data.data);
    } catch (error) {
      console.error("Failed to fetch documents", error);
    } finally {
      setLoading(false);
    }
  };

const handleRunAI = async () => {
  if (!selectedDoc) return;

  const currentId = selectedDoc.id;

  handleMenuClose();
  setAiDialogOpen(true);
  setAiError(null); // reset error

  if (selectedDoc.aiResult) {
    setAiData(selectedDoc.aiResult);
    return;
  }

  try {
    setAiLoading(true);

    const res = await axiosInstance.post(
      `/api/documents/${currentId}/ai-review`
    );

    setAiData(res.data);
  } catch (error: any) {
    console.error("AI Review failed", error);

    // ✅ capture backend error
    setAiError(
      error?.response?.data?.message ||
      "AI service is currently unavailable"
    );
  } finally {
    setAiLoading(false);
  }
};

  useEffect(() => {
    fetchDocuments();
  }, []);

  // ================= HELPERS =================
  const getStatusColor = (status: DocumentStatus) => {
    switch (status) {
      case "DRAFT": return "default";
      case "AI_REVIEWED": return "info";
      case "REVIEW_REQUESTED": return "secondary";
      case "APPROVED": return "success";
      case "REJECTED": return "error";
      default: return "default";
    }
  };

  return (
    <>
      <div className="p-8 max-w-7xl mx-auto min-h-screen bg-slate-50/50">
        
        <div className="flex justify-between items-center mb-8">
          <div>
            <Typography variant="h4" fontWeight="bold">My Documents</Typography>
            <Typography variant="body2" color="textSecondary">Manage and analyze your legal files</Typography>
          </div>
          <Button variant="contained" startIcon={<AddIcon />} sx={{ backgroundColor: "#4f46e5" }}>
            Create Document
          </Button>
        </div>

        <TableContainer component={Paper} elevation={0} className="border border-gray-200 rounded-xl overflow-hidden">
          {loading ? (
            <div className="flex justify-center p-12"><CircularProgress /></div>
          ) : (
            <Table>
              <TableHead sx={{ backgroundColor: "#f8fafc" }}>
                <TableRow>
                  <TableCell>Document</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>AI Score</TableCell>
                  <TableCell>Created</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {documents.map((doc) => {
                  const isCurrentRowProcessing = processingId === doc.id;
                  
                  return (
                    <TableRow key={doc.id} hover>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <DocIcon color="action" />
                          <Typography fontWeight={500}>{doc.title.split('-').pop()}</Typography>
                        </div>
                      </TableCell>

                      <TableCell>
                        <Chip
                          label={isCurrentRowProcessing ? "ANALYZING..." : doc.status.replace("_", " ")}
                          size="small"
                          color={isCurrentRowProcessing ? "warning" : getStatusColor(doc.status)}
                          icon={isCurrentRowProcessing ? <CircularProgress size={14} color="inherit" /> : undefined}
                        />
                      </TableCell>

                      <TableCell>
                        {doc.aiResult ? (
                          <div className="flex items-center gap-1.5 font-bold text-indigo-600">
                            <AIIcon fontSize="small" /> {doc.aiResult.score}%
                          </div>
                        ) : (
                          <Typography variant="caption" color="textSecondary">
                            {isCurrentRowProcessing ? "Calculating..." : "No Data"}
                          </Typography>
                        )}
                      </TableCell>

                      <TableCell>{new Date(doc.createdAt).toLocaleDateString()}</TableCell>

                      <TableCell align="right">
                        <IconButton onClick={(e) => handleMenuOpen(e, doc)} disabled={isCurrentRowProcessing}>
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </TableContainer>
      </div>

      {/* --- PROCESSING OVERLAY DIALOG --- */}
      <Dialog open={!!processingId} maxWidth="xs" fullWidth>
        <DialogContent sx={{ textAlign: 'center', py: 4 }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography variant="h6">Running AI Legal Review</Typography>
          <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
            Extracting clauses and validating legal compliance...
          </Typography>
          <LinearProgress />
        </DialogContent>
      </Dialog>

      {/* --- ACTIONS MENU --- */}
      <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
        <MenuItem onClick={() => { setDocID(selectedDoc!.id); setOpenDialog(true); handleMenuClose(); }}>
          <ListItemIcon><VisibilityIcon fontSize="small" /></ListItemIcon>
          <ListItemText>View Details</ListItemText>
        </MenuItem>

        {/* Only show "Run AI Review" if the document is in DRAFT status */}
        {selectedDoc?.status === "DRAFT" && (
          <MenuItem onClick={handleRunAI}>
            <ListItemIcon><MagicIcon fontSize="small" color="primary" /></ListItemIcon>
            <ListItemText sx={{ color: "#4f46e5", fontWeight: 600 }}>Run AI Review</ListItemText>
          </MenuItem>
        )}

        {selectedDoc?.status === "AI_REVIEWED" && (
          <MenuItem onClick={handleMenuClose}>
            <ListItemIcon><GavelIcon fontSize="small" /></ListItemIcon>
            <ListItemText>Request Lawyer Signature</ListItemText>
          </MenuItem>
        )}

        <MenuItem onClick={handleMenuClose} sx={{ color: 'error.main' }}>
          <ListItemIcon><DeleteIcon fontSize="small" color="error" /></ListItemIcon>
          <ListItemText>Delete</ListItemText>
        </MenuItem>
      </Menu>

      <DialogView open={openDialog} close={() => setOpenDialog(false)} id={DocID} />


   <Dialog open={aiDialogOpen} onClose={() => setAiDialogOpen(false)} maxWidth="md" fullWidth>
  <DialogContent>

    {/* 🔄 LOADING */}
    {aiLoading && (
      <div style={{ textAlign: "center", padding: 20 }}>
        <CircularProgress />
        <Typography mt={2}>Analyzing document...</Typography>
      </div>
    )}

    {/* ❌ ERROR */}
    {!aiLoading && aiError && (
      <div style={{ textAlign: "center", padding: 20 }}>
        <Typography variant="h6" color="error">
          AI Analysis Failed
        </Typography>

        <Typography mt={1} color="textSecondary">
          {aiError}
        </Typography>

        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={handleRunAI}
        >
          Try Again
        </Button>
      </div>
    )}

    {/* ✅ RESULT */}
    {!aiLoading && !aiError && aiData && (
      <>
        {/* SCORE */}
        <Typography variant="h6">AI Score</Typography>
        <LinearProgress
          variant="determinate"
          value={aiData.score}
          sx={{ height: 10, borderRadius: 5, mt: 1 }}
        />
        <Typography>{aiData.score}%</Typography>

        {/* RISK */}
        <Typography mt={2} variant="h6">Risk Level</Typography>
        <Chip
          label={aiData.riskLevel}
          color={
            aiData.riskLevel === "LOW"
              ? "success"
              : aiData.riskLevel === "MEDIUM"
              ? "warning"
              : "error"
          }
        />

        {/* MISSING */}
        <Typography mt={2} variant="h6">Missing Clauses</Typography>
        <Stack direction="row" flexWrap="wrap" gap={1}>
          {aiData.missingFields?.map((f: string, i: number) => (
            <Chip key={i} label={f} />
          ))}
        </Stack>

        {/* SUMMARY */}
        <Typography mt={2} variant="h6">Summary</Typography>
        <Typography>{aiData.summary}</Typography>
      </>
    )}

  </DialogContent>
</Dialog>
    </>
  );
};

export default MyDocumentsPage; 