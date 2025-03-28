import { useList, useMany } from "@refinedev/core";
import {
  Card,
  Col,
  Row,
  Typography,
  Statistic,
  Space,
  Table,
  Badge,
  Progress,
  Divider,
} from "antd";
import {
  DollarOutlined,
  ShoppingOutlined,
  UserOutlined,
  TagOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { DateField, NumberField, TagField } from "@refinedev/antd";
import {
  Area as AreaChart,
  Bar as BarChart,
  Pie as PieChart,
} from "@ant-design/plots";

const { Title, Text } = Typography;

export const Dashboard = () => {
  // Get recent orders
  const { data: orderData, isLoading: orderIsLoading } = useList({
    resource: "orders",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "orderDate",
        order: "desc",
      },
    ],
  });

  // Get top products
  const { data: productData, isLoading: productIsLoading } = useList({
    resource: "products",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "price",
        order: "desc",
      },
    ],
  });

  // Get top customers
  const { data: customerData, isLoading: customerIsLoading } = useList({
    resource: "customers",
    pagination: {
      pageSize: 5,
    },
    sorters: [
      {
        field: "totalSpent",
        order: "desc",
      },
    ],
  });

  // Fake summary data
  const summaryData = {
    totalSales: 328950.75,
    totalOrders: 1342,
    totalCustomers: 846,
    totalProducts: 247,
    averageOrderValue: 245.12,
    salesGrowth: 24.8,
    customerGrowth: 12.5,
    orderGrowth: 18.3,
  };

  // Fake chart data for sales by month
  const monthlySalesData = [
    { month: "Jan", sales: 28500 },
    { month: "Feb", sales: 32400 },
    { month: "Mar", sales: 27800 },
    { month: "Apr", sales: 35600 },
    { month: "May", sales: 31200 },
    { month: "Jun", sales: 43500 },
    { month: "Jul", sales: 38700 },
    { month: "Aug", sales: 35100 },
    { month: "Sep", sales: 42300 },
    { month: "Oct", sales: 39800 },
    { month: "Nov", sales: 36700 },
    { month: "Dec", sales: 48900 },
  ];

  // Fake chart data for orders by status
  const orderStatusData = [
    { status: "Pending", count: 42 },
    { status: "Processing", count: 68 },
    { status: "Shipped", count: 124 },
    { status: "Delivered", count: 576 },
    { status: "Cancelled", count: 23 },
    { status: "Returned", count: 18 },
  ];

  // Fake chart data for product categories
  const categoryData = [
    { category: "Electronics", count: 76 },
    { category: "Clothing", count: 53 },
    { category: "Home & Garden", count: 41 },
    { category: "Books", count: 29 },
    { category: "Sports", count: 18 },
    { category: "Toys", count: 30 },
  ];

  // Color mapping for status tags
  const statusColorMap: Record<string, string> = {
    pending: "orange",
    processing: "blue",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
    returned: "magenta",
  };

  return (
    <>
      <Title level={3}>Dashboard</Title>

      {/* Summary Cards */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Sales"
              value={summaryData.totalSales}
              prefix={<DollarOutlined />}
              precision={2}
              formatter={(value) => `$${value}`}
            />
            <Text type="secondary">
              +{summaryData.salesGrowth}% from last month
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Orders"
              value={summaryData.totalOrders}
              prefix={<ShoppingOutlined />}
            />
            <Text type="secondary">
              +{summaryData.orderGrowth}% from last month
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Total Customers"
              value={summaryData.totalCustomers}
              prefix={<UserOutlined />}
            />
            <Text type="secondary">
              +{summaryData.customerGrowth}% from last month
            </Text>
          </Card>
        </Col>
        <Col xs={24} sm={12} lg={6}>
          <Card>
            <Statistic
              title="Average Order Value"
              value={summaryData.averageOrderValue}
              prefix={<TagOutlined />}
              precision={2}
              formatter={(value) => `$${value}`}
            />
          </Card>
        </Col>
      </Row>

      {/* Charts */}
      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={16}>
          <Card title="Monthly Sales">
            <AreaChart
              height={320}
              data={monthlySalesData}
              xField="month"
              yField="sales"
              tooltip={{
                formatter: (datum: { sales: number }) => {
                  return {
                    name: "Sales",
                    value: `$${datum.sales.toLocaleString()}`,
                  };
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={8}>
          <Card title="Orders by Status">
            <PieChart
              height={320}
              data={orderStatusData}
              angleField="count"
              colorField="status"
              radius={0.75}
              innerRadius={0.6}
              label={{
                type: "inner",
                offset: "-30%",
                content: ({ percent }: { percent: number }) =>
                  `${(percent * 100).toFixed(0)}%`,
                style: {
                  fontSize: 14,
                  textAlign: "center",
                },
              }}
              tooltip={{
                formatter: (datum: { status: string; count: number }) => {
                  return { name: datum.status, value: datum.count };
                },
              }}
            />
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]} style={{ marginBottom: 16 }}>
        <Col xs={24} lg={12}>
          <Card title="Product Categories">
            <BarChart
              height={320}
              data={categoryData}
              xField="count"
              yField="category"
              tooltip={{
                formatter: (datum: { category: string; count: number }) => {
                  return { name: datum.category, value: datum.count };
                },
              }}
            />
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Products">
            <Table
              dataSource={productData?.data}
              rowKey="id"
              loading={productIsLoading}
              pagination={false}
            >
              <Table.Column
                dataIndex="name"
                title="Product"
                render={(_, record: any) => (
                  <Space>
                    <Badge status="processing" />
                    {record.name}
                  </Space>
                )}
              />
              <Table.Column
                dataIndex="price"
                title="Price"
                render={(value) => (
                  <NumberField
                    value={value}
                    options={{ style: "currency", currency: "USD" }}
                  />
                )}
              />
              <Table.Column
                dataIndex="stock"
                title="Stock"
                render={(value) => (
                  <Progress
                    percent={Math.min(100, value / 2)}
                    size="small"
                    status={value < 10 ? "exception" : "normal"}
                  />
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>

      <Row gutter={[16, 16]}>
        <Col xs={24} lg={12}>
          <Card title="Recent Orders">
            <Table
              dataSource={orderData?.data}
              rowKey="id"
              loading={orderIsLoading}
              pagination={false}
            >
              <Table.Column
                dataIndex="orderNumber"
                title="Order #"
                render={(value) => <Text code>{value}</Text>}
              />
              <Table.Column
                dataIndex="amount"
                title="Amount"
                render={(value) => (
                  <NumberField
                    value={value}
                    options={{ style: "currency", currency: "USD" }}
                  />
                )}
              />
              <Table.Column
                dataIndex="status"
                title="Status"
                render={(value) => (
                  <TagField
                    value={value}
                    color={statusColorMap[value] || "default"}
                  />
                )}
              />
              <Table.Column
                dataIndex="orderDate"
                title="Date"
                render={(value) => <DateField value={value} />}
              />
            </Table>
          </Card>
        </Col>
        <Col xs={24} lg={12}>
          <Card title="Top Customers">
            <Table
              dataSource={customerData?.data}
              rowKey="id"
              loading={customerIsLoading}
              pagination={false}
            >
              <Table.Column
                dataIndex="fullName"
                title="Customer"
                render={(value, record: any) => (
                  <Space>
                    <Badge status="success" />
                    {value}
                  </Space>
                )}
              />
              <Table.Column
                dataIndex="totalOrders"
                title="Orders"
                render={(value) => (
                  <Badge
                    count={value}
                    showZero
                    style={{ backgroundColor: "#52c41a" }}
                  />
                )}
              />
              <Table.Column
                dataIndex="totalSpent"
                title="Total Spent"
                render={(value) => (
                  <NumberField
                    value={value}
                    options={{ style: "currency", currency: "USD" }}
                  />
                )}
              />
            </Table>
          </Card>
        </Col>
      </Row>
    </>
  );
};
