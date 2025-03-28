import { NumberField, TagField, DateField, TextField } from "@refinedev/antd";
import { useShow, useList } from "@refinedev/core";
import {
  Typography,
  Row,
  Col,
  Card,
  Descriptions,
  Tabs,
  Table,
  Avatar,
  Space,
  Tag,
  Statistic,
} from "antd";
import {
  UserOutlined,
  ShoppingCartOutlined,
  DollarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

const { Title, Text } = Typography;
const { TabPane } = Tabs;

export const CustomerShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  const { data: orderData, isLoading: orderIsLoading } = useList({
    resource: "orders",
    filters: [
      {
        field: "customer.id",
        operator: "eq",
        value: record?.id,
      },
    ],
    queryOptions: {
      enabled: !!record,
    },
  });

  const colorMap: Record<string, string> = {
    new: "blue",
    regular: "green",
    vip: "gold",
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card loading={isLoading}>
          <Row justify="space-between" align="middle">
            <Col>
              <Space>
                <Avatar
                  size={64}
                  src={record?.avatar}
                  icon={<UserOutlined />}
                />
                <Space direction="vertical">
                  <Title level={3}>{record?.fullName}</Title>
                  <TagField
                    value={record?.customerType}
                    color={colorMap[record?.customerType] || "default"}
                  />
                </Space>
              </Space>
            </Col>
            <Col>
              <Space size="large">
                <Statistic
                  title="Orders"
                  value={record?.totalOrders || 0}
                  prefix={<ShoppingCartOutlined />}
                />
                <Statistic
                  title="Total Spent"
                  value={record?.totalSpent || 0}
                  prefix={<DollarOutlined />}
                  precision={2}
                  formatter={(value) => `$${value}`}
                />
                <Statistic
                  title="Customer Since"
                  value={record?.createdAt}
                  prefix={<FieldTimeOutlined />}
                  formatter={(value) =>
                    value ? new Date(value).toLocaleDateString() : "N/A"
                  }
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card>
          <Tabs defaultActiveKey="1">
            <TabPane tab="Details" key="1">
              <Row gutter={16}>
                <Col span={12}>
                  <Card title="Contact Information" loading={isLoading}>
                    <Descriptions column={1} bordered>
                      <Descriptions.Item label="Full Name">
                        {record?.fullName}
                      </Descriptions.Item>
                      <Descriptions.Item label="Email">
                        {record?.email}
                      </Descriptions.Item>
                      <Descriptions.Item label="Phone">
                        {record?.phone}
                      </Descriptions.Item>
                      <Descriptions.Item label="Address">
                        {record?.address}
                      </Descriptions.Item>
                      <Descriptions.Item label="City">
                        {record?.city}
                      </Descriptions.Item>
                      <Descriptions.Item label="State">
                        {record?.state}
                      </Descriptions.Item>
                      <Descriptions.Item label="Zip Code">
                        {record?.zipCode}
                      </Descriptions.Item>
                      <Descriptions.Item label="Country">
                        {record?.country}
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
                <Col span={12}>
                  <Card title="Customer Details" loading={isLoading}>
                    <Descriptions column={1} bordered>
                      <Descriptions.Item label="Customer ID">
                        {record?.id}
                      </Descriptions.Item>
                      <Descriptions.Item label="Customer Type">
                        <TagField
                          value={record?.customerType}
                          color={colorMap[record?.customerType] || "default"}
                        />
                      </Descriptions.Item>
                      <Descriptions.Item label="Tags">
                        <Space>
                          {record?.tags?.map((tag: string) => (
                            <Tag key={tag} color="blue">
                              {tag}
                            </Tag>
                          ))}
                        </Space>
                      </Descriptions.Item>
                      <Descriptions.Item label="Notes">
                        {record?.notes || "No notes available"}
                      </Descriptions.Item>
                      <Descriptions.Item label="Created At">
                        <DateField value={record?.createdAt} />
                      </Descriptions.Item>
                    </Descriptions>
                  </Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane tab="Orders" key="2">
              <Card loading={orderIsLoading}>
                <Table
                  dataSource={orderData?.data}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                >
                  <Table.Column dataIndex="id" title="Order ID" />
                  <Table.Column dataIndex="orderNumber" title="Order #" />
                  <Table.Column
                    dataIndex="amount"
                    title="Amount"
                    render={(value) => `$${value?.toLocaleString() || 0}`}
                  />
                  <Table.Column
                    dataIndex="status"
                    title="Status"
                    render={(value) => {
                      const statusColorMap: Record<string, string> = {
                        pending: "orange",
                        processing: "blue",
                        shipped: "purple",
                        delivered: "green",
                        cancelled: "red",
                        returned: "magenta",
                      };
                      return (
                        <TagField
                          value={value}
                          color={statusColorMap[value] || "default"}
                        />
                      );
                    }}
                  />
                  <Table.Column
                    dataIndex="orderDate"
                    title="Date"
                    render={(value) => <DateField value={value} />}
                  />
                </Table>
              </Card>
            </TabPane>
          </Tabs>
        </Card>
      </Col>
    </Row>
  );
};
