import { NumberField, TagField, DateField, TextField } from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import {
  Typography,
  Space,
  Row,
  Col,
  Card,
  Descriptions,
  Steps,
  Table,
  Divider,
  Tag,
} from "antd";

const { Title, Text } = Typography;

export const OrderShow = () => {
  const { queryResult } = useShow();
  const { data, isLoading } = queryResult;

  const record = data?.data;

  const { data: customerData, isLoading: customerIsLoading } = useOne({
    resource: "customers",
    id: record?.customer?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  const getStatusStep = (status: string) => {
    switch (status) {
      case "pending":
        return 0;
      case "processing":
        return 1;
      case "shipped":
        return 2;
      case "delivered":
        return 3;
      case "cancelled":
        return 4;
      case "returned":
        return 5;
      default:
        return 0;
    }
  };

  const statusColorMap: Record<string, string> = {
    pending: "orange",
    processing: "blue",
    shipped: "purple",
    delivered: "green",
    cancelled: "red",
    returned: "magenta",
  };

  const paymentStatusColorMap: Record<string, string> = {
    pending: "orange",
    paid: "green",
    failed: "red",
    refunded: "purple",
  };

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <Card loading={isLoading || customerIsLoading}>
          <Row justify="space-between" align="middle">
            <Col>
              <Space direction="vertical">
                <Title level={3}>Order #{record?.orderNumber}</Title>
                <Text type="secondary">
                  Placed on <DateField value={record?.orderDate} />
                </Text>
              </Space>
            </Col>
            <Col>
              <Space>
                <TagField
                  value={record?.status}
                  color={statusColorMap[record?.status] || "default"}
                />
                <TagField
                  value={record?.paymentStatus}
                  color={
                    paymentStatusColorMap[record?.paymentStatus] || "default"
                  }
                />
              </Space>
            </Col>
          </Row>
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Order Status" loading={isLoading}>
          <Steps
            current={getStatusStep(record?.status)}
            status={record?.status === "cancelled" ? "error" : "process"}
            items={[
              { title: "Pending" },
              { title: "Processing" },
              { title: "Shipped" },
              { title: "Delivered" },
              { title: "Cancelled" },
              { title: "Returned" },
            ]}
          />
        </Card>
      </Col>

      <Col span={12}>
        <Card
          title="Customer Information"
          loading={isLoading || customerIsLoading}
        >
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Customer Name">
              {customerData?.data?.fullName}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {customerData?.data?.email}
            </Descriptions.Item>
            <Descriptions.Item label="Phone">
              {customerData?.data?.phone}
            </Descriptions.Item>
            <Descriptions.Item label="Customer Since">
              <DateField value={customerData?.data?.createdAt} />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>

      <Col span={12}>
        <Card title="Order Details" loading={isLoading}>
          <Descriptions column={1} bordered>
            <Descriptions.Item label="Order ID">{record?.id}</Descriptions.Item>
            <Descriptions.Item label="Payment Status">
              <TagField
                value={record?.paymentStatus}
                color={
                  paymentStatusColorMap[record?.paymentStatus] || "default"
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label="Payment Method">
              {record?.paymentMethod}
            </Descriptions.Item>
            <Descriptions.Item label="Shipping Method">
              <Tag color="blue">{record?.shippingMethod}</Tag>
            </Descriptions.Item>
            <Descriptions.Item label="Total Amount">
              <NumberField
                value={record?.amount}
                options={{ style: "currency", currency: "USD" }}
              />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>

      <Col span={24}>
        <Card title="Order Items" loading={isLoading}>
          <Table dataSource={record?.items} rowKey="id" pagination={false}>
            <Table.Column dataIndex="productName" title="Product" />
            <Table.Column
              dataIndex="unitPrice"
              title="Unit Price"
              render={(value) => (
                <NumberField
                  value={value}
                  options={{ style: "currency", currency: "USD" }}
                />
              )}
            />
            <Table.Column dataIndex="quantity" title="Quantity" />
            <Table.Column
              dataIndex="subtotal"
              title="Subtotal"
              render={(_, record: any) => (
                <NumberField
                  value={(record.unitPrice || 0) * (record.quantity || 0)}
                  options={{ style: "currency", currency: "USD" }}
                />
              )}
            />
          </Table>

          <Divider />

          <Row justify="end">
            <Col span={8}>
              <Descriptions column={1}>
                <Descriptions.Item label="Subtotal">
                  <NumberField
                    value={record?.subtotal}
                    options={{ style: "currency", currency: "USD" }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Shipping">
                  <NumberField
                    value={record?.shippingCost}
                    options={{ style: "currency", currency: "USD" }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Tax">
                  <NumberField
                    value={record?.tax}
                    options={{ style: "currency", currency: "USD" }}
                  />
                </Descriptions.Item>
                <Descriptions.Item label="Total">
                  <Text strong>
                    <NumberField
                      value={record?.amount}
                      options={{ style: "currency", currency: "USD" }}
                    />
                  </Text>
                </Descriptions.Item>
              </Descriptions>
            </Col>
          </Row>
        </Card>
      </Col>
    </Row>
  );
};
