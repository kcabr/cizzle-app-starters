import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
  NumberField,
  TagField,
} from "@refinedev/antd";
import { useMany, type BaseRecord } from "@refinedev/core";
import { Space, Table, Badge, Typography, Tag } from "antd";

const { Text } = Typography;

export const OrderList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: customerData, isLoading: customerIsLoading } = useMany({
    resource: "customers",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.customer?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"Order ID"} width={100} />
        <Table.Column
          dataIndex={"customer"}
          title={"Customer"}
          render={(value) =>
            customerIsLoading ? (
              <>Loading...</>
            ) : (
              <Text strong>
                {
                  customerData?.data?.find((item) => item.id === value?.id)
                    ?.fullName
                }
              </Text>
            )
          }
        />
        <Table.Column
          dataIndex="orderNumber"
          title={"Order #"}
          render={(value) => <Text code>{value}</Text>}
        />
        <Table.Column
          dataIndex="amount"
          title={"Amount"}
          render={(value) => (
            <NumberField
              value={value}
              options={{ style: "currency", currency: "USD" }}
            />
          )}
        />
        <Table.Column
          dataIndex="items"
          title={"Items"}
          render={(value) => <Badge count={value?.length || 0} />}
        />
        <Table.Column
          dataIndex="status"
          title={"Status"}
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
          dataIndex="paymentStatus"
          title={"Payment"}
          render={(value) => {
            const statusColorMap: Record<string, string> = {
              pending: "orange",
              paid: "green",
              failed: "red",
              refunded: "purple",
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
          dataIndex="shippingMethod"
          title={"Shipping"}
          render={(value) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column
          dataIndex={"orderDate"}
          title={"Order Date"}
          render={(value: any) => <DateField value={value} />}
        />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
              <ShowButton hideText size="small" recordItemId={record.id} />
              <DeleteButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
