import React, { useState, useEffect } from "react";
import sesijaDogadjajiService from "../../services/sesijaDogadjaji.service";
import { Typography } from "antd";
import {
  Content,
  StyledTable,
  Toolbar,
} from "../../components/BasicStyledComponents";
import { useLocation } from "react-router-dom";
import moment from "moment";

const SesijaDogadjaji = () => {
  const [dogadjaji, setDogadjaji] = useState([]);
  const location = useLocation();
  const { id } = location.state;

  useEffect(() => {
    sesijaDogadjajiService.getAll(id, id).then((res) => setDogadjaji(res.data));
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Naziv",
      dataIndex: "naziv",
    },
    {
      title: "Opis",
      dataIndex: "opis",
    },
    {
      title: "Vrijeme pocetka",
      dataIndex: "vrijemePocetka",
      render: (text) => moment(text).format("yyyy-MM-DD HH:mm"),
    },
    {
      title: "Lokacija",
      dataIndex: "lokacijaAdresa",
    },
    {
      title: "Prostorija",
      dataIndex: "prostorijaBroj",
    },
  ];

  return (
    <Content>
      <Toolbar>
        <Typography.Title level={3}>{"Dogadjaji"}</Typography.Title>
      </Toolbar>
      <StyledTable
        key="id"
        dataSource={dogadjaji}
        columns={columns}
        scroll={{ y: "calc(100vh - 250px)" }}
      />
    </Content>
  );
};
export default SesijaDogadjaji;
