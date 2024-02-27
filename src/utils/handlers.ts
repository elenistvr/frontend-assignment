export const authorValidation = (author?: string): string => {
  if (!author) return "";

  try {
    const at = author.indexOf("@");
    if (at === -1) {
      throw new Error("invalid author email: @ not found");
    }
    const dot = author.indexOf(".", at);
    if (dot === -1 || dot === at + 1) {
      throw new Error("invalid email: Invalid domain");
    }
    const username = author.substring(0, at);
    const domain = author.substring(at + 1, dot);
    const suffix = author.substring(dot);

    const hiddenDomain = domain.replace(/./g, "*");
    return `${username}@${hiddenDomain}${suffix}`;
  } catch (error) {
    console.error(error);
  }
  return "";
};

export const fDate = (createdDate?: string): string => {
  if (!createdDate) return "";

  try {
    const date = new Date(createdDate);
    if (!date.getTime()) {
      throw new Error("Invalid date");
    }
    return date.toLocaleDateString("gr-GR", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  } catch (error) {
    console.error(error);
  }
  return "";
};

export const viewsColor = (views: number): string => {
  if (views >= 0 && views <= 25) {
    return "tomato";
  } else if (views >= 26 && views <= 50) {
    return "orange";
  } else if (views >= 51 && views <= 75) {
    return "yellow";
  } else if (views >= 76 && views <= 100) {
    return "green";
  } else {
    return "";
  }
};
