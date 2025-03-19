import { Outlet, createFileRoute } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import {
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  IconButton,
  Tooltip,
} from "@mui/material";
import { useState, useMemo } from "react";
import {
  allStocksQueryOptions,
  stocksBySectorQueryOptions,
  Stock,
} from "../utils/stocks";
import { CustomLink } from "~/components/CustomLink";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import InfoIcon from "@mui/icons-material/Info";

export const Route = createFileRoute("/stocks")({
  loader: async ({ context }) => {
    // Prefetch stocks data on the server
    await context.queryClient.ensureQueryData(allStocksQueryOptions());
  },
  component: StocksLayoutComponent,
});

// Helper to format large numbers
const formatNumber = (num: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat("en-US", options).format(num);
};

// Helper to format currency
const formatCurrency = (num: number) => {
  return formatNumber(num, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  });
};

// Helper to format market cap in billions/trillions
const formatMarketCap = (marketCap: number) => {
  if (marketCap >= 1e12) {
    return `${(marketCap / 1e12).toFixed(2)}T`;
  } else {
    return `${(marketCap / 1e9).toFixed(2)}B`;
  }
};

// Helper to get change color based on positive/negative
const getChangeColor = (change: number) => {
  return change >= 0 ? "success.main" : "error.main";
};

// Helper to get change icon based on positive/negative
const getChangeIcon = (change: number) => {
  return change >= 0 ? (
    <ArrowUpwardIcon fontSize="small" />
  ) : (
    <ArrowDownwardIcon fontSize="small" />
  );
};

type SortConfig = {
  key: keyof Stock | null;
  direction: "asc" | "desc";
};

function StocksLayoutComponent() {
  const [sector, setSector] = useState<string>("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "marketCap",
    direction: "desc",
  });

  // Use sector filter if selected, otherwise use all stocks
  const queryOptions =
    sector === "all"
      ? allStocksQueryOptions()
      : stocksBySectorQueryOptions(sector);

  const stocksQuery = useSuspenseQuery(queryOptions);

  // Extract unique sectors from all stocks for the filter dropdown
  const sectors = useMemo(() => {
    return [...new Set(stocksQuery.data.map((stock) => stock.sector))];
  }, [stocksQuery.data]);

  // Sort the stocks based on sortConfig
  const sortedStocks = useMemo(() => {
    const stocks = [...stocksQuery.data];
    if (sortConfig.key) {
      stocks.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof Stock];
        const bValue = b[sortConfig.key as keyof Stock];

        if (aValue < bValue) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return stocks;
  }, [stocksQuery.data, sortConfig]);

  const handleSectorChange = (event: SelectChangeEvent) => {
    setSector(event.target.value);
  };

  const handleSort = (key: keyof Stock) => {
    // If clicking the same column, toggle direction
    if (sortConfig.key === key) {
      setSortConfig({
        key,
        direction: sortConfig.direction === "asc" ? "desc" : "asc",
      });
    } else {
      // Default to descending for new column, except for name/symbol which default to ascending
      const initialDirection =
        key === "name" || key === "symbol" ? "asc" : "desc";
      setSortConfig({ key, direction: initialDirection });
    }
  };

  // Helper to render sort indicator
  const renderSortIcon = (key: keyof Stock) => {
    if (sortConfig.key !== key) return null;

    return sortConfig.direction === "asc" ? (
      <ArrowUpwardIcon
        fontSize="small"
        sx={{ ml: 0.5, fontSize: "1rem", verticalAlign: "middle" }}
      />
    ) : (
      <ArrowDownwardIcon
        fontSize="small"
        sx={{ ml: 0.5, fontSize: "1rem", verticalAlign: "middle" }}
      />
    );
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Stock Market Tracker
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Server-side rendered stock market data with client-side sorting and
        filtering
      </Typography>

      <Box sx={{ mb: 3, display: "flex", justifyContent: "flex-end" }}>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel id="sector-filter-label">Filter by Sector</InputLabel>
          <Select
            labelId="sector-filter-label"
            value={sector}
            label="Filter by Sector"
            onChange={handleSectorChange}
          >
            <MenuItem value="all">All Sectors</MenuItem>
            {sectors.map((sector) => (
              <MenuItem key={sector} value={sector}>
                {sector}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>

      <TableContainer component={Paper} sx={{ mb: 4 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell
                onClick={() => handleSort("symbol")}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Symbol {renderSortIcon("symbol")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("name")}
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Company {renderSortIcon("name")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("price")}
                align="right"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Price {renderSortIcon("price")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("changePercent")}
                align="right"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Change % {renderSortIcon("changePercent")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("marketCap")}
                align="right"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Market Cap {renderSortIcon("marketCap")}
              </TableCell>
              <TableCell
                onClick={() => handleSort("volume")}
                align="right"
                sx={{ fontWeight: "bold", cursor: "pointer" }}
              >
                Volume {renderSortIcon("volume")}
              </TableCell>
              <TableCell align="center">Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedStocks.map((stock) => (
              <TableRow
                key={stock.id}
                hover
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <ShowChartIcon
                      sx={{
                        mr: 1,
                        color: getChangeColor(stock.change),
                        fontSize: "1.2rem",
                      }}
                    />
                    <Typography variant="body2" fontWeight="bold">
                      {stock.symbol}
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{stock.name}</TableCell>
                <TableCell align="right">
                  {formatCurrency(stock.price)}
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      color: getChangeColor(stock.change),
                    }}
                  >
                    {getChangeIcon(stock.change)}
                    <Typography
                      variant="body2"
                      sx={{ color: "inherit", ml: 0.5 }}
                    >
                      {stock.changePercent.toFixed(2)}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell align="right">
                  {formatMarketCap(stock.marketCap)}
                </TableCell>
                <TableCell align="right">
                  {formatNumber(stock.volume)}
                </TableCell>
                <TableCell align="center">
                  <CustomLink
                    to="/stocks/$stockId"
                    params={{ stockId: stock.id }}
                    style={{ textDecoration: "none" }}
                  >
                    <Tooltip title="View details">
                      <IconButton size="small" color="primary">
                        <InfoIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </CustomLink>
                </TableCell>
              </TableRow>
            ))}

            {sortedStocks.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                  <Typography variant="body1">
                    No stocks found in this sector.
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <Outlet />
    </Box>
  );
}
