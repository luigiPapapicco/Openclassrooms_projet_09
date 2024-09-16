import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  // Utilisation du hook `useData` pour récupérer les données `data`
  const { data } = useData();
  // Initialisation de l'état `index` à 0 pour suivre la diapositive active
  const [index, setIndex] = useState(0);

  
  // Déclare une constante `byDateDesc` qui trie les événements dans `data.focus`.
  //  La méthode `sort` est utilisée pour trier les événements.
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    // Compare les dates des événements `evtA` et `evtB`. Si la date de `evtA` est plus récente que celle de `evtB`, retourne `-1` (ce qui place `evtA` avant `evtB`), sinon retourne `1` (ce qui place `evtA` après `evtB`). Cela organise les événements par ordre décroissant (du plus récent au plus ancien).
    new Date(evtA.date) > new Date(evtB.date) ? -1 : 1
  );

  // Déclare la fonction `nextCard` qui sera appelée pour passer à la diapositive suivante.
  // Fonction pour avancer la diapositive
  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  
  useEffect(() => {
    // Configuration du timeout
    const timer = setTimeout(nextCard, 5000);

    // Nettoyage du timeout lorsqu'il y a un changement d'index ou lorsque le composant est démonté
    return () => clearTimeout(timer);
  }, [index, byDateDesc]);


  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => {
        const key = `${event.title}-${idx}`
        // console.log(key);
        

        return (
          <div
            key={key}
            className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt="forum" />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        )
    })}
    <div className="SlideCard__paginationContainer">
      <div className="SlideCard__pagination">
        {byDateDesc?.map((_, radioIdx) => {
          const radioKey = `radio-${radioIdx}`
          // console.log(radioKey);
          
          return (
            <input
              key={radioKey}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => setIndex(radioIdx)}
            />
          )
        })}
      </div>
    </div>
  </div>
  );
};

export default Slider;
