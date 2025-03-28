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
import { Space, Table, Avatar, Rate, Badge, Typography } from "antd";

export const ProductList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  const { data: categoryData, isLoading: categoryIsLoading } = useMany({
    resource: "categories",
    ids:
      tableProps?.dataSource
        ?.map((item) => item?.category?.id)
        .filter(Boolean) ?? [],
    queryOptions: {
      enabled: !!tableProps?.dataSource,
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="id" title={"ID"} width={80} />
        <Table.Column 
          dataIndex="image" 
          title={"Image"}
          render={(value) => (
            <Avatar shape="square" size={64} src={value} />
          )} 
        />
        <Table.Column dataIndex="name" title={"Product Name"} />
        <Table.Column 
          dataIndex="price" 
          title={"Price"}
          render={(value) => (
            <NumberField
              value={value}
              options={{ style: "currency", currency: "USD" }}
            />
          )}
        />
        <Table.Column
          dataIndex={"category"}
          title={"Category"}
          render={(value) =>
            categoryIsLoading ? (
              <>Loading...</>
            ) : (
              categoryData?.data?.find((item) => item.id === value?.id)?.title
            )
          }
        />
        <Table.Column 
          dataIndex="stock" 
          title={"Stock"}
          render={(value) => {
            let status = "success";
            if (value < 10) status = "error";
            else if (value < 50) status = "warning";
            
            return (
              <Badge 
                status={status as "success" | "error" | "warning"} 
                text={<NumberField value={value} />} 
              />
            );
          }}
        />
        <Table.Column 
          dataIndex="rating" 
          title={"Rating"}
          render={(value) => <Rate disabled defaultValue={value} />}
        />
        <Table.Column 
          dataIndex="status" 
          title={"Status"}
          render={(value) => (
            <TagField 
              value={value} 
              color={value === "in stock" ? "green" : value === "limited" ? "orange" : "red"} 
            />
          )}
        />
        <Table.Column
          dataIndex={["createdAt"]}
          title={"Created at"}
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
