import { useList } from "@refinedev/core";
import {
  Card,
  Col,
  Row,
  Typography,
  Radio,
  Select,
  DatePicker,
  Space,
  Divider,
  Table,
  Tabs,
} from "antd";
import {
  Line as LineChart,
  Bar as BarChart,
  Pie as PieChart,
  Column as ColumnChart,
} from "@ant-design/plots";
import { useState } from "react";

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { TabPane } = Tabs;

export const Analytics = () => {
  const [timeRange, setTimeRange] = useState("yearly");
  const [productCategory, setProductCategory] = useState("all");

  // Fake data for revenue trends
  const revenueData = {
    yearly: [
      { period: "2020", revenue: 245000, profit: 98000, orders: 1240 },
      { period: "2021", revenue: 287000, profit: 115000, orders: 1450 },
      { period: "2022", revenue: 346000, profit: 138000, orders: 1720 },
      { period: "2023", revenue: 429000, profit: 171000, orders: 2140 },
      { period: "2024", revenue: 512000, profit: 205000, orders: 2560 },
    ],
    quarterly: [
      { period: "Q1 2023", revenue: 98000, profit: 39000, orders: 490 },
      { period: "Q2 2023", revenue: 104000, profit: 42000, orders: 520 },
      { period: "Q3 2023", revenue: 115000, profit: 46000, orders: 580 },
      { period: "Q4 2023", revenue: 112000, profit: 44000, orders: 550 },
      { period: "Q1 2024", revenue: 121000, profit: 48000, orders: 610 },
      { period: "Q2 2024", revenue: 132000, profit: 53000, orders: 660 },
    ],
    monthly: [
      { period: "Jan 2024", revenue: 38000, profit: 15000, orders: 190 },
      { period: "Feb 2024", revenue: 42000, profit: 17000, orders: 210 },
      { period: "Mar 2024", revenue: 41000, profit: 16000, orders: 205 },
      { period: "Apr 2024", revenue: 44000, profit: 18000, orders: 220 },
      { period: "May 2024", revenue: 43000, profit: 17000, orders: 215 },
      { period: "Jun 2024", revenue: 45000, profit: 18000, orders: 225 },
    ],
  }[timeRange];

  // Fake data for sales by category
  const categorySalesData = [
    { category: "Electronics", sales: 156000, percentage: 30.5 },
    { category: "Clothing", sales: 98000, percentage: 19.1 },
    { category: "Home & Garden", sales: 87000, percentage: 17.0 },
    { category: "Books", sales: 54000, percentage: 10.5 },
    { category: "Sports", sales: 67000, percentage: 13.1 },
    { category: "Toys", sales: 50000, percentage: 9.8 },
  ];

  // Fake data for sales by region
  const regionSalesData = [
    { region: "North America", sales: 215000 },
    { region: "Europe", sales: 148000 },
    { region: "Asia", sales: 97000 },
    { region: "Australia", sales: 32000 },
    { region: "Africa", sales: 14000 },
    { region: "South America", sales: 6000 },
  ];

  // Fake data for customer demographics
  const ageDistributionData = [
    { range: "18-24", percentage: 12 },
    { range: "25-34", percentage: 28 },
    { range: "35-44", percentage: 25 },
    { range: "45-54", percentage: 18 },
    { range: "55-64", percentage: 10 },
    { range: "65+", percentage: 7 },
  ];

  const genderDistributionData = [
    { gender: "Male", percentage: 48 },
    { gender: "Female", percentage: 51 },
    { gender: "Other", percentage: 1 },
  ];

  // Fake data for product performance
  const topProductsData = [
    {
      name: "Smartphone XL Pro",
      category: "Electronics",
      revenue: 48500,
      units: 97,
    },
    {
      name: "Wireless Earbuds",
      category: "Electronics",
      revenue: 32100,
      units: 428,
    },
    {
      name: "Designer Watch",
      category: "Accessories",
      revenue: 28700,
      units: 143,
    },
    {
      name: "Laptop Ultra",
      category: "Electronics",
      revenue: 26800,
      units: 67,
    },
    {
      name: "Kitchen Mixer",
      category: "Home & Garden",
      revenue: 22400,
      units: 112,
    },
  ];

  return (
    <>
      <Row justify="space-between" align="middle" style={{ marginBottom: 16 }}>
        <Col>
          <Title level={3}>Analytics & Reporting</Title>
        </Col>
        <Col>
          <Space size="large">
            <Radio.Group
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
            >
              <Radio.Button value="monthly">Monthly</Radio.Button>
              <Radio.Button value="quarterly">Quarterly</Radio.Button>
              <Radio.Button value="yearly">Yearly</Radio.Button>
            </Radio.Group>

            <Select
              value={productCategory}
              onChange={setProductCategory}
              style={{ width: 160 }}
              options={[
                { label: "All Categories", value: "all" },
                { label: "Electronics", value: "electronics" },
                { label: "Clothing", value: "clothing" },
                { label: "Home & Garden", value: "home" },
                { label: "Books", value: "books" },
              ]}
            />

            <RangePicker />
          </Space>
        </Col>
      </Row>

      <Tabs defaultActiveKey="1">
        <TabPane tab="Revenue Analysis" key="1">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Revenue Trends">
                <LineChart
                  height={400}
                  data={revenueData}
                  xField="period"
                  yField={["revenue", "profit"]}
                  legend={{ position: "top-right" }}
                  meta={{
                    revenue: {
                      alias: "Revenue",
                      formatter: (value: number) =>
                        `$${value.toLocaleString()}`,
                    },
                    profit: {
                      alias: "Profit",
                      formatter: (value: number) =>
                        `$${value.toLocaleString()}`,
                    },
                  }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Sales by Category">
                <PieChart
                  height={320}
                  data={categorySalesData}
                  nameField="category"
                  valueField="sales"
                  meta={{
                    sales: {
                      alias: "Sales",
                      formatter: (value: number) =>
                        `$${value.toLocaleString()}`,
                    },
                  }}
                  innerRadius={0.6}
                  legend={{ position: "bottom" }}
                />

                <Divider />

                <Table
                  dataSource={categorySalesData}
                  rowKey="category"
                  pagination={false}
                  size="small"
                >
                  <Table.Column dataIndex="category" title="Category" />
                  <Table.Column
                    dataIndex="sales"
                    title="Sales"
                    render={(value) => `$${value.toLocaleString()}`}
                  />
                  <Table.Column
                    dataIndex="percentage"
                    title="% of Total"
                    render={(value) => `${value}%`}
                  />
                </Table>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Sales by Region">
                <BarChart
                  height={320}
                  data={regionSalesData}
                  xField="sales"
                  yField="region"
                  legend={false}
                  meta={{
                    sales: {
                      alias: "Sales",
                      formatter: (value: number) =>
                        `$${value.toLocaleString()}`,
                    },
                  }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Customer Analytics" key="2">
          <Row gutter={[16, 16]}>
            <Col xs={24} lg={12}>
              <Card title="Customer Age Distribution">
                <ColumnChart
                  height={300}
                  data={ageDistributionData}
                  xField="range"
                  yField="percentage"
                  meta={{
                    percentage: {
                      alias: "Percentage",
                      formatter: (value: number) => `${value}%`,
                    },
                  }}
                  legend={false}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Gender Distribution">
                <PieChart
                  height={300}
                  data={genderDistributionData}
                  nameField="gender"
                  valueField="percentage"
                  meta={{
                    percentage: {
                      alias: "Percentage",
                      formatter: (value: number) => `${value}%`,
                    },
                  }}
                  legend={{ position: "bottom" }}
                />
              </Card>
            </Col>

            <Col span={24}>
              <Card title="Customer Retention Rate">
                <LineChart
                  height={300}
                  data={[
                    { month: "Jan", rate: 86 },
                    { month: "Feb", rate: 88 },
                    { month: "Mar", rate: 87 },
                    { month: "Apr", rate: 85 },
                    { month: "May", rate: 89 },
                    { month: "Jun", rate: 91 },
                    { month: "Jul", rate: 92 },
                    { month: "Aug", rate: 93 },
                    { month: "Sep", rate: 92 },
                    { month: "Oct", rate: 94 },
                    { month: "Nov", rate: 95 },
                    { month: "Dec", rate: 96 },
                  ]}
                  xField="month"
                  yField="rate"
                  meta={{
                    rate: {
                      alias: "Retention Rate",
                      formatter: (value: number) => `${value}%`,
                    },
                  }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>

        <TabPane tab="Product Performance" key="3">
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Card title="Top Performing Products">
                <Table
                  dataSource={topProductsData}
                  rowKey="name"
                  pagination={false}
                >
                  <Table.Column dataIndex="name" title="Product Name" />
                  <Table.Column dataIndex="category" title="Category" />
                  <Table.Column
                    dataIndex="revenue"
                    title="Revenue"
                    render={(value) => `$${value.toLocaleString()}`}
                    sorter={(a, b) => a.revenue - b.revenue}
                    defaultSortOrder="descend"
                  />
                  <Table.Column
                    dataIndex="units"
                    title="Units Sold"
                    render={(value) => value.toLocaleString()}
                    sorter={(a, b) => a.units - b.units}
                  />
                  <Table.Column
                    title="Avg. Price"
                    render={(_, record) =>
                      `$${(record.revenue / record.units).toFixed(2)}`
                    }
                    sorter={(a, b) => a.revenue / a.units - b.revenue / b.units}
                  />
                </Table>
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Inventory Turnover Rate">
                <BarChart
                  height={300}
                  data={[
                    { category: "Electronics", rate: 8.2 },
                    { category: "Clothing", rate: 6.7 },
                    { category: "Home & Garden", rate: 4.9 },
                    { category: "Books", rate: 3.8 },
                    { category: "Sports", rate: 5.2 },
                    { category: "Toys", rate: 4.1 },
                  ]}
                  xField="rate"
                  yField="category"
                  meta={{
                    rate: {
                      alias: "Turnover Rate",
                      formatter: (value: number) => value.toFixed(1),
                    },
                  }}
                />
              </Card>
            </Col>

            <Col xs={24} lg={12}>
              <Card title="Product Review Ratings">
                <PieChart
                  height={300}
                  data={[
                    { rating: "5 Stars", percentage: 58 },
                    { rating: "4 Stars", percentage: 24 },
                    { rating: "3 Stars", percentage: 11 },
                    { rating: "2 Stars", percentage: 4 },
                    { rating: "1 Star", percentage: 3 },
                  ]}
                  nameField="rating"
                  valueField="percentage"
                  meta={{
                    percentage: {
                      alias: "Percentage",
                      formatter: (value: number) => `${value}%`,
                    },
                  }}
                  legend={{ position: "bottom" }}
                />
              </Card>
            </Col>
          </Row>
        </TabPane>
      </Tabs>
    </>
  );
};
