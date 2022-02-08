import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@apollo/client";
import {
	Button,
	Col,
	DatePicker,
	Form,
	Input,
	Row,
	Select,
	Upload,
} from "antd";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import SKILLS from "../../constants/skill";
import ACCOUNT_MANAGER_SERVICE from "../../services/AccountManagerService";
import { Store } from "../../types/Redux";

const { Option } = Select;

export default function CreateResource() {
	const navigate = useNavigate();
	const [code] = useState("91");
	const [file, setFile] = useState<any>("");
	const [fileList, setfileList] = useState<any>([]);

	const [form] = Form.useForm();
	const userId = useSelector((store: Store) => store.userSession.user?.userid);
	const [createresource] = useMutation(ACCOUNT_MANAGER_SERVICE.CREATE_RESOURCE);
	const [update] = useMutation(ACCOUNT_MANAGER_SERVICE.UPDATE_RESOURCE);
	function onChange(e: any) {
		setFile(e.file);
		const formdata = new FormData();
		formdata.append("docfile", e.file);

		const isLt2M = e.file.size / 1024 / 1024 < 8;
		if (!isLt2M) {
			alert("File must smaller than 8MB!");
			return;
		}
	}
	const dummyRequest = (file: any, onSuccess: any) => {
		setTimeout(() => {
			onSuccess("ok");
		}, 0);
	};

	const onFinish = async (values: any) => {
		console.log("Received values of form: ", values);
		const formdata = new FormData();
		formdata.append("docfile", file);
		await createresource({
			variables: {
				createResourceInput: {
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
					statuscode: "V",
					comments: values.comments,
					createdby: userId,
				},
			},
		})
			.then(async (data) => {
				let rid = data.data.createResource.id;
				await ACCOUNT_MANAGER_SERVICE.UPLOAD_DOCUMENT(formdata, rid)
					.then(async (data: any) => {
						console.log(data, "pppp");

						await update({
							variables: {
								updateResourceInput: {
									id: Number(rid),
									resumeid: Number(data.data.id),
								},
							},
						}).catch((e) => {
							console.log(
								"🚀 ~ file: CreateResource.tsx ~ line 92 ~ .then ~ e",
								e
							);
						});
					})
					.catch((e) => {
						console.log(
							"🚀 ~ file: CreateResource.tsx ~ line 79 ~ .then ~ e",
							e
						);
					});
				navigate("/manageresource");
			})
			.catch((e) => {
				console.log(
					"🚀 ~ file: CreateResource.tsx ~ line 42 ~ onFinish ~ e",
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
				<Row>
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
				</Row>
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
