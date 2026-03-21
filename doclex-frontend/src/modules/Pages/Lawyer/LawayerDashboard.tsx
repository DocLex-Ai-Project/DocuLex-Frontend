import {
  Box,
  Typography,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  CircularProgress,
  Chip,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axiosInstance";
import { enqueueSnackbar } from "notistack";

interface DocumentType {
  id: string;
  title: string;
  status: string;
  createdAt: string;
}

interface AnalyticsType {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

const LawyerDashboard = () => {
  const [documents, setDocuments] = useState<DocumentType[]>([]);
  const [loading, setLoading] = useState(false);

  const [analytics, setAnalytics] = useState<AnalyticsType>({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0,
  });

  // ================= FETCH DATA =================

  const fetchReviewQueue = async () => {
    try {
      setLoading(true);
      const res = await axiosInstance.get("/api/documents/review-queue");
      setDocuments(res.data);
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Failed to fetch review queue", { variant: "error" });
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const res = await axiosInstance.get("/api/documents/analytics");
      setAnalytics(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  // ================= ACTION =================

  const handleReview = async (id: string, decision: "APPROVED" | "REJECTED") => {
    try {
      await axiosInstance.post(`/api/documents/${id}/review`, {
        decision,
        comment:
          decision === "APPROVED"
            ? "Approved by lawyer"
            : "Rejected by lawyer",
      });

      enqueueSnackbar(`Document ${decision}`, { variant: "success" });

      fetchReviewQueue();
      fetchAnalytics();
    } catch (error) {
      console.error(error);
      enqueueSnackbar("Action failed", { variant: "error" });
    }
  };

  useEffect(() => {
    fetchReviewQueue();
    fetchAnalytics();
  }, []);

  // ================= STATUS COLOR =================

  const getStatusColor = (status: string) => {
    switch (status) {
      case "REVIEW_REQUESTED":
        return "warning";
      case "APPROVED":
        return "success";
      case "REJECTED":
        return "error";
      default:
        return "default";
    }
  };

  // ================= UI =================

  return (
    <Box p={3}>
      {/* HEADER */}
      <Typography variant="h5" fontWeight={600} mb={3}>
        Lawyer Dashboard
      </Typography>

      {/* ================= ANALYTICS ================= */}
      <Grid container spacing={2} mb={3}>
        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2">Total Documents</Typography>
              <Typography variant="h5" fontWeight={600}>
                {analytics.total}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2">Pending Review</Typography>
              <Typography variant="h5" fontWeight={600}>
                {analytics.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2">Approved</Typography>
              <Typography variant="h5" fontWeight={600} color="green">
                {analytics.approved}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ borderRadius: 3 }}>
            <CardContent>
              <Typography variant="subtitle2">Rejected</Typography>
              <Typography variant="h5" fontWeight={600} color="red">
                {analytics.rejected}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* ================= TABLE ================= */}
      <Paper sx={{ borderRadius: 3 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" p={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <strong>Title</strong>
                </TableCell>
                <TableCell>
                  <strong>Status</strong>
                </TableCell>
                <TableCell>
                  <strong>Created</strong>
                </TableCell>
                <TableCell align="center">
                  <strong>Actions</strong>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>

                  <TableCell>
                    <Chip
                      label={doc.status}
                      color={getStatusColor(doc.status) as any}
                      size="small"
                    />
                  </TableCell>

                  <TableCell>
                    {new Date(doc.createdAt).toLocaleDateString()}
                  </TableCell>

                  <TableCell align="center">
                    <Button
                      variant="contained"
                      color="success"
                      size="small"
                      sx={{ mr: 1 }}
                      onClick={() => handleReview(doc.id, "APPROVED")}
                    >
                      Approve
                    </Button>

                    <Button
                      variant="outlined"
                      color="error"
                      size="small"
                      onClick={() => handleReview(doc.id, "REJECTED")}
                    >
                      Reject
                    </Button>
                  </TableCell>
                </TableRow>
              ))}

              {documents.length === 0 && (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No documents pending review
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        )}
      </Paper>
    </Box>
  );
};

export default LawyerDashboard;