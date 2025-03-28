import {
  Edit,
  useForm,
} from "@refinedev/antd";
import { Form, Input, Select, DatePicker, Button, Space, Row, Col, Avatar, Upload } from "antd";
import { UserOutlined, UploadOutlined } from "@ant-design/icons";

export const CustomerEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const customerData = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Row gutter={16}>
          <Col span={24} style={{ textAlign: 'center', marginBottom: 24 }}>
            <Form.Item name="avatar" noStyle>
              <Upload
                name="avatar"
                listType="picture-circle"
                className="avatar-uploader"
                showUploadList={false}
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              >
                {customerData?.avatar ? (
                  <Avatar size={100} src={customerData.avatar} />
                ) : (
                  <Avatar size={100} icon={<UserOutlined />} />
                )}
                <div style={{ marginTop: 8 }}>Upload</div>
              </Upload>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, type: "email" }]}
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              label="Phone"
              name="phone"
            >
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Customer Type" name="customerType">
              <Select
                options={[
                  { label: "New", value: "new" },
                  { label: "Regular", value: "regular" },
                  { label: "VIP", value: "vip" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Address" name="address">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="City" name="city">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="State" name="state">
              <Input />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item label="Zip Code" name="zipCode">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Country" name="country">
              <Input />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item label="Tags" name="tags">
              <Select
                mode="tags"
                style={{ width: "100%" }}
                placeholder="Customer tags"
                options={[
                  { label: "Loyal", value: "loyal" },
                  { label: "High Spender", value: "high-spender" },
                  { label: "Corporate", value: "corporate" },
                  { label: "Wholesale", value: "wholesale" },
                ]}
              />
            </Form.Item>
          </Col>

          <Col span={24}>
            <Form.Item label="Notes" name="notes">
              <Input.TextArea rows={4} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Edit>
  );
};
