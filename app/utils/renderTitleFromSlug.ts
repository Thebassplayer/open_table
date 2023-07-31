const renderTitleFromSlug = (name: string): string => {
  const titleArray = name.split("-");
  const titleToUpperCase = titleArray.map(
    word => word[0].toUpperCase() + word.slice(1)
  );
  const wrapCity = (titleToUpperCase: string[]): string => {
    titleToUpperCase[titleToUpperCase.length - 1] = `(${
      titleToUpperCase[titleToUpperCase.length - 1]
    })`;
    return titleToUpperCase.join(" ");
  };

  return wrapCity(titleToUpperCase);
};

export default renderTitleFromSlug;
