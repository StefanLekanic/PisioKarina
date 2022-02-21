import React, { useState, useEffect } from "react";
import {
  Form,
  Modal,
  Input,
  DatePicker,
  Button,
  Space,
  Popconfirm,
  message,
} from "antd";
import PropTypes from "prop-types";
import SesijaModal from "./SesijaModal";
import { StyledTable } from "../../../components/BasicStyledComponents";
// import konferencijaService from "../../../services/konferencija.service";

const KonferencijaModal = (props) => {
  const { visible, onOk, onCancel } = props;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [sesije, setSesije] = useState([]);

  const [editMode, setEditMode] = useState(false);
  const [selectedSesija, setSelectedSesija] = useState(null);

  const [sesijaDogadjaji, setSesijaDogadjaji] = useState([]);
  const [brojac, setBrojac] = useState(1);
  const [sesijaID, setSesijaID] = useState(0);

  const columns = [
    {
      title: "Naziv sesije",
      dataIndex: "naziv",
    },
    {
      title: "Akcije",
      key: "actions",
      // eslint-disable-next-line react/display-name
      render: (_text, record) => (
        <Space size="middle">
          {/* eslint-disable-next-line */}
          <a onClick={() => editModal(record)}>{"azuriraj"}</a>
          <Popconfirm
            title={"jeste li sigurni?"}
            okText={"da"}
            cancelText={"ne"}
            onConfirm={() => onDelete(record)}
          >
            {/* eslint-disable-next-line */}
            <a>{"obrisi"}</a>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    console.log(sesijaID);
  }, [sesijaID]);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk({ ...values });
    });
  };

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
    /*   // izvrsicemo dodavanje konferencije
    form.validateFields().then((values) => {
      konferencijaService.insert(values).then((res) => {
        konferencijaService
          .getLastInsertedID()
          .then((res) => setBrojac(res.data.id));
      });
    }); */
  };

  const editModal = (sesija) => {
    setSelectedSesija(sesija);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedSesija(null);
    setIsModalVisible(false);
  };

  const saveData = (sesija) => {
    console.log(sesija);
    if (editMode) {
      handleCancel();
      setSesije(
        sesije.map((el) => (el.id === sesija.id ? { ...el, ...sesija } : el))
      );
    } else {
      sesija.id = brojac;
      setBrojac(brojac + 1);
      setSesijaID(sesija.id);
      //  sesija.dogadjaji = sesijaDogadjaji;
      handleCancel();
      setSesije([...sesije, sesija]);
    }
  };

  const onDelete = (sesija) => {
    message.success("uspjesno obrisano");
    setSesije(sesije.filter((el) => el.id !== sesija.id));
  };

  const getDogadjaji = (dogadjaji) => {
    setSesijaDogadjaji([...sesijaDogadjaji, dogadjaji]);
    console.log(sesijaDogadjaji);
  };

  return (
    <Modal
      title="Nova konferencija"
      onOk={() => onSubmit()}
      destroyOnClose
      onCancel={() => onCancel()}
      visible={visible}
    >
      <Form
        form={form}
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 12 }}
        labelAlign="left"
      >
        <Form.Item
          name="naziv"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Naziv"}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="opis"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Opis"}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item
          name="vrijemePocetka"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Vrijeme pocetka"}
        >
          <DatePicker showTime format="yyyy-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="vrijemeKraja"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Vrijeme kraja"}
        >
          <DatePicker showTime format="yyyy-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={showModal}>
            Dodaj Sesiju
          </Button>
        </Form.Item>
        <Form.Item label={"Sesije"}>
          <StyledTable
            dataSource={sesije}
            columns={columns}
            scroll={{ y: "calc(100vh - 250px)" }}
          />
        </Form.Item>
      </Form>
      <SesijaModal
        visible={isModalVisible}
        onOk={saveData}
        onCancel={handleCancel}
        editMode={editMode}
        sesija={selectedSesija}
        setEditMode={setEditMode}
        getDogadjaji={getDogadjaji}
      />
    </Modal>
  );
};

KonferencijaModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
};

export default KonferencijaModal;
