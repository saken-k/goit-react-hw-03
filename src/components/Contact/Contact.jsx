import css from "./Contact.module.css";
import { HiPhone } from "react-icons/hi2";
import { FaUser } from "react-icons/fa";

const Contact = ({ contact: { id, name, number }, onDelete }) => {
  return (
    <li className={css.item}>
      <div className={css.data}>
        <p className={css.p}>
          <FaUser />
          {name}
        </p>
        <p className={css.p}>
          <HiPhone />
          {number}
        </p>
      </div>
      <button onClick={() => onDelete(id)}>Delete</button>
    </li>
  );
};

export default Contact;
