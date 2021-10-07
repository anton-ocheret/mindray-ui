export const list = () => fetch('/quizes').then((res) => res.json()).then((data) => data);
