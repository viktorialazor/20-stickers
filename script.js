const DELETE_BTN_EL = '.sticker-item__delete';
const TEXT_FIELD_EL = '.sticker-item__text'
const STICKER_ITEM_EL = '.sticker-item';

const $addButtonEl = $('#add-button');
const $stickerListEl = $('#sticker-list');
let stickerList = [];

$addButtonEl.on('click', onAddBtnClick);
$stickerListEl.on('focusout', TEXT_FIELD_EL, onTextFieldFocusout);
$stickerListEl.on('click', DELETE_BTN_EL, onDeleteBtnClick);

StickersApi.getList()
  .then((list) => {
    stickerList = list.slice();

    renderStickerList(list);
  })
  .catch(showError);

function onAddBtnClick() {
  StickersApi
    .create()
    .then(renderStickerItem)
    .catch(showError);
};

function onTextFieldFocusout(e) {
  const $stickerEl = getElement($(e.target));
  const id = getElementId($stickerEl);
  const stickerChanges = {
    description: e.target.value,
  };

  StickersApi
  .update(id, stickerChanges)
  .then((updatedSticker) => replaceStickerElement(id, updatedSticker))
  .catch(showError);
};

function onDeleteBtnClick(e) {
  const $stickerEl = getElement($(e.target));
  const id = getElementId($stickerEl);

  StickersApi
    .delete(id)
    .catch(showError);

  $stickerEl.remove();
};

function renderStickerList(list) {
  const stickerListHtml = list.map(generateStickerHtml).join('');

  $stickerListEl.html(stickerListHtml);
};

function renderStickerItem(item) {
  const stickerItemHtml = generateStickerHtml(item);

  $stickerListEl.append(stickerItemHtml);
};

function replaceStickerElement(id, item) {
  const oldStickerEl = getElementById(id);
  const newStickerEl = createStickerElement(item);

  oldStickerEl.replaceWith(newStickerEl);
};

function generateStickerHtml(item) {
  return `
    <div class="sticker-item" data-id="${item.id}">
      <button type="button" class="sticker-item__delete" aria-label="delete"></button>
      <textarea class="sticker-item__text" name="sticker-item-${item.id}" aria-label="text field">${item.description}</textarea>
    </div>
  `;
};

function createStickerElement(item) {
  const wrapperStickerEl = document.createElement('div');

  wrapperStickerEl.innerHTML = generateStickerHtml(item);

  return wrapperStickerEl.querySelector(STICKER_ITEM_EL);
};

function getElement($el) {
  return $el.closest(STICKER_ITEM_EL);
};

function getElementId($el) {
  return $el.data('id');
};

function getElementById(id) {
  $stickerEl = $('#sticker-list').find(`[data-id='${id}']`);

  return $stickerEl;
};

function showError(e) {
  alert(e.message);
};
