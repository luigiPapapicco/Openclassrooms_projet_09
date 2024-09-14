import { useState } from "react";
import EventCard from "../../components/EventCard";
import Select from "../../components/Select";
import { useData } from "../../contexts/DataContext";
import Modal from "../Modal";
import ModalEvent from "../ModalEvent";

import "./style.css";

const PER_PAGE = 9;

const EventList = () => {
  const { data, error } = useData();
  const [type, setType] = useState(null); // Type sélectionné
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des événements en fonction du type sélectionné
  const filteredEvents = (data?.events || []).filter(event => !type || event.type === type);
 // Utilisation de `type` ici pour filtrer les événements


  // Application de la pagination sur les événements filtrés
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE,
    currentPage * PER_PAGE
  );

  // Mise à jour du type sélectionné et réinitialisation de la page courante
  const changeType = (evtType) => {
    // console.log('Type sélectionné:', evtType); consol permetant de voire la catégorie choisie
    setType(evtType); // Mise à jour de `type` ici
    setCurrentPage(1);
  };

  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);
  const typeList = Array.from(new Set(data?.events.map(event => event.type)));

  return (
    <>
      {error && <div>An error occurred</div>}
      {data === null ? (
        "loading"
      ) : (
        <>
          <h3 className="SelectTitle">Catégories</h3>
          <Select
            selection={typeList}
            onChange={(value) => changeType(value)}
          />
          <div id="events" className="ListContainer">
            {paginatedEvents.map((event) => (
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)}
                    imageSrc={event.cover}
                    title={event.title}
                    date={new Date(event.date)}
                    label={event.type}
                  />
                )}
              </Modal>
            ))}
          </div>
          <div className="Pagination">
            {[...Array(pageNumber)].map((_, n) => (
              // eslint-disable-next-line react/no-array-index-key
              <a key={n} href="#events" onClick={() => setCurrentPage(n + 1)}>
                {n + 1}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList;
