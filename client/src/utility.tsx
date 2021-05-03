export const btnClick = (id: string) => {
  let btn = document.getElementById(id);
  if (btn) {
    btn.click();
  }
}

export const getSubDomain = () => {
  var full = window.location.host
  //window.location.host is subdomain.domain.com
  var parts = full.split('.')
  var sub = parts[0];
  return sub;
}
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
export const loadScript = (url: string, callback: any) => {

  let script: any = document.createElement("script")
  script.type = "text/javascript";
  script.src = url;
  if (script.readyState) {  //IE
    script.onreadystatechange = function () {
      if (script.readyState == "loaded" ||
        script.readyState == "complete") {
        script.onreadystatechange = null;
        callback();
      }
    };
  } else {  //Others
    script.onload = function () {
      callback();
    };
  }

  document.getElementsByTagName("head")[0].appendChild(script);
}

export const queryStringToObject = () => {
  let queryString: string = window.location.search;
  const pairs = queryString.replace(/%20/g, " ").substring(1).split('&');
  // → ["foo=bar", "baz=buzz"]

  var array = pairs.map((el: any) => {
    const parts = el.split('=');
    return parts;
  });
  // → [["foo", "bar"], ["baz", "buzz"]]

  return Object.fromEntries(array);
  // → { "foo": "bar", "baz": "buzz" }
}

export const shorten = (text: string, maxLength: number, delimiter: string, overflow: boolean) => {
  delimiter = delimiter || "&hellip;";
  overflow = overflow || false;
  var ret = text;
  if (ret && ret.length > maxLength) {
    var breakpoint = overflow ? maxLength + ret.substr(maxLength).indexOf(" ") : ret.substr(0, maxLength).lastIndexOf(" ");
    ret = ret.substr(0, breakpoint) + delimiter;
  }
  return ret;
}
export const loadAppJs = () => {
  loadScript('/js/app.js', function () {
  });
}
export const getDate = () => {
  var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  var d = new Date();
  var dayName = days[d.getDay()];
  var m = monthNames[d.getMonth()];
  var day = d.getUTCDate();
  return `${dayName} ${day} ${m}`;
}
export const MapDate = (val: any = null) => {
  var days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  var d = new Date(val);
  var dayName = days[d.getDay()];
  var m = monthNames[d.getMonth()];
  var y = d.getFullYear();
  var day = d.getUTCDate();
  return `${dayName} ${day} ${m}, ${y}`;
}
export const getTime = (date: any = null) => {
  const time = (date) ? new Date(date).toLocaleTimeString().replace(/:\d+ /, ' ') : new Date().toLocaleTimeString().replace(/:\d+ /, ' ');
  return time;
}

export const deepClone = (obj: any) => {
  return JSON.parse(JSON.stringify(obj));
}

export const array_move = (arr: any[], old_index: number, new_index: number) => {
  if (new_index >= arr.length) {
    var k = new_index - arr.length + 1;
    while (k--) {
      arr.push(undefined);
    }
  }
  arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
  return arr;
};

export const copyToClip = (text: any) => {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
export const milisecondToContDown = (time: any) => {
  var d = Math.floor(time / (1000 * 60 * 60 * 24));
  var h = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var m = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  var s = Math.floor((time % (1000 * 60)) / 1000);
  var t = `${(h ? (h > 9 ? h : "0" + h) : "00") + ":" + (m ? (m > 9 ? m : "0" + m) : "00") + ":" + (s > 9 ? s : "0" + s)}`;
  return t;
}
export const ConvertObjToQueryString = (obj: any, url: any) => {
  var queryString = Object.keys(obj).map(key => {
    if (obj[key] != "" && obj[key] != null) {
      return key + '=' + (obj[key] || "")
    }
    else if (typeof obj[key] == 'boolean' && obj[key] != null) {
      return key + '=' + obj[key];
    }
  }).filter(x => { return x != null && x != "" }).join('&');
  queryString = queryString.replace(/\_/g, ' ');
  return url + "?" + queryString;
}