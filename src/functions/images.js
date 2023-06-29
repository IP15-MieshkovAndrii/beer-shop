export const renderDefaultBeer = (categories) => {
    switch (categories[0].slug) {
      case "beer":
        return "../images/beer.jpeg";
      case "cidre":
        return "../images/cidre.jpeg";
      case "wine":
        return "../images/beer.jpeg";
      default:
        return "../images/beer.jpeg";
    }
  };