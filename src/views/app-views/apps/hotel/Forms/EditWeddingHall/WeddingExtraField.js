import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Input, Select } from "antd";
import { languageValidator, numberValidator } from "constants/helperFunctions";
import {
  ARABIC_alpha,
  ENGLISH_ALPH,
  NUMBER_CONSTANTS,
} from "constants/LanguagesConstent";
import { lowerCase } from "lodash";
import React, { useState } from "react";

function VariationField({
  setButtonChecker,
  variationList,
  setVariationList,
  checkView,
  extraPackageList,
}) {
  //    const handleAddition = (add,fields)=>{
  //      add();
  //      if(fields.length>0)setTempList([...tempList,variationList])
  //    }

  console.log(variationList, "Variation List");
  const handleChange = (index, event) => {
    const values = [...variationList];
    values[index][event.target.name] = event.target.value;
    setVariationList(values);
  };
  let test = [];
  for (const iterator of variationList) {
    test.push({
      name_ar: true,
      name_en: true,
      price: true,
      description_ar: true,
      description_en: true,
      down_payment_value: true,
    });
  }
  const [feildChecker, setFieldChecker] = useState(test);

  const removeElement = (field, id) => {
    const filteredList = variationList.filter((element) => element.id !== id);
    setVariationList(filteredList);
  };

  const handleAddition = () => {
    setFieldChecker([
      ...feildChecker,
      {
        name_ar: true,
        name_en: true,
        price: true,
        description_ar: true,
        description_en: true,
        down_payment_value: true,
      },
    ]);
    setVariationList([
      ...variationList,
      { id: Math.floor(Math.random() * 10000) },
    ]);
  };
  const handleExtraPackageSelection = (index, event) => {
    const values = [...variationList];
    values[index]["extraPackages"] = event;
    setVariationList(values);
  };

  return (
    <Card title="Extra Package">
      <Form.List name="variants">
        {(fields, { add, remove }) => {
          return (
            <div className="mt-3">
              {variationList?.map((field, index) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      width: "100%",
                      justifyContent: "flex-end",
                    }}
                  >
                    <MinusCircleOutlined
                      disabled={checkView}
                      className="mt-md-4 pt-md-3 "
                      onClick={(e) => {
                        if (checkView) return null;
                        else {
                          return removeElement(field, field.id);
                        }
                      }}
                    />
                  </div>

                  <Form.Item
                    name="name_ar"
                    label="Name in Arabic:"
                    required
                    name={[field.id, "name_ar"]}
                    fieldKey={[field.name_ar, "name_ar"]}
                    onPressEnter={(e) => e.preventDefault()}
                    rules={[
                      feildChecker[index]?.name_ar
                        ? []
                        : ({ getFieldValue }) => ({
                            validator(_, value) {
                              const checkValidation = languageValidator(
                                value,
                                ARABIC_alpha
                              );
                              if (checkValidation) {
                                setButtonChecker(true);
                                return Promise.resolve();
                              } else {
                                setButtonChecker(false);
                                return Promise.reject(
                                  "Please enter The Description in English"
                                );
                              }
                            },
                          }),
                    ]}
                  >
                    <Input
                      name="name_ar"
                      disabled={checkView}
                      placeholder="Please enter the Name in Arabic "
                      disabled={checkView}
                      defaultValue={field.name_ar}
                      onChange={(e) => {
                        feildChecker[index].name_ar = false;

                        handleChange(index, e);
                      }}
                      onPressEnter={(e) => e.preventDefault()}
                    />
                  </Form.Item>
                  <Form.Item
                    name="name_en"
                    required
                    label="Name in English:"
                    name={[field.id, "name_en"]}
                    fieldKey={[field.name_en, "name_en"]}
                    rules={[
                      feildChecker[index]?.name_en
                        ? []
                        : ({ getFieldValue }) => ({
                            validator(_, value) {
                              const checkValidation = languageValidator(
                                lowerCase(value),
                                ENGLISH_ALPH
                              );
                              if (checkValidation) {
                                setButtonChecker(true);
                                return Promise.resolve();
                              } else {
                                setButtonChecker(false);
                                return Promise.reject(
                                  "Please enter The Description in English"
                                );
                              }
                            },
                          }),
                    ]}
                  >
                    <Input
                      name="name_en"
                      disabled={checkView}
                      onPressEnter={(e) => e.preventDefault()}
                      defaultValue={field.name_en}
                      onChange={(e) => {
                        feildChecker[index].name_en = false;
                        // setFieldChecker([
                        //   ...feildChecker,
                        //   feildChecker[index].number_of_days= false,
                        // ]);
                        handleChange(index, e);
                      }}
                      placeholder="Please enter the Name in English"
                    />
                  </Form.Item>

                  <Form.Item
                    name="description_en"
                    required
                    label="Descritpion in English:"
                    name={[field.id, "description_en"]}
                    // rules={[
                    //   feildChecker[index]?.description_en
                    //     ? []
                    //     : ({ getFieldValue }) => ({
                    //         validator(_, value) {
                    //           const checkValidation = languageValidator(
                    //             lowerCase(value),
                    //             ENGLISH_ALPH
                    //           );
                    //           if (checkValidation) {
                    //             setButtonChecker(true);
                    //             return Promise.resolve();
                    //           } else {
                    //             setButtonChecker(false);
                    //             return Promise.reject(
                    //               "Please enter The Description in English"
                    //             );
                    //           }
                    //         },
                    //       }),
                    // ]}
                    fieldKey={[field.description_en, "description_en"]}
                  >
                    <Input.TextArea
                      name="description_en"
                      disabled={checkView}
                      defaultValue={field.description_en}
                      onChange={(e) => {
                        feildChecker[index].description_en = false;

                        handleChange(index, e);
                      }}
                      placeholder="Please enter the Descritpion in English"
                    />
                  </Form.Item>
                  <Form.Item
                    name="description_ar"
                    required
                    label="Descritpion in Arabic:"
                    name={[field.id, "description_ar"]}
                    fieldKey={[field.description_ar, "description_ar"]}
                  >
                    <Input.TextArea
                      name="description_ar"
                      disabled={checkView}
                      onChange={(e) => {
                        feildChecker[index].description_ar = false;

                        handleChange(index, e);
                      }}
                      defaultValue={field.description_ar}
                      placeholder="Please enter the Descritpion in Arabic"
                    />
                  </Form.Item>

                  <Form.Item
                    label="Price"
                    required
                    name={[field.id, "pricee"]}
                    fieldKey={[field.price, "price"]}
                    rules={[
                      feildChecker[index]?.price
                        ? []
                        : ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!numberValidator(value, NUMBER_CONSTANTS)) {
                                setButtonChecker(false);

                                return Promise.reject(
                                  "Your Cant include Charcters"
                                );
                              } else {
                                setButtonChecker(true);

                                return Promise.resolve();
                              }
                            },
                          }),
                    ]}
                    className="w-100"
                  >
                    <Input
                      name="price"
                      defaultValue={field.price}
                      disabled={checkView}
                      onChange={(e) => {
                        feildChecker[index].price = false;
                        handleChange(index, e);
                      }}
                      placeholder="Enter the Price"
                      key={field.id}
                      className="w-100"
                      value={field.price}
                    />
                  </Form.Item>
                  <Form.Item
                    name={[field.id, "extraPackages"]}
                    // fieldKey={[field.extraPackagess[index], "extraPackages"]}
                    required
                    label="Extra Package"
                  >
                    <Select
                      name={[field.id, "extraPackages"]}
                      optionFilterProp="children"
                      defaultValue={field.extraPackages}
                      disabled={checkView}
                      key={field.id}
                      onChange={(e) => {
                        handleExtraPackageSelection(index, e);
                      }}
                      filterOption={(input, option) =>
                        option.props.children
                          .toLowerCase()
                          .indexOf(input.toLowerCase()) >= 0
                      }
                      mode="multiple"
                      style={{ width: "100%" }}
                      placeholder="Please Select Your Extra Package"
                    >
                      {extraPackageList?.map((elm) => (
                        <Select.Option value={elm.id} key={elm.id}>
                          {elm.name_en}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    label="Down Payment"
                    name={[field.id, "down_payment_value"]}
                    fieldKey={[field.price, "down_payment_value"]}
                    rules={[
                      feildChecker[index]?.down_payment_value
                        ? []
                        : ({ getFieldValue }) => ({
                            validator(_, value) {
                              if (!numberValidator(value, NUMBER_CONSTANTS)) {
                                return Promise.reject(
                                  "Your Cant include Charcters"
                                );
                              } else if (value > 100) {
                                return Promise.reject(
                                  "Your Cant Number Cant be Greater Than 100"
                                );
                              } else {
                                return Promise.resolve();
                              }
                            },
                          }),
                    ]}
                    className="w-100"
                  >
                    <Input
                      name="down_payment_value"
                      placeholder="Enter the Down Payment"
                      key={field.id}
                      addonAfter={"%"}
                      defaultValue={field.down_payment_value}
                      onChange={(e) => {
                        feildChecker[index].down_payment_value = false;

                        handleChange(index, e);
                      }}
                      className="w-100"
                    />
                  </Form.Item>
                </>
              ))}

              <Form.Item>
                <Button
                  disabled={checkView}
                  type="dashed"
                  onClick={() => handleAddition()}
                  className="w-100"
                >
                  Add Another Extra Package
                </Button>
              </Form.Item>
            </div>
          );
        }}
      </Form.List>
    </Card>
  );
}

export default VariationField;
