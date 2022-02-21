import React, { useState, useEffect } from "react";
import konferencijaService from "../../services/konferencija.service";
import { Typography, Button, message } from "antd";
import {
  Content,
  StyledTable,
  Toolbar,
} from "../../components/BasicStyledComponents";
import { Link } from "react-router-dom";
import KonferencijaModal from "./components/KonferencijaModal";
import moment from "moment";

const Konferencija = () => {
  const [konferencije, setKonferencije] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  // const [selectedKonferencija, setSelectedKonferencija] = useState(null);
  // const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    konferencijaService.getAll().then((res) => setKonferencije(res.data));
  }, []);

  const columns = [
    {
      title: "Naziv",
      dataIndex: "naziv",
      // eslint-disable-next-line
      render: (text, record) => <Link to={{ pathname: `konferencije/${record.id}/sesije`, state: {id: record.id}}}>{text}</Link>,
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
      title: "Vrijeme zavrsetka",
      dataIndex: "vrijemeKraja",
      render: (text) => moment(text).format("yyyy-MM-DD HH:mm"),
    },
  ];

  const showModal = () => {
    setIsModalVisible(true);
  };

  /* const handleOk = () => {
    setIsModalVisible(false);
  }; */

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const saveData = (konferencija) => {
    console.log(konferencija);
    konferencijaService.insert(konferencija).then((res) => {
      handleCancel();
      message.success("uspjesno dodavanje!");
      setKonferencije([...konferencije, res]);
    });
  };

  /*  const openEditModal = (konferencija) => {
    setSelectedKonferencija(konferencija);
    setEditMode(true);
    setIsModalVisible(true);
  }; */

  return (
    <Content>
      <Toolbar>
        <Typography.Title level={3}>{"Konferencije"}</Typography.Title>
        <Button type="primary" onClick={showModal}>
          {"Kreiraj konferenciju"}
        </Button>
      </Toolbar>
      <StyledTable
        key="id"
        dataSource={konferencije}
        columns={columns}
        scroll={{ y: "calc(100vh - 250px)" }}
      />
      <KonferencijaModal
        visible={isModalVisible}
        onOk={saveData}
        onCancel={handleCancel}
      />
    </Content>
  );
};

export default Konferencija;
