import {
  NumberField,
  TagField,
  DateField,
  TextField,
  MarkdownField,
} from "@refinedev/antd";
import { useShow, useOne } from "@refinedev/core";
import {
  Typography,
  Space,
  Row,
  Col,
  Card,
  Descriptions,
  Image,
  Rate,
  Divider,
  Tag,
} from "antd";

const { Title, Text } = Typography;

export const ProductShow = () => {
  const { query } = useShow();
  const { data, isLoading } = query;
  const record = data?.data;

  const { data: categoryData, isLoading: categoryIsLoading } = useOne({
    resource: "categories",
    id: record?.category?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Row gutter={[16, 16]}>
      <Col span={8}>
        <Card loading={isLoading}>
          <Image width="100%" src={record?.image} alt={record?.name} />
        </Card>

        <Card
          style={{ marginTop: 16 }}
          loading={isLoading || categoryIsLoading}
        >
          <Descriptions title="Product Info" column={1} bordered>
            <Descriptions.Item label="ID">{record?.id}</Descriptions.Item>
            <Descriptions.Item label="Category">
              {categoryData?.data?.title}
            </Descriptions.Item>
            <Descriptions.Item label="Status">
              <TagField
                value={record?.status}
                color={
                  record?.status === "in stock"
                    ? "green"
                    : record?.status === "limited"
                    ? "orange"
                    : "red"
                }
              />
            </Descriptions.Item>
            <Descriptions.Item label="Rating">
              <Rate disabled value={record?.rating} />
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              <NumberField
                value={record?.price}
                options={{ style: "currency", currency: "USD" }}
              />
            </Descriptions.Item>
            <Descriptions.Item label="Stock">
              <NumberField value={record?.stock} />
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              <DateField value={record?.createdAt} />
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Col>
      <Col span={16}>
        <Card loading={isLoading}>
          <Title level={3}>{record?.name}</Title>
          <Space direction="vertical" style={{ width: "100%" }}>
            <Divider orientation="left">Description</Divider>
            <MarkdownField value={record?.description} />

            <Divider orientation="left">Specifications</Divider>
            {record?.specifications?.map((spec: any, index: number) => (
              <div key={index}>
                <Text strong>{spec.name}: </Text>
                <Text>{spec.value}</Text>
              </div>
            ))}

            <Divider orientation="left">Tags</Divider>
            <Space>
              {record?.tags?.map((tag: string, index: number) => (
                <Tag key={index} color="blue">
                  {tag}
                </Tag>
              ))}
            </Space>
          </Space>
        </Card>
      </Col>
    </Row>
  );
};
