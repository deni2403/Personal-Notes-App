import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data";
import NoteDetail from "../components/NoteDetail";
import {
  BsFillFileEarmarkArrowDownFill,
  BsFillFileEarmarkArrowUpFill,
  BsTrash,
} from "react-icons/bs";
import LocaleContext from "../contexts/LocaleContext";
import LoadingIndicator from "../components/LoadingIndicator";

function DetailPage() {
  const { locale } = React.useContext(LocaleContext);
  const [note, setNote] = React.useState([]);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    setIsLoading(true);
    getNote(id).then(({ data }) => {
      setNote(data);
      setIsLoading(false);
    });
  }, [id]);

  async function onDeleteHandler(event) {
    event.preventDefault();
    await deleteNote(id);
    navigate("/");
  }

  async function onArchiveHandler(event) {
    event.preventDefault();
    await archiveNote(id);
    navigate("/");
  }

  async function onUnArchiveHandler(event) {
    event.preventDefault();
    await unarchiveNote(id);
    navigate("/");
  }

  if (note === null) {
    return (
      <p className="notes-list__empty">
        {locale === "id" ? "Catatan tidak ditemukan !" : "Note not found !"}
      </p>
    );
  }

  return (
    <section className="detail-page">
      {isLoading ? (
        <LoadingIndicator
          text={locale === "id" ? "Memuat catatan..." : "Loading note..."}
        />
      ) : (
        <NoteDetail {...note} />
      )}
      <div className="detail-page__action">
        {note.archived === false ? (
          <button
            className="action"
            type="button"
            title="Arsipkan"
            onClick={onArchiveHandler}
          >
            <BsFillFileEarmarkArrowDownFill />
          </button>
        ) : (
          <button
            className="action"
            type="button"
            title="Aktifkan"
            onClick={onUnArchiveHandler}
          >
            <BsFillFileEarmarkArrowUpFill />
          </button>
        )}
        <button
          className="action"
          type="button"
          title="Hapus"
          onClick={onDeleteHandler}
        >
          <BsTrash />
        </button>
      </div>
    </section>
  );
}

export default DetailPage;
