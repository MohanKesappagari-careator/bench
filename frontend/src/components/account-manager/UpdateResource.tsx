import { NetworkStatus, useMutation, useQuery } from "@apollo/client";
import { Button, Col, DatePicker, Form, Input, Row, Select, Spin } from "antd";
import moment from "moment";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import SKILLS from "../../constants/skill";
import ACCOUNT_MANAGER_SERVICE from "../../services/AccountManagerService";
import { Store } from "../../types/Redux";

const { Option } = Select;

export default function UpdateResource() {
  const [code] = useState("91");
  let worker: any = null;
  const userId = useSelector((store: Store) => store.userSession.user?.userid);

  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, refetch, networkStatus } = useQuery(
    ACCOUNT_MANAGER_SERVICE.RESOURES,
    {
      variables: {
        resourceId: Number(id),
      },
    }
  );

  const [update] = useMutation(ACCOUNT_MANAGER_SERVICE.UPDATE_RESOURCE);
  const [form] = Form.useForm();
  const onFinish = async (values: any) => {
    console.log("Received values of form: ", values);
    await update({
      variables: {
        updateResourceInput: {
          id: Number(id),
          firstname: values.firstname,
          middlename: values.middlename,
          lastname: values.lastname,
          skills: values.skills.join(","),
          briefintro: values.briefintro,
          personalemail: values.personalemail,
          careatoremail: values.careatoremail,
          phone: values.phone,
          education: values.education,
          totalexperience: values.totalexperience,
          projectreleasedate: values.projectreleasedate
            ? values.projectreleasedate._d.toISOString()
            : null,
          location: values.location,
          billrate: values.billrate,
          releasereason: values.releasereason,
          comments: values.comments,
          updatedby: userId,
        },
      },
    })
      .then(() => navigate("/manageresource"))
      .catch((e) => {
        console.log(
          "🚀 ~ file: UpdateResource.tsx ~ line 56 ~ onFinish ~ e",
          e
        );
      });
  };
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }} defaultValue={code}>
        <Option value="91">+91</Option>
      </Select>
    </Form.Item>
  );

  if (loading) {
    return <Spin />;
  }

  if (networkStatus == NetworkStatus.ready) {
    form.setFieldsValue({
      firstname: data.resource.firstname,
      middlename: data.resource.middlename,
      lastname: data.resource.lastname,
      skills: data.resource.skills.split(","),
      briefintro: data.resource.briefintro,
      personalemail: data.resource.personalemail,
      careatoremail: data.resource.careatoremail,
      phone: data.resource.phone,
      education: data.resource.education,
      totalexperience: data.resource.totalexperience,
      location: data.resource.location,
      billrate: data.resource.billrate,
      releasereason: data.resource.releasereason,
      comments: data.resource.comments,
    });
    worker = {
      projectreleasedate: moment(data.resource.projectreleasedate) || null,
    };
  }
  return (
    <div className="top">
      <Form
        form={form}
        onFinish={onFinish}
        layout="vertical"
        initialValues={{}}
      >
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="First Name"
              name="firstname"
              required
              tooltip="firstname"
              rules={[{ required: true, message: "Please input First Name!" }]}
            >
              <Input placeholder="First Name" />
            </Form.Item>{" "}
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Middle Name" name="middlename">
              <Input placeholder="Middle Name" />
            </Form.Item>{" "}
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Last Name"
              name="lastname"
              required
              rules={[{ required: true, message: "Please input Last Name!" }]}
            >
              <Input placeholder="Last Name" />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Personal Email"
              name="personalemail"
              required
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input E-mail!",
                },
              ]}
            >
              <Input placeholder="Personal Email" />
            </Form.Item>{" "}
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Careator Email"
              required
              name="careatoremail"
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input E-mail!",
                },
              ]}
            >
              <Input placeholder="Careator Email" />
            </Form.Item>
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Phone"
              required
              name="phone"
              rules={[
                { required: true, message: "Please input phone number!" },
              ]}
            >
              <Input
                placeholder="Phone"
                addonBefore={prefixSelector}
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Education"
              name={"education"}
              required
              rules={[{ required: true, message: "Please input Education!" }]}
            >
              <Input placeholder="Education" />
            </Form.Item>{" "}
          </Col>

          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item
              label="Skills"
              required
              name="skills"
              tooltip="Mention all skills"
              rules={[
                { required: true, message: "Please input all the skills!" },
              ]}
            >
              <Select
                mode="multiple"
                allowClear
                style={{ width: "100%" }}
                placeholder="Please select"
                options={SKILLS}
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Total Experience" name={"totalexperience"}>
              <Input placeholder="Total Experience" />
            </Form.Item>{" "}
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Location" name={"location"}>
              <Input placeholder="Location" />
            </Form.Item>{" "}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Project Release Date" name={"projectreleasedate"}>
              <DatePicker
                placeholder="Project Release Date"
                style={{ width: "100%" }}
              />
            </Form.Item>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Bill Rate" name={"billrate"}>
              <Input placeholder="Bill Rate" />
            </Form.Item>{" "}
          </Col>
        </Row>

        <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Release Reason" name={"releasereason"}>
              <Input placeholder="Release Reason" />
            </Form.Item>{" "}
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="Brief Intro" name="briefintro">
              <Input.TextArea />
            </Form.Item>
          </Col>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item label="comments" name={"comments"}>
              <Input.TextArea />
            </Form.Item>
          </Col>
        </Row>
        {/* <Row>
          <Col md={{ span: 6, offset: 1 }}>
            <Form.Item name="filename" label="resume">
              <Upload
                name="file"
                style={{ width: "100%" }}
                onChange={(e) => onChange(e)}
                beforeUpload={() => false}
                customRequest={() => dummyRequest}
                maxCount={1}
              >
                <Button icon={<UploadOutlined />}>
                  Click to upload Resume
                </Button>
              </Upload>
            </Form.Item>
          </Col>
        </Row> */}
        <Row>
          <Col md={{ span: 5, offset: 6 }}>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Submit
              </Button>
            </Form.Item>
          </Col>
          <Col md={{ span: 5, offset: 1 }}>
            <Form.Item>
              <Button
                type="primary"
                style={{ width: "100%" }}
                danger
                onClick={() => navigate("/manageresource")}
              >
                Cancel
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
