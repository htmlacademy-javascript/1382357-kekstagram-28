import './data.js';
import './create-pictures.js';
import './big-picture.js';
import './social-comment.js';
import './form.js';
import './api.js';
import { sendData } from './api.js';
import { closeModal } from './form.js';

setOnFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
  }
})
