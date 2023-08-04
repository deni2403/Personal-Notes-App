import React from 'react';
import PropTypes from 'prop-types';
import { BsCheck2 } from 'react-icons/bs';

class NoteInput extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: '',
      body: '',
    };

    this.onTitleChangeEventHandler = this.onTitleChangeEventHandler.bind(this);
    this.onInputBodyEventHandler = this.onInputBodyEventHandler.bind(this);
    this.onSaveNoteEventHandler = this.onSaveNoteEventHandler.bind(this);
  }

  onTitleChangeEventHandler(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  onInputBodyEventHandler(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  onSaveNoteEventHandler(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <section className="add-new-page">
        <div className="add-new-page__input">
          <input
            className="add-new-page__input__title"
            type="text"
            placeholder="Note Title"
            value={this.state.title}
            onChange={this.onTitleChangeEventHandler}
          />
          <div
            className="add-new-page__input__body"
            contentEditable="true"
            data-placeholder="Write note here..."
            onInput={this.onInputBodyEventHandler}
          ></div>
        </div>
        <div className="add-new-page__action">
          <button
            className="action"
            type="button"
            title="Simpan"
            onClick={this.onSaveNoteEventHandler}
          >
            <BsCheck2 />
          </button>
        </div>
      </section>
    );
  }
}

NoteInput.propTypes = {
  addNote: PropTypes.func.isRequired,
};

export default NoteInput;
