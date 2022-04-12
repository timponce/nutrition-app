import announcerStyles from "../styles/Announcer.module.css";

const Announcer = ({ message }) => {
  return (
    <div role="region" aria-live="polite" className={announcerStyles.hidden}>
      {message}
    </div>
  );
};

export default Announcer;
