import React from 'react';
import { BsPlusLg } from 'react-icons/bs';
import LocaleContext from '../contexts/LocaleContext';

function AddNoteButton() {
  const { locale } = React.useContext(LocaleContext);
  return (
    <button className="action" title={locale === 'id' ? 'Tambah' : 'Add'}>
      <BsPlusLg />
    </button>
  );
}

export default AddNoteButton;
