import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
  TagField,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table, Avatar, Typography, Tag } from "antd";

const { Text } = Typography;

export const CustomerList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width={80} />
        <Table.Column 
          dataIndex="avatar" 
          title={"Avatar"}
          render={(value) => (
            <Avatar src={value} size={40} />
          )} 
        />
        <Table.Column 
          dataIndex="fullName" 
          title={"Name"}
          render={(value) => <Text strong>{value}</Text>} 
        />
        <Table.Column dataIndex="email" title={"Email"} />
        <Table.Column dataIndex="phone" title={"Phone"} />
        <Table.Column 
          dataIndex="totalOrders" 
          title={"Orders"}
          sorter={(a, b) => a.totalOrders - b.totalOrders}
        />
        <Table.Column 
          dataIndex="totalSpent" 
          title={"Total Spent"}
          render={(value) => `$${value?.toLocaleString() || 0}`}
          sorter={(a, b) => a.totalSpent - b.totalSpent}
        />
        <Table.Column 
          dataIndex="customerType" 
          title={"Type"}
          render={(value) => {
            const colorMap: Record<string, string> = {
              new: "blue",
              regular: "green",
              vip: "gold"
            };
            return <TagField value={value} color={colorMap[value] || "default"} />;
          }}
          filters={[
            { text: "New", value: "new" },
            { text: "Regular", value: "regular" },
            { text: "VIP", value: "vip" },
          ]}
          onFilter={(value, record) => record.customerType === value}
        />
        <Table.Column
          dataIndex="tags"
          title="Tags"
          render={(tags: string[]) => (
            <>
              {tags?.map((tag) => (
                <Tag color="blue" key={tag}>
                  {tag}
                </Tag>
              ))}
            </>
          )}
        />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Registered"}
          render={(value: any) => <DateField value={value} />}
          sorter={(a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()}
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
