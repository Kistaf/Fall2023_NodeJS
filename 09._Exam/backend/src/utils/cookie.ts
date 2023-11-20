export const getCookies = (cookieStr: string): { [key: string]: string } => {
  return cookieStr.split(";").reduce((result, item) => {
    const data = item.trim().split("=");
    return { ...result, [data[0]]: data[1] };
  }, {});
};
