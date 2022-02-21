import React, { useState, useEffect } from "react";
import konferencijaSesijeService from "../../services/konferencijaSesije.service";
import { Typography } from "antd";
import {
  Content,
  StyledTable,
  Toolbar,
} from "../../components/BasicStyledComponents";
import { useLocation, Link } from "react-router-dom";

const KonferencijaSesije = () => {
  const [sesije, setSesije] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    konferencijaSesijeService.getAll(id).then((res) => setSesije(res.data));
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Naziv",
      dataIndex: "naziv",
      render: (text, record) => (
        <Link
          to={{
            pathname: `sesije/${record.id}/dogadjaji`,
            state: { id: record.id },
          }}
        >
          {text}
        </Link>
      ),
    },
    {
      title: "Opis",
      dataIndex: "opis",
    },
  ];

  return (
    <Content>
      <Toolbar>
        <Typography.Title level={3}>{"Sesije"}</Typography.Title>
      </Toolbar>
      <StyledTable
        key="id"
        dataSource={sesije}
        columns={columns}
        scroll={{ y: "calc(100vh - 250px)" }}
      />
    </Content>
  );
};
export default KonferencijaSesije;
