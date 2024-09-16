// Importation du hook useState pour gérer les états locaux
import { useState } from "react";

// Importation du composant EventCard pour afficher les détails de l'événement
import EventCard from "../../components/EventCard";

// Importation du composant Select pour afficher la liste des catégories
import Select from "../../components/Select";

// Importation du hook useData pour récupérer les données depuis DataContext
import { useData } from "../../contexts/DataContext";

// Importation du composant Modal pour afficher un événement dans une fenêtre modale
import Modal from "../Modal";

// Importation du composant ModalEvent pour afficher les détails spécifiques d'un événement dans la modale
import ModalEvent from "../ModalEvent";

// Importation du fichier CSS pour la mise en forme
import "./style.css";

// Définition du nombre d'événements par page
const PER_PAGE = 9;

const EventList = () => {
  // Récupération des données et gestion des erreurs depuis le contexte DataContext
  const { data, error } = useData();

  // État pour stocker la catégorie sélectionnée, initialisé à null pour "toutes les catégories"
  const [type, setType] = useState(null);

  // État pour gérer la page courante de la pagination, initialisé à la première page (1)
  const [currentPage, setCurrentPage] = useState(1);

  // Filtrage des événements en fonction de la catégorie sélectionnée
  const filteredEvents = (
    !type
      ? data?.events // Si aucune catégorie n'est sélectionnée, retourner tous les événements
      : data?.events.filter((event) => event.type === type) // Si une catégorie est sélectionnée, ne garder que les événements de cette catégorie
  ) || []; // Si data?.events est null ou indéfini, retourner un tableau vide

  // Pagination : découper les événements filtrés en fonction de la page actuelle
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * PER_PAGE, // Calcul de l'index de début pour les événements à afficher sur la page courante
    currentPage * PER_PAGE // Calcul de l'index de fin pour les événements à afficher sur la page courante
  );

  // Fonction pour gérer le changement de catégorie
  const changeType = (evtType) => {
    setCurrentPage(1); // Réinitialiser à la première page lorsque la catégorie change
    setType(evtType); // Mettre à jour l'état `type` avec la nouvelle catégorie sélectionnée
  };

  
  // Calcul du nombre total de pages en fonction du nombre d'événements filtrés
  const pageNumber = Math.ceil(filteredEvents.length / PER_PAGE);

  // Générer une liste unique des catégories d'événements à partir des événements disponibles
  const typeList = Array.from(new Set(data?.events.map((event) => event.type)));

  return (
    <>
      {/* Afficher un message d'erreur si une erreur est survenue lors de la récupération des données */}
      {error && <div>An error occurred</div>}
      
      {/* Si les données ne sont pas encore disponibles, afficher "loading" */}
      {data === null ? (
        "loading"
      ) : (
        <>
          {/* Titre pour la sélection des catégories */}
          <h3 className="SelectTitle">Catégories</h3>
          
          {/* Composant Select pour afficher la liste des catégories disponibles */}
          <Select
            selection={typeList} // Passer la liste des catégories uniques au composant Select
            onChange={(value) => changeType(value)} // Appeler la fonction changeType lorsqu'une catégorie est sélectionnée
          />
          
          {/* Conteneur pour afficher la liste des événements */}
          <div id="events" className="ListContainer">
            {/* Afficher les événements paginés */}
            {paginatedEvents.map((event) => (
              // Chaque événement est encapsulé dans un Modal
              <Modal key={event.id} Content={<ModalEvent event={event} />}>
                {({ setIsOpened }) => (
                  <EventCard
                    onClick={() => setIsOpened(true)} // Ouvrir la modale lorsque l'événement est cliqué
                    imageSrc={event.cover} // Afficher l'image de couverture de l'événement
                    title={event.title} // Afficher le titre de l'événement
                    date={new Date(event.date)} // Afficher la date de l'événement
                    label={event.type} // Afficher le type (catégorie) de l'événement
                  />
                )}
              </Modal>
            ))}
          </div>

          {/* Pagination : génération des liens pour naviguer entre les pages */}
          <div className="Pagination">
            {/* Générer des liens pour chaque page en fonction du nombre total de pages */}
            {[...Array(pageNumber)].map((_, n) => (
              <a
                key={`page-${n + 1}`} // Utiliser une clé unique basée sur le numéro de la page
                href="#events" // Lien ancre vers le conteneur des événements
                onClick={() => setCurrentPage(n + 1)} // Mettre à jour la page courante lorsqu'un numéro de page est cliqué
              >
                {n + 1} {/* Afficher le numéro de la page */}
              </a>
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default EventList; // Exportation du composant EventList
