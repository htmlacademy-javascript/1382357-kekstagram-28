import './data.js';
import './create-pictures.js';
import './big-picture.js';
import './social-comment.js';
import './form.js';
import './api.js';
import { sendData, getData } from './api.js';
import { closeModal } from './form.js';
import './scale.js';
import './effect-level-slider.js';
import {renderGallery, setPictureList} from './create-pictures.js';
import { showAlert, showErrorMessage, showSuccessMessage } from './util.js';
import { onFormSubmit } from './form.js';

onFormSubmit(async (data) => {
  try {
    await sendData(data);
    closeModal();
    showSuccessMessage();
  } catch {
    showErrorMessage();
  }
});

getData()
  .then((pictures) => {
    renderGallery(pictures);
    setPictureList(pictures);
  })
  .catch(
    (err) => {
      showAlert(err.message);
    }
  );
