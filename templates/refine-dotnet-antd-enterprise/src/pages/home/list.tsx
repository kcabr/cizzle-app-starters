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

interface IHome {
    addressHash: string;
    zillowPropertyId?: string;
    listingDataSource?: string;
    streetAddress?: string;
    city?: string;
    state?: string;
    homeStatus?: string;
    zipcode?: string;
    formattedAddress?: string;
    bedroomCount?: number;
    bathroomCount?: number;
    yearBuilt?: number;
    homeType?: string;
    livingArea?: number;
    lotSize?: string;
    basement?: string;
    cooling?: string;
    heating?: string;
    parkingFeatures?: string;
    hdpUrl?: string;
    lat?: number;
    lng?: number;
    schoolElemRatings?: string;
    schoolMidRatings?: string;
    schoolHighRatings?: string;
    isForeclosure?: boolean;
    isPending?: boolean;
    hasFireplace?: boolean;
    hoaFee?: string;
    levels?: string;
    pricePerSquareFoot?: number;
    subdivisionName?: string;
    architecturalStyle?: string;
    structureType?: string;
    dateLastSold?: string;
    lastSoldPrice?: number;
    crimeSummaryJSON?: string;
    userAddedId?: string;
    dateAdded?: string;
}

export const HomeList = () => {
  const { tableProps } = useTable<IHome>({
    syncWithLocation: true,
  });

  // TODO: Add useMany hooks here for relational data if needed

  return (
    <List>
      <Table {...tableProps} rowKey="AddressHash">
        <Table.Column dataIndex="addressHash" title={"Address Hash"} />
        <Table.Column dataIndex="zillowPropertyId" title={"Zillow Property Id"} />
        <Table.Column dataIndex="listingDataSource" title={"Listing Data Source"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="streetAddress" title={"Street Address"} />
        <Table.Column dataIndex="city" title={"City"} />
        <Table.Column dataIndex="state" title={"State"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="homeStatus" title={"Home Status"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="zipcode" title={"Zipcode"} />
        <Table.Column dataIndex="formattedAddress" title={"Formatted Address"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="bedroomCount" title={"Bedroom Count"} render={(value: any) => <NumberField value={value} />} />
        <Table.Column dataIndex="bathroomCount" title={"Bathroom Count"} render={(value: any) => <NumberField value={value} />} />
        <Table.Column dataIndex="yearBuilt" title={"Year Built"} render={(value: any) => <NumberField value={value} />} />
        <Table.Column dataIndex="homeType" title={"Home Type"} />
        <Table.Column dataIndex="livingArea" title={"Living Area"} render={(value: any) => <NumberField value={value} />} />
        <Table.Column dataIndex="lotSize" title={"Lot Size"} />
        <Table.Column dataIndex="basement" title={"Basement"} />
        <Table.Column dataIndex="cooling" title={"Cooling"} />
        <Table.Column dataIndex="heating" title={"Heating"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="parkingFeatures" title={"Parking Features"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="hdpUrl" title={"Hdp Url"} render={(value: any) => <UrlField value={value} />} />
        <Table.Column dataIndex="lat" title={"Lat"} render={(value: any) => <NumberField value={value} />} />
        <Table.Column dataIndex="lng" title={"Lng"} render={(value: any) => <NumberField value={value} />} />
        <Table.Column dataIndex="schoolElemRatings" title={"School Elem Ratings"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="schoolMidRatings" title={"School Mid Ratings"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="schoolHighRatings" title={"School High Ratings"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="isForeclosure" title={"Is Foreclosure"} render={(value: any) => <BooleanField value={value} />} />
        <Table.Column dataIndex="isPending" title={"Is Pending"} render={(value: any) => <BooleanField value={value} />} />
        <Table.Column dataIndex="hasFireplace" title={"Has Fireplace"} render={(value: any) => <BooleanField value={value} />} />
        <Table.Column dataIndex="hoaFee" title={"Hoa Fee"} />
        <Table.Column dataIndex="levels" title={"Levels"} />
        <Table.Column dataIndex="pricePerSquareFoot" title={"Price Per Square Foot"} render={(value: any) => <NumberField value={value} options={{ style: "currency", currency: "USD" }} />} />
        <Table.Column dataIndex="subdivisionName" title={"Subdivision Name"} />
        <Table.Column dataIndex="architecturalStyle" title={"Architectural Style"} />
        <Table.Column dataIndex="structureType" title={"Structure Type"} />
        <Table.Column dataIndex="dateLastSold" title={"Date Last Sold"} render={(value: any) => <DateField value={value} />} />
        <Table.Column dataIndex="lastSoldPrice" title={"Last Sold Price"} render={(value: any) => <NumberField value={value} options={{ style: "currency", currency: "USD" }} />} />
        <Table.Column dataIndex="crimeSummaryJSON" title={"Crime Summary JSON"} />
        <Table.Column dataIndex="userAddedId" title={"User Added Id"} />
        <Table.Column dataIndex="dateAdded" title={"Date Added"} render={(value: any) => <DateField value={value} />} />
        <Table.Column
          title={"Actions"}
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.AddressHash} />
              <ShowButton hideText size="small" recordItemId={record.AddressHash} />
              <DeleteButton hideText size="small" recordItemId={record.AddressHash} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};