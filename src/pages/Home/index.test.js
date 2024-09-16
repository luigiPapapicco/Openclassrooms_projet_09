import { fireEvent, render, screen } from "@testing-library/react";
import Home from "./index";

describe("When Form is created", () => {
  it("a list of fields card is displayed", async () => {
    render(<Home />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success message is displayed", async () => {
      render(<Home />);
      fireEvent(
        await screen.findByText("Envoyer"),
        new MouseEvent("click", {
          cancelable: true,
          bubbles: true,
        })
      );
      await screen.findByText("En cours");
      await screen.findByText("Message envoyé !");
    });
  });

});

// le bloc describe me permet de regrouper plusieur test dans la même description, dans le cas présent lors de la création d'une page
describe("When a page is created", () => {
  // Test pour vérifier que la liste des événements est affichée
  // Le bloc `it` décrit la tache a faire, la il vérifie que la liste des événements est bien affichée sur la page
  it("a list of events is displayed", async () => {
    // monte le composant `Home` dans l'environnement de test afin de simuler l'affichage de la page dans le DOM.
    render(<Home />);
    // stock dans une variable le mot qu'il va rechercher
    const eventTitle = await screen.findByText("Experience digitale");
    // vérifie si la tache a été faite
    expect(eventTitle).toBeInTheDocument();
  });

  it("a list a people is displayed", async () => {
    render(<Home />);
    const personName = await screen.findByText("Samira");
    const personName2 = await screen.findByText("Jean-baptiste");
    const personName3 = await screen.findByText("Christine");


    expect(personName).toBeInTheDocument();
    expect(personName2).toBeInTheDocument();
    expect(personName3).toBeInTheDocument();
  });

  it("a footer is displayed", async () => {
    render(<Home />);
    // Vérification que l'adresse  est présente dans le footer
    const footerAddress = await screen.findByText("45 avenue de la République, 75000 Paris");
    expect(footerAddress).toBeInTheDocument();
  
    // Récupérer tous les éléments ayant le rôle de "link"
    const links = screen.getAllByRole('link');
    
    // Chercher le lien correspondant à Facebook en vérifiant son href
    const facebookLink = links.find(link => link.getAttribute('href') === '#facebook');
    expect(facebookLink).toBeInTheDocument();
    
    // Chercher les autres liens par leur href respectif
    const twitchLink = links.find(link => link.getAttribute('href') === '#twitch');
    const twitterLink = links.find(link => link.getAttribute('href') === '#twitter');
    const youtubeLink = links.find(link => link.getAttribute('href') === '#youtube');
  
    // Vérifier que les liens vers les autres réseaux sociaux sont aussi présents
    expect(twitchLink).toBeInTheDocument();
    expect(twitterLink).toBeInTheDocument();
    expect(youtubeLink).toBeInTheDocument();
  });

  // Test pour vérifier que la carte du dernier événement est affichée
  it("displays a message when no last event is available", async () => {
    render(<Home />); // Rendre le composant Home avec un état où `last` est null
  
    // Chercher le paragraphe indiquant qu'il n'y a pas d'événement disponible
    const noEventMessage = await screen.findByText("Aucune donnée disponible pour afficher la dernière prestation.");
    
    // Vérifier que le paragraphe est bien rendu
    expect(noEventMessage).toBeInTheDocument();
  });
});
