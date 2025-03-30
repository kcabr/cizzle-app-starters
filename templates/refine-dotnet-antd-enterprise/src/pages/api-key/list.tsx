import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useTable,
  TagField,
  NumberField,
  BooleanField,
  UrlField,
  EmailField,
  MarkdownField,
  ImageField,
} from "@refinedev/antd";
import { type BaseRecord } from "@refinedev/core";
import { Space, Table, Avatar } from "antd";

interface IApiKey {
    apiKeyId: number;
    serviceCode?: string;
    value?: string;
    dateAdded?: string;
}

export const ApiKeyList = () => {
  const { tableProps } = useTable<IApiKey>({
    syncWithLocation: true,
  });

  // TODO: Add useMany hooks here for relational data if needed

  return (
    <List>
      <Table {...tableProps} rowKey="ApiKeyId">
        <Table.Column dataIndex="apiKeyId" title={"Api Key Id"} />
        <Table.Column dataIndex="serviceCode" title={"Service Code"} />
        <Table.Column dataIndex="value" title={"Value"} />
        <Table.Column dataIndex="dateAdded" title={"Date Added"} render={(value: any) => <DateField value={value} />} />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.ApiKeyId} />
              <ShowButton hideText size="small" recordItemId={record.ApiKeyId} />
              <DeleteButton hideText size="small" recordItemId={record.ApiKeyId} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};