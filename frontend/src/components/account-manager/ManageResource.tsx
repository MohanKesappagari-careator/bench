import { EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@apollo/client";
import { Button, Space, Switch, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CONSTANTS from "../../constants";
import ACCOUNT_MANAGER_SERVICE from "../../services/AccountManagerService";
import { Store } from "../../types/Redux";

export default function ManageResource() {
  const navigate = useNavigate();
  const { code } = useParams();
  const [hidden, setHiden] = useState(false);
  const ROLE = useSelector((store: Store) => store.userSession.user?.role);
  const { data, loading, refetch } = useQuery(
    ACCOUNT_MANAGER_SERVICE.ALL_RESOURCES
  );
  const [updateSwitch] = useMutation(ACCOUNT_MANAGER_SERVICE.UPDATE_RESOURCE);

  useEffect(() => {
    console.log(code, "filter");
    if (ROLE == CONSTANTS.ROLE[1]) setHiden(true);
  }, []);
  const onchange = (id: any, val: any) => {
    updateSwitch({
      variables: {
        updateResourceInput: {
          id: Number(id),
          isactive: val,
        },
      },
    })
      .then(() => refetch())
      .catch((e) => {
        console.log(
          "🚀 ~ file: ManageResource.tsx ~ line 24 ~ onchange ~ e",
          e
        );
      });
  };
  useEffect(() => {
    refetch();
  }, []);
  const columns = [
    {
      title: "Sr. No.",
      dataIndex: "tableId",
    },
    {
      title: "Name",
      dataIndex: "firstname",
      render: (val: any, obj: any) => obj.firstname + " " + obj.lastname,
      sorter: (a: any, b: any) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: "Careator Email",
      dataIndex: "careatoremail",
    },
    {
      title: "Skills",
      dataIndex: "skills",
      render: (val: any) => (
        <>
          {val.split(",").map((val: any) => (
            <Tag color={"blue"} key={val}>
              {val}
            </Tag>
          ))}
        </>
      ),
      width: "25%",
    },
    {
      title: "Experience",
      dataIndex: "totalexperience",
      render: (val: any) => val || "Not Provided",
    },

    {
      title: "Bench Status",
      dataIndex: "statuscode",
      filters: CONSTANTS.STATUS_LIST,
      hidden: hidden,
      onFilter: (value: any, record: any) =>
        record.statuscode.indexOf(value) === 0,

      render: (status: any) => (
        <>
          {status == CONSTANTS.STATUS_CODE[0] ? (
            <Tag color={CONSTANTS.COLORS[0]} key={status}>
              {CONSTANTS.STATUS[0]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[1] ? (
            <Tag color={CONSTANTS.COLORS[1]} key={status}>
              {CONSTANTS.STATUS[1]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[2] ? (
            <Tag color={CONSTANTS.COLORS[2]} key={status}>
              {CONSTANTS.STATUS[2]}
            </Tag>
          ) : status == CONSTANTS.STATUS_CODE[3] ? (
            <Tag color={CONSTANTS.COLORS[3]} key={status}>
              {CONSTANTS.STATUS[3]}
            </Tag>
          ) : null}
        </>
      ),
    },
    {
      title: "Actions",
      dataIndex: "action",
      // key: "email",
      render: (id: any, record: any) => (
        <>
          <Space align="center" size="large">
            <EditOutlined
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
              onClick={() => {
                navigate(`/updateresource/${record.id}`);
              }}
            />

            <Switch
              checked={record.isactive}
              onChange={(checked: any) => onchange(record.id, checked)}
              style={{ fontSize: "1.5rem", cursor: "pointer" }}
            />
            {/* {record.resumeid ? (
              <Button>Update Resume</Button>
            ) : (
              <Button>Upload Resume</Button>
            )}

            {ROLE == CONSTANTS.ROLE[2] ? (
              <Button>Schedule Interview </Button>
            ) : null} */}
          </Space>
        </>
      ),
    },
  ].filter((val) => !val.hidden);
  return (
    <div>
      {ROLE == CONSTANTS.ROLE[1] ? (
        <Button
          type="primary"
          onClick={() => navigate("/createresource")}
          style={{
            float: "right",
            marginTop: "1rem",
          }}
        >
          <PlusOutlined />
          Add Resource
        </Button>
      ) : null}
      <br />
      <br />
      <br />
      <div>
        <Table
          columns={columns}
          dataSource={
            data?.allresources
              ? data.allresources
                  .filter((val: any) => {
                    if (code == undefined) {
                      return val;
                    } else if (val.statuscode === code) {
                      return val;
                    }
                  })
                  .map((val: any, index: any) => ({
                    ...val,
                    tableId: index + 1,
                  }))
              : null
          }
          rowKey={(record: any) => record?.id}
          scroll={{ x: 1000 }}
          loading={loading}
          className="admintable"
        />
      </div>
    </div>
  );
}
