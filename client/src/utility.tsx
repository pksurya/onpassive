export const addStyle = (url: string) => {
  let a: any = document.getElementById(url);
  if (!a) {
    const style = document.createElement("link");
    style.id = url;
    style.href = url;
    style.rel = "stylesheet";
    //style.async = true;
    document.head.appendChild(style);
  }
};
export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
}
export const ConvertObjToQueryString = (obj: any, url: any) => {
  var queryString = Object.keys(obj).map(key => {
    if (obj[key] != "" && obj[key] != null) {
      return key + '=' + (obj[key] || "")
    }
    else if (obj[key] === 0) {
      return key + '=' + "0"
    }
    else if (typeof obj[key] == 'boolean' && obj[key] != null) {
      return key + '=' + obj[key];
    }
  }).filter(x => { return x != null && x != "" }).join('&');
  queryString = queryString.replace(/\_/g, ' ');
  return url + "?" + queryString;
}