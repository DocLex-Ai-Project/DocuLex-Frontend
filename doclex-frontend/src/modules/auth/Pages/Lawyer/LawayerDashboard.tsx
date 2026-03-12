import { Grid, Paper, Typography, Box } from "@mui/material";

const LawyerDashboard = () => {
  const stats = [
    { title: "Pending Reviews", value: 12 },
    { title: "Approved Documents", value: 34 },
    { title: "Rejected Documents", value: 5 },
    { title: "Total Reviewed", value: 51 },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" fontWeight={600} mb={3}>
        Lawyer Dashboard
      </Typography>

      {/* Stats Cards */}
      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 3,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="body2" color="text.secondary">
                {stat.title}
              </Typography>

              <Typography variant="h4" fontWeight={600}>
                {stat.value}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Recent Requests Placeholder */}
      <Paper
        elevation={3}
        sx={{
          mt: 4,
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={2}>
          Recent Review Requests
        </Typography>

        <Typography color="text.secondary">
          Review requests will appear here once users submit documents for
          lawyer verification.
        </Typography>
      </Paper>
    </Box>
  );
};

export default LawyerDashboard;