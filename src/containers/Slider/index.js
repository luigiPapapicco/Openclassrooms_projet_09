import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);

  // Tri des événements par date décroissante
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtB.date) - new Date(evtA.date)
  );

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
        const key = `${event.title}-${idx}`;

        return (
          <div key={key} className={`SlideCard SlideCard--${index === idx ? "display" : "hide"}`}>
            <img src={event.cover} alt={event.title} />
            <div className="SlideCard__descriptionContainer">
              <div className="SlideCard__description">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
                <div>{getMonth(new Date(event.date))}</div>
              </div>
            </div>
          </div>
        );
      })}

      {/* Pagination en dehors des diapositives */}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((_, radioIdx) => {
            const radioKey = `radio-${radioIdx}`;
            return (
              <input
                key={radioKey}
                type="radio"
                name="slider-radio"
                checked={index === radioIdx}  // Utiliser `index` au lieu de `idx` pour vérifier si la bullet est active
                onChange={() => setIndex(radioIdx)}  // Change l'index lorsqu'on clique sur une bullet
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Slider;
