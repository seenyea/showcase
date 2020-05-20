import { message } from 'antd';

const success = (text) => {
  message.success(text);
};

const error = (text) => {
  message.error(text);
};

const warning = (text) => {
  message.warning(text);
};

const Message = {
  success,
  error,
  warning
};

export default Message;
