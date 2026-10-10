const config = {
  restaurantName: "Le Cordon Bleu",
  restaurantTagline: "L'excellence culinaire à votre table",
  maxCouvertsAvantDevis: 20,

  joursFermes: [1],
  joursComplets: [3],

  joursServiceMidiUniquement: [],
  joursServiceSoirUniquement: [2, 4],

  creneauxMidi: ["12:00", "12:30", "13:00", "13:30"],
  creneauxSoir: ["19:30", "20:00", "20:30"],

  messages: {
    datePassee: "La date sélectionnée est dans le passé.",
    jourFirme: "Le restaurant est fermé le lundi.",
    jourComplet: "Le restaurant est complet le mercredi.",
    couvertsTropNombreux: "Pour 20 couverts ou plus, merci de contacter le restaurant pour un devis groupe.",
    champsObligatoires: {
      date: "Veuillez sélectionner une date valide.",
      creneau: "Veuillez sélectionner un créneau horaire.",
      couverts: "Veuillez indiquer le nombre de couverts."
    }
  }
};

const menus = [
  {
    id: 1,
    nom: "Menu Dégustation",
    prix: 95,
    description: "Un voyage en 6 temps autour des produits de saison. Découvrez l'art culinaire de notre chef à travers une succession de plats raffinés qui éveilleront vos papilles.",
    recommande: true,
    plats: [
      {
        categorie: "entree",
        nom: "Velouté de potimarron et châtaignes",
        description: "Crémeux velouté automnal relevé par une touche de crème fouettée et des éclats de châtaignes torréfiées."
      },
      {
        categorie: "entree",
        nom: "Tartare de saumon et avocat",
        description: "Tartare frais de saumon sauvage, avocat, citron vert et coriandre, accompagné de tuiles croustillantes."
      },
      {
        categorie: "plat",
        nom: "Filet de bœuf en croûte de sel",
        description: "Filet de bœuf cuit lentement en croûte de sel, servi avec une purée de céleri et une réduction au vin rouge."
      },
      {
        categorie: "plat",
        nom: "Daurade royale en croûte d'herbes",
        description: "Daurade royale cuite à la perfection, enveloppée dans une croûte d'herbes provençales, accompagnée de légumes de saison."
      },
      {
        categorie: "fromage",
        nom: "Plateau de fromages affinés",
        description: "Sélection de fromages français affinés : comté 18 mois, roquefort, chèvre frais et brie de Meaux."
      },
      {
        categorie: "dessert",
        nom: "Soufflé au chocolat Grand Marnier",
        description: "Soufflé aérien au chocolat noir et Grand Marnier, servi tiède avec une boule de glace vanille."
      },
      {
        categorie: "mignardises",
        nom: "Assortiment de mignardises",
        description: "Petites douceurs pour terminer le repas : macarons, financiers, chocolats et fruits confits."
      }
    ]
  },
  {
    id: 2,
    nom: "Menu Tradition",
    prix: 65,
    description: "Les grands classiques de la cuisine française revisités par notre chef. Un menu équilibré pour découvrir les saveurs traditionnelles.",
    recommande: false,
    plats: [
      {
        categorie: "entree",
        nom: "Foie gras poêlé",
        description: "Escalope de foie gras de canard poêlée, accompagnée de pain d'épices et de chutney de figues."
      },
      {
        categorie: "plat",
        nom: "Magret de canard sauce aux cerises",
        description: "Magret de canard cuit rosé, servi avec une sauce onctueuse aux cerises et des pommes de terre grenaille."
      },
      {
        categorie: "dessert",
        nom: "Tarte Tatin",
        description: "Tarte renversée aux pommes caramélisées, servie tiède avec une boule de glace vanille de Madagascar."
      }
    ]
  },
  {
    id: 3,
    nom: "Menu Découverte",
    prix: 45,
    description: "Une introduction à la gastronomie française. Parfait pour un déjeuner léger ou une première expérience dans notre établissement.",
    recommande: false,
    plats: [
      {
        categorie: "entree",
        nom: "Salade de chèvre chaud",
        description: "Salade verte, rondelles de chèvre chaud sur lit de mesclun, noix et vinaigrette au miel."
      },
      {
        categorie: "plat",
        nom: "Blanquette de veau",
        description: "Blanquette de veau traditionnelle, sauce crémeuse aux champignons, servie avec du riz basmati."
      },
      {
        categorie: "dessert",
        nom: "Île flottante",
        description: "Meringue légère flottant sur une crème anglaise vanillée, nappée de caramel."
      }
    ]
  },
  {
    id: 4,
    nom: "Menu Végétarien",
    prix: 55,
    description: "Un menu 100% végétal pour découvrir les saveurs de la terre. Chaque plat est conçu pour mettre en valeur les légumes de saison.",
    recommande: false,
    plats: [
      {
        categorie: "entree",
        nom: "Velouté de pois cassés à la menthe",
        description: "Velouté onctueux de pois cassés, parfumé à la menthe fraîche et accompagné de croûtons."
      },
      {
        categorie: "plat",
        nom: "Risotto aux champignons sauvages",
        description: "Risotto crémeux aux cèpes et girolles, relevé par une touche de truffe et de parmesan."
      },
      {
        categorie: "fromage",
        nom: "Plateau de fromages de chèvre",
        description: "Assortiment de fromages de chèvre : frais, mi-sec et sec, accompagnés de confiture de figues."
      },
      {
        categorie: "dessert",
        nom: "Panna cotta aux fruits rouges",
        description: "Panna cotta onctueuse à la vanille, servie avec un coulis de fruits rouges frais."
      }
    ]
  }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { config, menus };
}