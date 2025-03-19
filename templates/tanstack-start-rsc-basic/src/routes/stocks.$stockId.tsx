import { createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Box,
  Typography,
  Paper,
  Grid,
  Chip,
  Card,
  CardContent,
  Alert,
  Divider,
  Stack,
  LinearProgress,
} from "@mui/material";
import { stockByIdQueryOptions } from "../utils/stocks";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import TimelineIcon from "@mui/icons-material/Timeline";
import BarChartIcon from "@mui/icons-material/BarChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

export const Route = createFileRoute("/stocks/$stockId")({
  loader: async ({ context, params }) => {
    try {
      // Prefetch stock data on the server
      await context.queryClient.ensureQueryData(
        stockByIdQueryOptions(params.stockId)
      );
      return { notFound: false };
    } catch (error) {
      // Handle not found case
      return { notFound: true, error: String(error) };
    }
  },
  component: StockDetailPage,
});

// Helper to format currency
const formatCurrency = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(num);
};

// Helper to format large numbers
const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US").format(num);
};

// Helper to format market cap in billions/trillions
const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1e12) {
    return `${(marketCap / 1e12).toFixed(2)} Trillion`;
  } else {
    return `${(marketCap / 1e9).toFixed(2)} Billion`;
  }
};

// Format the date in a human-readable way
function formatDate(dateString: string) {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  }).format(date);
}

// Helper to get color based on positive/negative
const getChangeColor = (change: number) => {
  return change >= 0 ? "success.main" : "error.main";
};

// Helper to get icon based on positive/negative
const getChangeIcon = (change: number) => {
  return change >= 0 ? <TrendingUpIcon /> : <TrendingDownIcon />;
};

// Calculate price position in 52-week range (0-100%)
const calculateRangePosition = (current: number, low: number, high: number) => {
  return ((current - low) / (high - low)) * 100;
};

function StockDetailPage() {
  const { notFound, error } = Route.useLoaderData();
  const { stockId } = Route.useParams();

  if (notFound) {
    return (
      <Alert severity="error" sx={{ mt: 2 }}>
        Stock data not found. Error: {error}
      </Alert>
    );
  }

  const stockQuery = useSuspenseQuery(stockByIdQueryOptions(stockId));
  const stock = stockQuery.data;

  // Calculate the day's range
  const dayRangePercent = calculateRangePosition(
    stock.price,
    stock.dayLow,
    stock.dayHigh
  );

  // Calculate the 52-week range
  const weekRangePercent = calculateRangePosition(
    stock.price,
    stock.weekLow52,
    stock.weekHigh52
  );

  return (
    <Box>
      <Paper elevation={3} sx={{ p: 3, mb: 4 }}>
        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
          <ShowChartIcon
            sx={{
              fontSize: 40,
              mr: 2,
              color: getChangeColor(stock.change),
            }}
          />
          <Box>
            <Typography variant="h4" component="h2">
              {stock.symbol}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              {stock.name}
            </Typography>
          </Box>
          <Chip
            label={stock.sector}
            color="primary"
            variant="outlined"
            sx={{ ml: "auto" }}
          />
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={3}>
                  <Grid item xs={6}>
                    <Typography variant="h3" component="div" fontWeight="bold">
                      {formatCurrency(stock.price)}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: getChangeColor(stock.change),
                        mt: 1,
                      }}
                    >
                      {getChangeIcon(stock.change)}
                      <Typography
                        variant="body1"
                        sx={{ color: "inherit", ml: 1 }}
                      >
                        {formatCurrency(stock.change)} (
                        {stock.changePercent.toFixed(2)}%)
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid item xs={6} sx={{ textAlign: "right" }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        mb: 1,
                      }}
                    >
                      <AccessTimeIcon
                        sx={{ fontSize: 16, mr: 0.5, color: "text.secondary" }}
                      />
                      <Typography variant="caption" color="text.secondary">
                        Last updated: {formatDate(stock.updateTime)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      Market Cap: {formatMarketCap(stock.marketCap)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Volume: {formatNumber(stock.volume)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={5}>
            <Card variant="outlined" sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle2" gutterBottom>
                  Day's Range
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(stock.dayLow)}
                  </Typography>
                  <Box sx={{ position: "relative", mx: 2, flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={dayRangePercent}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: "grey.300",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: -8,
                        left: `${dayRangePercent}%`,
                        transform: "translateX(-50%)",
                        color: "primary.main",
                      }}
                    >
                      ▼
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(stock.dayHigh)}
                  </Typography>
                </Box>

                <Typography variant="subtitle2" gutterBottom>
                  52-Week Range
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(stock.weekLow52)}
                  </Typography>
                  <Box sx={{ position: "relative", mx: 2, flexGrow: 1 }}>
                    <LinearProgress
                      variant="determinate"
                      value={weekRangePercent}
                      sx={{
                        height: 8,
                        borderRadius: 1,
                        backgroundColor: "grey.300",
                      }}
                    />
                    <Box
                      sx={{
                        position: "absolute",
                        top: -8,
                        left: `${weekRangePercent}%`,
                        transform: "translateX(-50%)",
                        color: "primary.main",
                      }}
                    >
                      ▼
                    </Box>
                  </Box>
                  <Typography variant="body2" color="text.secondary">
                    {formatCurrency(stock.weekHigh52)}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <StockInfoCard
            title="Company Info"
            icon={<ShowChartIcon color="primary" />}
            items={[
              { label: "Symbol", value: stock.symbol },
              { label: "Name", value: stock.name },
              { label: "Sector", value: stock.sector },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StockInfoCard
            title="Trading Info"
            icon={<BarChartIcon color="primary" />}
            items={[
              { label: "P/E Ratio", value: stock.pe.toFixed(2) },
              {
                label: "Dividend Yield",
                value: stock.dividend ? `${stock.dividend.toFixed(2)}%` : "N/A",
              },
              { label: "Volume", value: formatNumber(stock.volume) },
            ]}
          />
        </Grid>

        <Grid item xs={12} md={4}>
          <StockInfoCard
            title="Value Info"
            icon={<LocalAtmIcon color="primary" />}
            items={[
              { label: "Market Cap", value: formatMarketCap(stock.marketCap) },
              { label: "Current Price", value: formatCurrency(stock.price) },
              {
                label: "Change",
                value: `${formatCurrency(stock.change)} (${stock.changePercent.toFixed(2)}%)`,
                color: getChangeColor(stock.change),
              },
            ]}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

type InfoItem = {
  label: string;
  value: string | number;
  color?: string;
};

function StockInfoCard({
  title,
  icon,
  items,
}: {
  title: string;
  icon: React.ReactNode;
  items: InfoItem[];
}) {
  return (
    <Card variant="outlined" sx={{ height: "100%" }}>
      <CardContent>
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <Box sx={{ mr: 1 }}>{icon}</Box>
          <Typography variant="h6">{title}</Typography>
        </Box>

        <Stack spacing={1.5}>
          {items.map((item, index) => (
            <Box key={index}>
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
              <Typography
                variant="body1"
                fontWeight="medium"
                sx={{ color: item.color }}
              >
                {item.value}
              </Typography>
              {index < items.length - 1 && <Divider sx={{ mt: 1.5 }} />}
            </Box>
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
}
