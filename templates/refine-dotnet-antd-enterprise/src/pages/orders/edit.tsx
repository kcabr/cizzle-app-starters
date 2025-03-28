import {
  Edit,
  useForm,
  useSelect,
} from "@refinedev/antd";
import { Form, Input, InputNumber, Select, DatePicker, Button, Space, Table } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import dayjs from "dayjs";

export const OrderEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  const orderData = queryResult?.data?.data;

  const { selectProps: customerSelectProps } = useSelect({
    resource: "customers",
    optionLabel: "fullName",
    defaultValue: orderData?.customer?.id,
  });

  const { selectProps: productSelectProps } = useSelect({
    resource: "products",
    optionLabel: "name",
  });

  const [orderItems, setOrderItems] = useState<any[]>([]);

  // Initialize order items when the data is loaded
  useEffect(() => {
    if (orderData?.items) {
      setOrderItems(orderData.items.map((item: any) => ({
        ...item,
        id: item.id || Date.now() + Math.random(),
      })));
    }
  }, [orderData]);

  const handleAddItem = () => {
    setOrderItems([...orderItems, { id: Date.now(), quantity: 1 }]);
  };

  const handleRemoveItem = (itemId: number | string) => {
    setOrderItems(orderItems.filter(item => item.id !== itemId));
  };

  const handleItemChange = (itemId: number | string, field: string, value: any) => {
    setOrderItems(orderItems.map(item => {
      if (item.id === itemId) {
        return { ...item, [field]: value };
      }
      return item;
    }));
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Customer"
          name={["customer", "id"]}
          rules={[{ required: true }]}
        >
          <Select {...customerSelectProps} />
        </Form.Item>

        <Form.Item
          label="Order Number"
          name="orderNumber"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Order Date"
          name="orderDate"
          rules={[{ required: true }]}
          getValueProps={(value) => ({
            value: value ? dayjs(value) : undefined,
          })}
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item label="Status" name="status">
          <Select
            options={[
              { label: "Pending", value: "pending" },
              { label: "Processing", value: "processing" },
              { label: "Shipped", value: "shipped" },
              { label: "Delivered", value: "delivered" },
              { label: "Cancelled", value: "cancelled" },
              { label: "Returned", value: "returned" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Payment Status" name="paymentStatus">
          <Select
            options={[
              { label: "Pending", value: "pending" },
              { label: "Paid", value: "paid" },
              { label: "Failed", value: "failed" },
              { label: "Refunded", value: "refunded" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Payment Method" name="paymentMethod">
          <Select
            options={[
              { label: "Credit Card", value: "credit_card" },
              { label: "PayPal", value: "paypal" },
              { label: "Bank Transfer", value: "bank_transfer" },
              { label: "Cash on Delivery", value: "cod" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Shipping Method" name="shippingMethod">
          <Select
            options={[
              { label: "Standard", value: "standard" },
              { label: "Express", value: "express" },
              { label: "Overnight", value: "overnight" },
              { label: "Pickup", value: "pickup" },
            ]}
          />
        </Form.Item>

        <Form.Item label="Order Items">
          <Button type="dashed" onClick={handleAddItem} style={{ marginBottom: 16 }}>
            <PlusOutlined /> Add Item
          </Button>
          
          <Table 
            dataSource={orderItems} 
            rowKey="id"
            pagination={false}
          >
            <Table.Column 
              title="Product" 
              render={(_, record) => (
                <Select 
                  {...productSelectProps}
                  style={{ width: "100%" }}
                  value={record.productId}
                  onChange={(value) => handleItemChange(record.id, "productId", value)}
                />
              )}
            />
            <Table.Column 
              title="Product Name" 
              render={(_, record) => (
                <Input
                  value={record.productName}
                  onChange={(e) => handleItemChange(record.id, "productName", e.target.value)}
                />
              )}
            />
            <Table.Column 
              title="Unit Price" 
              render={(_, record) => (
                <InputNumber
                  formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
                  style={{ width: "100%" }}
                  value={record.unitPrice}
                  onChange={(value) => handleItemChange(record.id, "unitPrice", value)}
                />
              )}
            />
            <Table.Column 
              title="Quantity" 
              render={(_, record) => (
                <InputNumber
                  min={1}
                  style={{ width: "100%" }}
                  value={record.quantity}
                  onChange={(value) => handleItemChange(record.id, "quantity", value)}
                />
              )}
            />
            <Table.Column 
              title="Actions" 
              render={(_, record) => (
                <Button 
                  type="text" 
                  danger 
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveItem(record.id)}
                />
              )}
            />
          </Table>
        </Form.Item>

        <Form.Item
          label="Shipping Cost"
          name="shippingCost"
        >
          <InputNumber
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "150px" }}
          />
        </Form.Item>

        <Form.Item
          label="Tax"
          name="tax"
        >
          <InputNumber
            formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
            parser={(value) => value!.replace(/\$\s?|(,*)/g, "")}
            style={{ width: "150px" }}
          />
        </Form.Item>
      </Form>
    </Edit>
  );
};
