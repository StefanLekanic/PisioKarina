import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Button,
  Select,
  Space,
  Popconfirm,
  message,
} from "antd";
import PropTypes from "prop-types";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import DogadjajModal from "./DogadjajModal";
import korisniciService from "../../../services/korisnici.service";
import { StyledTable } from "../../../components/BasicStyledComponents";

const SesijaModal = (props) => {
  const {
    visible,
    onOk,
    onCancel,
    editMode,
    sesija,
    setEditMode,
    getDogadjaji,
  } = props;
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [korisnici, setKorisnici] = useState([]);
  const [dogadjaji, setDogadjaji] = useState([]);
  const [selectedDogadjaj, setSelectedDogadjaj] = useState(null);

  const [brojac, setBrojac] = useState(1);
  const [flag, setFlag] = useState(false);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      getDogadjaji({ ...dogadjaji });
      onOk({ ...values });
      setFlag(true);
    });
  };

  useEffect(() => {
    if (sesija) form.setFieldsValue(sesija);
    else if (flag) form.resetFields();
    // eslint-disable-next-line
  });

  const showModal = () => {
    setEditMode(false);
    setIsModalVisible(true);
  };

  const editModal = (dogadjaj) => {
    setSelectedDogadjaj(dogadjaj);
    setEditMode(true);
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setEditMode(false);
    setSelectedDogadjaj(null);
    setIsModalVisible(false);
  };

  const saveData = (dog) => {
    if (editMode) {
      handleCancel();
      setDogadjaji(
        dogadjaji.map((el) => (el.id === dog.id ? { ...el, ...dog } : el))
      );
    } else {
      dog.id = brojac;
      setBrojac(brojac + 1);
      handleCancel();
      setDogadjaji([...dogadjaji, dog]);
    }
  };

  const onDelete = (dogadjaj) => {
    message.success("uspjesno obrisano");
    setDogadjaji(dogadjaji.filter((el) => el.id !== dogadjaj.id));
  };

  useEffect(() => {
    korisniciService.getAll().then((res) => setKorisnici(res.data));
  }, []);

  const columns = [
    {
      title: "Naziv dogadjaja",
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

  return (
    <Modal
      title={editMode ? "Sesija update" : "Nova sesija"}
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
          name="moderatorId"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Email moderatora"}
        >
          <Select>
            {korisnici.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.email}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="lozinka"
          rules={[{ required: false }]}
          label={"Lozinka sesije"}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item
          name="moderatorLozinka"
          rules={[{ required: false }]}
          label={"Lozinka moderatora"}
        >
          <Input.Password
            iconRender={(visible) =>
              visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
            }
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={showModal}>
            Dodaj dogadjaj
          </Button>
        </Form.Item>
        <Form.Item name="id" />
        <Form.Item label={"Dogadjaji"} name={"dogadjaji"}>
          <StyledTable
            dataSource={dogadjaji}
            columns={columns}
            scroll={{ y: "calc(100vh - 250px)" }}
          />
        </Form.Item>
      </Form>
      <DogadjajModal
        visible={isModalVisible}
        onOk={saveData}
        onCancel={handleCancel}
        editMode={editMode}
        dogadjaj={selectedDogadjaj}
      />
    </Modal>
  );
};

SesijaModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  editMode: PropTypes.bool,
  sesija: PropTypes.object,
  setEditMode: PropTypes.func,
  getDogadjaji: PropTypes.func,
};

export default SesijaModal;
