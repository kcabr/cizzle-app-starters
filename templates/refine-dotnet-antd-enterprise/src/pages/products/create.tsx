import {
  Create,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Upload, Rate, Switch, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import MDEditor from "@uiw/react-md-editor";

export const ProductCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const { selectProps: categorySelectProps } = useSelect({
    resource: "categories",
  });

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Product Name"
          name="name"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Product Image URL" name="image">
          <Input
            addonAfter={
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture"
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            }
          />
        </Form.Item>

        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <MDEditor data-color-mode="light" />
        </Form.Item>

        <Form.Item
          label="Price"
          name="price"
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber
            formatter={(value) =>
              `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "150px" }}
          />
        </Form.Item>

        <Form.Item
          label="Category"
          name={["category", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...categorySelectProps} />
        </Form.Item>

        <Form.Item
          label="Stock"
          name="stock"
          rules={[{ required: true, type: "number" }]}
        >
          <InputNumber min={0} />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: "In Stock", value: "in stock" },
              { label: "Limited", value: "limited" },
              { label: "Out of Stock", value: "out of stock" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Rating" name="rating">
          <Rate count={5} />
        </Form.Item>

        <Form.Item label="Featured" name="featured" valuePropName="checked">
          <Switch />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select
            mode="tags"
            style={{ width: "100%" }}
            placeholder="Product tags"
            options={[
              { label: "New", value: "new" },
              { label: "Sale", value: "sale" },
              { label: "Best Seller", value: "best-seller" },
              { label: "Popular", value: "popular" },
            ]}
          />
        </Form.Item>
      </Form>
    </Create>
  );
};
