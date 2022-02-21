import React, { useState, useEffect } from "react";
import {
  Modal,
  Form,
  Input,
  Select,
  DatePicker,
  InputNumber,
  Radio,
} from "antd";
import PropTypes from "prop-types";
import vrstaDogadjajaService from "../../../services/vrstaDogadjaja.service";
import lokacijaService from "../../../services/lokacija.service";
import korisniciService from "../../../services/korisnici.service";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

const DogadjajModal = (props) => {
  const { visible, onOk, onCancel, dogadjaj } = props;
  const [form] = Form.useForm();
  const [vrsteDogadjaja, setVrsteDogadjaja] = useState([]);
  const [lokacije, setLokacije] = useState([]);
  const [prostorije, setProstorije] = useState([]);
  const [korisnici, setKorisnici] = useState([]);
  const [radioValue, setValue] = useState(true);
  const [flag, setFlag] = useState(true);

  const onSubmit = () => {
    form.validateFields().then((values) => {
      onOk({ ...values });
      setFlag(true);
    });
  };

  useEffect(() => {
    if (dogadjaj) form.setFieldsValue(dogadjaj);
    else if (flag) form.resetFields();
    // eslint-disable-next-line
  });

  useEffect(() => {
    vrstaDogadjajaService.getAll().then((res) => setVrsteDogadjaja(res.data));
    lokacijaService.getAll().then((res) => setLokacije(res.data));
    korisniciService.getAll().then((res) => setKorisnici(res.data));
  }, []);

  const handleChange = (value) => {
    setFlag(false);
    console.log(`${value}`);
    lokacijaService
      .getAllProstorijeById(`${value}`)
      .then((res) => setProstorije(res.data));
  };

  const onChange = (e) => {
    setFlag(false);
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <Modal
      title="Novi dogadjaj"
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
          name="vrstaDogadjajaId"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Vrsta dogadjaja"}
        >
          <Select>
            {vrsteDogadjaja.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.naziv}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="lokacijaId"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Lokacija dogadjaja"}
        >
          <Select onChange={handleChange}>
            {lokacije.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.opis}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="prostorijaId"
          rules={[{ required: false }]}
          label={"Broj prostorije"}
        >
          <Select>
            {prostorije.map((e) => (
              <Select.Option key={e.id} value={e.id}>
                {e.broj}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="vrijemePocetka"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Vrijeme pocetka"}
        >
          <DatePicker showTime format="yyyy-MM-DD HH:mm:ss" />
        </Form.Item>
        <Form.Item
          name="trajanje"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Trajanje (min)"}
        >
          <InputNumber min={1} />
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
          name="predavacId"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Email predavaca"}
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
          name="uzivo"
          rules={[{ required: true, message: "obavezno polje" }]}
          label={"Nacin izvodjenja"}
        >
          <Radio.Group onChange={onChange} value={radioValue}>
            <Radio value={true}>Uzivo</Radio>
            <Radio value={false}>Online</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="lozinka"
          rules={[{ required: false }]}
          label={"Lozinka dogadjaja"}
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
      </Form>
    </Modal>
  );
};

DogadjajModal.propTypes = {
  visible: PropTypes.bool,
  onOk: PropTypes.func,
  onCancel: PropTypes.func,
  dogadjaj: PropTypes.object,
};

export default DogadjajModal;
